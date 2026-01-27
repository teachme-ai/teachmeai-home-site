import { NextRequest, NextResponse } from 'next/server'
import { sendIntakeEmail } from '@/lib/email'

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
    console.log('📬 [Email Service] Received API request for email:', data.email);

    const result = await sendIntakeEmail({
      name: data.name,
      email: data.email,
      role: data.role,
      goal: data.goal,
      challenge: data.challenge
    });

    return NextResponse.json({
      success: true,
      emailId: result.id,
      message: 'Email sent successfully via library'
    })

  } catch (error) {
    console.error('Send intake link API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
