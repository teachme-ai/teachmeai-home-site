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

        const updatedData: CollectedData = {
            ...collectedData,
            name: result.extractedData.name || collectedData.name,
            email: result.extractedData.email || collectedData.email,
            goal: result.extractedData.learningGoal || collectedData.goal,
            role: result.extractedData.role || collectedData.role
        };

        const isComplete = result.isComplete;

        // If complete, trigger email sending (legacy integration)
        if (isComplete) {
            const host = req.headers.get('host');
            const protocol = host?.includes('localhost') ? 'http' : 'https';
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

            console.log('📬 [Chat Quiz] Agent says Complete. Mapped Payload:', JSON.stringify(updatedData, null, 2));

            const { name, email, role, goal } = updatedData;
            if (name && email && role && goal) {
                try {
                    console.log('📬 [Chat Quiz] Internal Fetch to:', `${baseUrl}/api/send-intake-link`);
                    const emailResponse = await fetch(`${baseUrl}/api/send-intake-link`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedData)
                    });

                    if (emailResponse.ok) {
                        console.log('✅ [Chat Quiz] Email triggered successfully');
                    } else {
                        const errorText = await emailResponse.text();
                        console.error('❌ [Chat Quiz] Email trigger failed validation:', errorText);
                    }
                } catch (emailError) {
                    console.error('💥 [Chat Quiz] Error calling internal email API:', emailError)
                }
            } else {
                console.error('⚠️ [Chat Quiz] Missing required fields for email. Skipping trigger.');
            }
        }

        return NextResponse.json({
            message: result.message,
            dataCollected: updatedData,
            isComplete,
            confidence: isComplete ? 100 : 50 // Simplified confidence
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
