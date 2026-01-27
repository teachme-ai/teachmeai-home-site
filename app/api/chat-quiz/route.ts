import { NextRequest, NextResponse } from 'next/server'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

interface CollectedData {
    name?: string
    email?: string
    role?: string
    goal?: string
    challenge?: string
}

interface RequestBody {
    conversationHistory: Message[]
    userMessage: string
    collectedData: CollectedData
}

const AGENT_SERVICE_URL = process.env.AGENT_SERVICE_URL || 'https://teachmeai-agent-service-584680412286.us-central1.run.app';

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json()
        const { conversationHistory, userMessage, collectedData } = body

        // Map conversation history to Genkit format
        const messages = [
            ...conversationHistory.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                content: m.content
            })),
            { role: 'user', content: userMessage }
        ];

        // Call the Smart Agent Service
        console.log('🤖 [Chat Quiz] Calling Guide Agent at:', `${AGENT_SERVICE_URL}/quizGuide`);
        const response = await fetch(`${AGENT_SERVICE_URL}/quizGuide`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages,
                extractedData: {
                    name: collectedData.name,
                    email: collectedData.email,
                    learningGoal: collectedData.goal,
                    role: collectedData.role
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Agent Service failed: ${errorText}`);
        }

        const { result } = await response.json();

        // LLM Recovery: If the AI squashed the JSON into a single string or used markdown blocks
        const cleanPayload = (data: any) => {
            let raw = JSON.stringify(data);

            // Check for markdown JSON blocks that might have leaked
            if (raw.includes('```json')) {
                const match = raw.match(/```json\n([\s\S]*?)\n```/);
                if (match) {
                    try {
                        const parsed = JSON.parse(match[1]);
                        return parsed;
                    } catch (e) {
                        console.error('🧹 [Chat Quiz] Failed to parse markdown JSON block');
                    }
                }
            }

            if (raw.includes('\\n') || raw.includes('email":')) {
                console.log('🧹 [Chat Quiz] Squashed payload detected. Attempting recovery...');
                const emailMatch = raw.match(/"email":\s*"([^"]+)"/);
                const roleMatch = raw.match(/"role":\s*"([^"]+)"/);
                const goalMatch = raw.match(/"learningGoal":\s*"([^"]+)"/) || raw.match(/"goal":\s*"([^"]+)"/);
                const nameMatch = raw.match(/"name":\s*"([^"]+)"/);

                return {
                    name: nameMatch ? nameMatch[1] : data.name,
                    email: emailMatch ? emailMatch[1] : data.email,
                    learningGoal: goalMatch ? goalMatch[1] : (data.learningGoal || data.goal),
                    role: roleMatch ? roleMatch[1]?.split('\\n')[0].replace(/[",]/g, '').trim() : data.role
                };
            }
            return data;
        };

        const cleanedExtractedData = cleanPayload(result.extractedData);

        // Helper to get a valid string or fallback to existing
        const getValidValue = (newVal: any, oldVal: any) => {
            if (typeof newVal === 'string' && newVal.trim().length > 1 && !newVal.toLowerCase().includes('not provided')) {
                return newVal.trim();
            }
            return oldVal;
        };

        // Ensure we preserve existing data if new data is missing or invalid
        const updatedData: CollectedData = {
            ...collectedData,
            name: getValidValue(cleanedExtractedData.name || result.extractedData.name, collectedData.name),
            email: getValidValue(cleanedExtractedData.email || result.extractedData.email, collectedData.email),
            goal: getValidValue(cleanedExtractedData.learningGoal || result.extractedData.learningGoal, collectedData.goal),
            role: getValidValue(cleanedExtractedData.role || result.extractedData.role, collectedData.role)
        };

        const isCompleteRaw = result.isComplete;

        // Final Safeguard: Even if the AI says it's complete, if we are missing critical data,
        // we override it to false to prevent the UI from showing the success state.
        const { name, email, role, goal } = updatedData;
        const isComplete = !!(isCompleteRaw && name && email && role && goal);

        if (isCompleteRaw && !isComplete) {
            console.warn('⚠️ [Chat Quiz] AI hallucinated completion with missing data. Overriding isComplete to false.');
        }

        // If complete, trigger email sending
        if (isComplete) {
            const host = req.headers.get('host');
            const forwardedProto = req.headers.get('x-forwarded-proto');
            const protocol = forwardedProto || (host?.includes('localhost') ? 'http' : 'https');

            // In production, we should prefer the host header to ensure we call the correct environment
            const baseUrl = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

            console.log('📬 [Chat Quiz] Conversation marked COMPLETE. Identifying final payload...');

            // Critical check for email service fields
            const { name, email, role, goal } = updatedData;
            if (name && email && role && goal) {
                try {
                    const emailPayload = {
                        name,
                        email,
                        role,
                        goal,
                        challenge: updatedData.challenge || null
                    };

                    console.log(`📬 [Chat Quiz] Triggering email for ${email} via ${baseUrl}/api/send-intake-link`);
                    console.log('📦 [Chat Quiz] Email Payload:', JSON.stringify(emailPayload));

                    const emailResponse = await fetch(`${baseUrl}/api/send-intake-link`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(emailPayload)
                    });

                    if (emailResponse.ok) {
                        const emailData = await emailResponse.json();
                        console.log('✅ [Chat Quiz] Email successfully triggered:', emailData.emailId);
                    } else {
                        const errorText = await emailResponse.text();
                        console.error('❌ [Chat Quiz] Email trigger failed (Status:', emailResponse.status, '):', errorText);
                    }
                } catch (emailError) {
                    console.error('💥 [Chat Quiz] Critical error calling email API:', emailError)
                }
            } else {
                console.error('⚠️ [Chat Quiz] Missing required data for email despite isComplete=true.');
                console.log('📊 [Chat Quiz] Current State:', { name: !!name, email: !!email, role: !!role, goal: !!goal });
                console.log('📦 [Chat Quiz] Data:', JSON.stringify(updatedData));
            }
        }

        return NextResponse.json({
            message: result.message,
            dataCollected: updatedData,
            isComplete,
            confidence: isComplete ? 100 : result.confidence || 50
        });

    } catch (error) {
        console.error('Chat quiz API error:', error)
        return NextResponse.json(
            {
                error: 'Failed to process message',
                message: "I'm having a bit of trouble connecting to my brain! Could you try again in a second?",
                dataCollected: {},
                isComplete: false,
                confidence: 0
            },
            { status: 500 }
        )
    }
}
