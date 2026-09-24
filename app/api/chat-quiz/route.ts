import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { sendIntakeEmail } from '@/lib/email'
import { sign } from 'jsonwebtoken'

// ─── Model Configuration ──────────────────────────────────────────────────────
// gemini-2.5-flash: current stable Flash model for existing users
// If you're a new project, swap to: 'gemini-3.8-flash'
const CHAT_MODEL = 'gemini-2.5-flash'

// ─── Gemini Client ────────────────────────────────────────────────────────────
function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
    return new GoogleGenerativeAI(apiKey)
}

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI Skills Diagnostic assistant for TeachMeAI — a platform that helps professionals learn AI skills tailored to their role.

Your goal: Have a warm, focused 3-5 message conversation to collect exactly these four fields:
1. name (full name)
2. role (professional role/title)
3. goal (what they want to achieve with AI)
4. email (email address)

Guidelines:
- Be conversational, encouraging, and concise. Max 2 sentences per reply.
- Ask for one piece of information at a time, in this order: name → role → goal → email.
- Once you have all 4 fields confirmed, respond with a warm closing message telling them their personalized report is being prepared and will be sent to their email. End this final message with exactly: [COMPLETE]
- If the user provides multiple fields in one message, extract them all and ask for the next missing one.
- Never ask for information you already have.
- Do NOT use markdown, bullet points, or formatting — plain conversational text only.

At the end of EVERY response, output a JSON block on its own line in this exact format (include all fields, use empty string if unknown):
FIELDS:{"name":"...","role":"...","goal":"...","email":"..."}`

// ─── Field Extractor ──────────────────────────────────────────────────────────
function extractFields(text: string): Record<string, string> {
    const match = text.match(/FIELDS:(\{[^}]+\})/)
    if (!match) return {}
    try {
        return JSON.parse(match[1])
    } catch {
        return {}
    }
}

// ─── Strip FIELDS: marker from display message ────────────────────────────────
function cleanMessage(text: string): string {
    return text.replace(/\nFIELDS:\{[^}]+\}/g, '').replace('[COMPLETE]', '').trim()
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // ── MODE A: Form/Submit mode (all 4 fields provided directly) ──────────
        if (body.collectedData && body.userMessage === 'Form submission') {
            return handleFormSubmission(body.collectedData)
        }

        // ── MODE B: AI Chat mode ───────────────────────────────────────────────
        const { conversationHistory = [], userMessage, collectedData = {} } = body

        if (!userMessage) {
            return NextResponse.json({ error: 'userMessage is required' }, { status: 400 })
        }

        const genAI = getGeminiClient()
        const model = genAI.getGenerativeModel({
            model: CHAT_MODEL,
            systemInstruction: SYSTEM_PROMPT,
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
            },
        })

        // Build chat history from conversation (skip the initial assistant greeting at index 0)
        const history = conversationHistory
            .filter((_: { role: string; content: string }, idx: number) => idx !== 0)
            .map((m: { role: string; content: string }) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }],
            }))

        const chat = model.startChat({ history })
        const result = await chat.sendMessage(userMessage)
        const rawText = result.response.text()

        // Extract structured fields from Gemini's response
        const extractedFields = extractFields(rawText)
        const mergedData: Record<string, string> = { ...collectedData, ...extractedFields }
        // Remove empty-string fields from previous turns so we don't overwrite good data with empty
        Object.keys(mergedData).forEach(k => { if (!mergedData[k]) delete mergedData[k] })

        // Check if all 4 required fields are present and complete
        const name = mergedData.name || ''
        const role = mergedData.role || ''
        const goal = mergedData.goal || mergedData.learningGoal || ''
        const email = mergedData.email || ''
        const allFieldsPresent = !!(
            name.trim() && role.trim() && goal.trim() && email.trim() &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        )
        const aiSaysComplete = rawText.includes('[COMPLETE]')
        const isComplete = aiSaysComplete && allFieldsPresent

        const displayMessage = cleanMessage(rawText)

        if (isComplete) {
            // Trigger email + generate JWT, then merge response
            const emailResponse = await handleFormSubmission({ name, role, goal, email })
            const emailData = await emailResponse.json()
            return NextResponse.json({
                message: displayMessage || "Your personalized report is on its way! Check your inbox.",
                dataCollected: { name, role, goal, email },
                isComplete: true,
                confidence: 100,
                token: emailData.token,
            })
        }

        return NextResponse.json({
            message: displayMessage,
            dataCollected: mergedData,
            isComplete: false,
            confidence: 0,
        })

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error('💥 [chat-quiz] Error:', msg)

        // Graceful fallback if model is unavailable (quota, shutdown, network)
        if (msg.includes('model') || msg.includes('404') || msg.includes('503') || msg.includes('429')) {
            return NextResponse.json({
                message: "I'm having a brief technical hiccup. Could you try again in a moment?",
                dataCollected: {},
                isComplete: false,
                confidence: 0,
            })
        }

        return NextResponse.json(
            { error: 'Internal Server Error', isComplete: false },
            { status: 500 }
        )
    }
}

// ─── Shared: email + JWT logic (used by both modes) ──────────────────────────
async function handleFormSubmission(collectedData: Record<string, string>) {
    try {
        const name = (collectedData.name || '').trim()
        const email = (collectedData.email || '').trim().toLowerCase()
        const role = (collectedData.role || '').trim()
        const goal = (collectedData.goal || collectedData.learningGoal || '').trim()

        console.log('📝 [chat-quiz] Submission:', { name, email, role, goal })

        const hasAllFields = !!(name && email && role && goal)
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (hasAllFields && isValidEmail) {
            try {
                await sendIntakeEmail({ name, email, role, goal, challenge: collectedData.challenge || null })
                console.log('✅ [chat-quiz] Email sent')
            } catch (emailError) {
                console.error('💥 [chat-quiz] Email error (non-fatal):', emailError)
            }

            const token = sign(
                { name, email, role, goal, challenge: collectedData.challenge || null },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '1h' }
            )

            return NextResponse.json({
                message: "Excellent! We've received your details. Redirecting you to your diagnostic...",
                dataCollected: { name, email, role, goal },
                token,
                isComplete: true,
                confidence: 100,
            })
        }

        return NextResponse.json({
            message: 'Please ensure all fields (Name, Email, Role, Goal) are filled out.',
            dataCollected: collectedData,
            isComplete: false,
            confidence: 0,
        })

    } catch (error) {
        console.error('💥 [chat-quiz] handleFormSubmission error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', isComplete: false },
            { status: 500 }
        )
    }
}
