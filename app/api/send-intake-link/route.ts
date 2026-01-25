import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as jwt from 'jsonwebtoken'

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

    // Validate required fields
    if (!data.name || !data.email || !data.role || !data.goal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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
    const emailResult = await resend.emails.send({
      from: 'Khalid at TeachMeAI <khalid@teachmeai.in>',
      to: data.email,
      subject: `Complete Your AI Learning Profile - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #334155;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0066CC 0%, #0EA5E9 100%);
              color: white;
              padding: 30px;
              border-radius: 12px 12px 0 0;
              text-align: center;
            }
            .content {
              background: white;
              padding: 30px;
              border: 1px solid #E2E8F0;
              border-top: none;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #0066CC 0%, #0EA5E9 100%);
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
            }
            .benefits {
              background: #F1F5F9;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .benefits ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .benefits li {
              margin: 8px 0;
            }
            .footer {
              text-align: center;
              color: #64748B;
              font-size: 12px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #E2E8F0;
            }
            .highlight {
              background: #FEF3C7;
              padding: 2px 6px;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎯 Your AI Journey Starts Here</h1>
          </div>
          
          <div class="content">
            <h2 style="color: #0066CC; margin-top: 0;">Hi ${data.name}! 👋</h2>
            
            <p>Great start! You mentioned you're a <strong>${data.role}</strong> looking to <strong>${data.goal.toLowerCase()}</strong>.</p>
            
            ${data.challenge ? `<p>I totally understand your challenge: "${data.challenge}". You're not alone - this is one of the most common obstacles people face when getting started with AI.</p>` : ''}
            
            <p>To generate your <span class="highlight">personalized AI analysis</span>, we need a bit more context about your learning style and experience.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${intakeLink}" class="cta-button" style="color: white;">
                Complete Your Profile →
              </a>
            </div>
            
            <div class="benefits">
              <p style="margin-top: 0; font-weight: 600; color: #0066CC;">This will take about 5-7 minutes and give us everything we need to:</p>
              <ul>
                <li>✅ Analyze your learning style (VARK assessment)</li>
                <li>✅ Map your current AI readiness level</li>
                <li>✅ Identify your optimal learning path</li>
                <li>✅ Generate your custom 3-5 page AI analysis report</li>
              </ul>
            </div>
            
            <p>Once you complete your profile, you'll receive a comprehensive report that shows exactly where you are and where you need to go on your AI learning journey.</p>
            
            <p>Looking forward to helping you master AI!</p>
            
            <p style="margin-top: 30px;">
              Best,<br>
              <strong>Khalid Irfan</strong><br>
              <span style="color: #64748B;">Founder, TeachMeAI</span>
            </p>
            
            <div class="footer">
              <p>🔒 Your data is secure and never shared with third parties</p>
              <p>⏰ Your intake link is valid for 7 days</p>
              <p style="margin-top: 15px;">
                <a href="https://teachmeai.in" style="color: #0066CC;">teachmeai.in</a> | 
                <a href="https://teachmeai.in/privacy" style="color: #0066CC;">Privacy Policy</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    })

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
