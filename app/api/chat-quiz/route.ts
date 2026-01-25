import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

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

// Helper function to extract data from user messages
function extractDataFromMessage(message: string, field: string): string | null {
    const lowerMessage = message.toLowerCase().trim()

    // Email extraction
    if (field === 'email') {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        const match = message.match(emailRegex)
        return match ? match[0] : null
    }

    // For name, role, goal, challenge - just return the message if it's not empty
    if (field === 'name' && lowerMessage.length > 1 && lowerMessage.length < 50) {
        // Remove common prefixes
        return message.replace(/^(my name is|i'm|i am|it's|this is)\s+/i, '').trim()
    }

    // For other fields, return the message as-is
    return message.length > 2 ? message : null
}

// Detect what data is still missing
function detectMissingFields(data: CollectedData): string[] {
    const required = ['name', 'email', 'role', 'goal']
    return required.filter(field => !data[field as keyof CollectedData])
}

// Calculate completion confidence
function calculateConfidence(data: CollectedData): number {
    const fields = ['name', 'email', 'role', 'goal']
    const filled = fields.filter(f => data[f as keyof CollectedData]).length
    return Math.round((filled / fields.length) * 100)
}

// Build the AI prompt
function buildPrompt(context: {
    conversationHistory: Message[]
    userMessage: string
    collectedData: CollectedData
    nextField: string | null
}): string {
    const { conversationHistory, userMessage, collectedData, nextField } = context

    const conversationContext = conversationHistory
        .slice(-4) // Last 4 messages for context
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n')

    return `You are a friendly, encouraging AI assistant helping someone get started with AI learning at TeachMeAI.

Your goal is to collect the following information through natural conversation:
1. Name (required) ${collectedData.name ? '✓ Got it: ' + collectedData.name : '- Still needed'}
2. Email (required) ${collectedData.email ? '✓ Got it: ' + collectedData.email : '- Still needed'}
3. Professional role/title (required) ${collectedData.role ? '✓ Got it: ' + collectedData.role : '- Still needed'}
4. Primary AI learning goal (required) ${collectedData.goal ? '✓ Got it: ' + collectedData.goal : '- Still needed'}
5. Current challenge with AI (optional) ${collectedData.challenge ? '✓ Got it: ' + collectedData.challenge : '- Optional'}

Recent conversation:
${conversationContext}

User just said: "${userMessage}"

${nextField ? `Next field to ask for: ${nextField}` : 'All required fields collected!'}

Instructions:
1. Be warm, friendly, and encouraging
2. Keep responses brief (1-2 sentences max)
3. Acknowledge what they shared, then ask for the next piece of info naturally
4. If they gave you information for the current field, thank them and move to the next
5. Use emojis sparingly but appropriately
6. If all required fields are collected, congratulate them and tell them to check their email for the next step
7. Don't repeat information you already have

${nextField === 'name' ? 'Ask for their name in a friendly way.' : ''}
${nextField === 'email' ? 'Ask for their email address to send them the next step.' : ''}
${nextField === 'role' ? 'Ask what they do professionally (e.g., teacher, developer, manager).' : ''}
${nextField === 'goal' ? 'Ask about their main reason for exploring AI (career growth, skill enhancement, business innovation, etc.).' : ''}
${nextField === null && calculateConfidence(collectedData) >= 100 ? 'All required info collected! Tell them their personalized link is being sent to their email and they should check their inbox (and spam folder) in the next minute.' : ''}

Generate your response (just the message, no prefixes):`
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json()
        const { conversationHistory, userMessage, collectedData } = body

        // Extract any new data from the user's message
        const missingFields = detectMissingFields(collectedData)
        let currentField = missingFields[0] || null

        // Try to extract data for the current missing field
        let updatedData = { ...collectedData }
        if (currentField) {
            const extracted = extractDataFromMessage(userMessage, currentField)
            if (extracted) {
                updatedData = {
                    ...updatedData,
                    [currentField]: extracted
                }
                // Move to next missing field
                const newMissing = detectMissingFields(updatedData)
                currentField = newMissing[0] || null
            }
        }

        // Check if we have everything
        const confidence = calculateConfidence(updatedData)
        const isComplete = confidence >= 100 && updatedData.email // Must have valid email

        // Generate AI response
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

        const prompt = buildPrompt({
            conversationHistory,
            userMessage,
            collectedData: updatedData,
            nextField: currentField
        })

        const result = await model.generateContent(prompt)
        const aiMessage = result.response.text()

        // If complete, trigger email sending
        if (isComplete) {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-intake-link`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                })
            } catch (emailError) {
                console.error('Error sending email:', emailError)
                // Don't fail the whole request if email fails
            }
        }

        return NextResponse.json({
            message: aiMessage,
            dataCollected: updatedData,
            isComplete,
            confidence
        })

    } catch (error) {
        console.error('Chat quiz API error:', error)
        return NextResponse.json(
            {
                error: 'Failed to process message',
                message: "I'm having trouble right now. Could you try again?",
                dataCollected: {},
                isComplete: false,
                confidence: 0
            },
            { status: 500 }
        )
    }
}
