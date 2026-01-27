import { NextRequest, NextResponse } from 'next/server'
import { sendIntakeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { collectedData } = body

        // 1. Extract data from either direct or nested source
        const name = (collectedData.name || "").trim()
        const email = (collectedData.email || "").trim().toLowerCase()
        const role = (collectedData.role || "").trim()
        const goal = (collectedData.goal || collectedData.learningGoal || "").trim()

        console.log('📝 [Form Submission] Received:', { name, email, role, goal })

        // 2. Immediate Validation
        const hasAllFields = !!(name && email && role && goal)
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (hasAllFields && isValidEmail) {
            console.log('📬 [Form Submission] ✅ Data valid. Triggering email...')

            try {
                const emailResult = await sendIntakeEmail({
                    name,
                    email,
                    role,
                    goal,
                    challenge: collectedData.challenge || null
                })

                if (emailResult.success) {
                    console.log('✅ [Form Submission] Email sent successfully')
                }
            } catch (emailError) {
                console.error('💥 [Form Submission] Email Error:', emailError)
                // We still proceed because we want the user to get the handoff redirect
            }

            return NextResponse.json({
                message: "Excellent! We've received your details. Redirecting you to your diagnostic...",
                dataCollected: { name, email, role, goal: goal },
                isComplete: true,
                confidence: 100
            })
        }

        // 3. Fallback for incomplete data (shouldn't happen with form validation)
        return NextResponse.json({
            message: "Please ensure all fields (Name, Email, Role, Goal) are filled out.",
            dataCollected: collectedData,
            isComplete: false,
            confidence: 0
        })

    } catch (error) {
        console.error('💥 [Form Submission] API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', isComplete: false },
            { status: 500 }
        )
    }
}
