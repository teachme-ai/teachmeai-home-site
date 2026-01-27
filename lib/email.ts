import { Resend } from 'resend'
import * as jwt from 'jsonwebtoken'
import { getIntakeEmailHtml } from './email-templates'

interface SendEmailParams {
    name: string
    email: string
    role: string
    goal: string
    challenge?: string | null
}

export async function sendIntakeEmail({ name, email, role, goal, challenge }: SendEmailParams) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured')
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Generate JWT token
    const token = jwt.sign(
        {
            name,
            email,
            role,
            goal,
            challenge: challenge || null,
            source: 'chatui',
            timestamp: Date.now()
        },
        process.env.JWT_SECRET || 'fallback-secret-for-dev-only',
        { expiresIn: '7d' }
    )

    const intakeBaseUrl = process.env.NEXT_PUBLIC_INTAKE_APP_URL || 'https://intake.teachmeai.in'
    const intakeLink = `${intakeBaseUrl}?token=${token}`

    const emailHtml = getIntakeEmailHtml({
        name,
        role,
        goal,
        challenge: challenge || undefined,
        intakeLink
    })

    console.log(`✉️ [Email Lib] Attempting to send email to ${email}...`)

    const { data, error } = await resend.emails.send({
        from: 'Khalid at TeachMeAI <khalid@teachmeai.in>',
        to: email,
        subject: `Complete Your AI Learning Profile - ${name}`,
        html: emailHtml
    })

    if (error) {
        console.error('❌ [Email Lib] Resend Error:', error)
        throw new Error(error.message)
    }

    // Optional: Log to webhook if exists
    if (process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL) {
        try {
            fetch(process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name, email, role, goal, challenge,
                    intakeLink: intakeLink.substring(0, 100) + '...',
                    timestamp: new Date().toISOString(),
                    source: 'chatui',
                    status: 'email_sent'
                })
            }).catch(e => console.error('Webhook error:', e))
        } catch (e) {
            console.error('Webhook sync error:', e)
        }
    }

    return { success: true, id: data?.id }
}
