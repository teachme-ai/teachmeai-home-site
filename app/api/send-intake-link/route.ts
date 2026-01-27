import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as jwt from 'jsonwebtoken'
import { getIntakeEmailHtml } from '@/lib/email-templates'

interface IntakeData {
  name: string
  email: string
  role: string
  goal: string
  challenge?: string
}

export async function POST(req: NextRequest) {
  try {
    const data: IntakeData = await req.json()
    console.log('📬 [Email Service] Received request with fields:', Object.keys(data));

    // Validate required fields
    const missingFields = ['name', 'email', 'role', 'goal'].filter(f => !data[f as keyof IntakeData]);
    if (missingFields.length > 0) {
      console.error('❌ [Email Service] Missing required fields:', missingFields.join(', '));
      console.log('📦 [Email Service] Payload was:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        {
          error: 'Missing required fields',
          missing: missingFields,
          received: Object.keys(data)
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      console.error('❌ [Email Service] Invalid email format:', data.email);
      return NextResponse.json(
        { error: 'Invalid email format', received: data.email },
        { status: 400 }
      )
    }

    // Generate JWT token with 7-day expiration
    const token = jwt.sign(
      {
        name: data.name,
        email: data.email,
        role: data.role,
        goal: data.goal,
        challenge: data.challenge || null,
        source: 'chatui',
        timestamp: Date.now()
      },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    )

    // Build intake app link with token
    const intakeBaseUrl = process.env.NEXT_PUBLIC_INTAKE_APP_URL || 'https://intake.teachmeai.in'
    const intakeLink = `${intakeBaseUrl}?token=${token}`

    // Initialize Resend client (lazy initialization to avoid build-time errors)
    const resend = new Resend(process.env.RESEND_API_KEY || '')

    // Send email via Resend
    console.log('✉️ [Email Service] Calling Resend API...');

    const emailHtml = getIntakeEmailHtml({
      name: data.name,
      role: data.role,
      goal: data.goal,
      challenge: data.challenge,
      intakeLink
    });

    const emailResult = await resend.emails.send({
      from: 'Khalid at TeachMeAI <khalid@teachmeai.in>',
      to: data.email,
      subject: `Complete Your AI Learning Profile - ${data.name}`,
      html: emailHtml
    })

    if (emailResult.error) {
      console.error('❌ [Email Service] Resend reported an error:', emailResult.error);
      throw new Error(`Resend Error: ${emailResult.error.message}`);
    }

    console.log('✅ [Email Service] Resend successfully accepted the email:', emailResult.data?.id);

    // Log to Google Sheets (if webhook is configured)
    if (process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL) {
      try {
        await fetch(process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            intakeLink: intakeLink.substring(0, 100) + '...', // Truncate for sheets
            timestamp: new Date().toISOString(),
            source: 'chatui',
            status: 'email_sent'
          })
        })
      } catch (sheetError) {
        console.error('Error logging to sheets:', sheetError)
        // Don't fail the request if sheets logging fails
      }
    }

    return NextResponse.json({
      success: true,
      emailId: emailResult.data?.id,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Send intake link error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
