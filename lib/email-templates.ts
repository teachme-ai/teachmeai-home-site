export const getIntakeEmailHtml = (data: {
  name: string;
  role: string;
  goal: string;
  challenge?: string | null;
  intakeLink: string;
}) => {
  return `
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
          color: white !important;
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
        
        <p>You'll now chat with our AI agents to understand your learning style and preferences. At the end, you'll receive a rich analysis of your <span class="highlight">unique AI learning profile</span>.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.intakeLink}" class="cta-button">
            Continue Your AI Profile Analysis →
          </a>
        </div>
        
        <div class="benefits">
          <p style="margin-top: 0; font-weight: 600; color: #0066CC;">This personalized link is just for you and will pre-fill your details. You can return anytime to complete your AI profile analysis and receive:</p>
          <ul>
            <li>✅ Strategic AI opportunities tailored to your role</li>
            <li>✅ A personalized IMPACT action plan</li>
            <li>✅ Learning style insights & psychological profile</li>
            <li>✅ Priority roadmap with quick wins</li>
          </ul>
        </div>
        
        <p>Once you finish chatting with our AI agents, you'll have your complete personalized learning profile ready - a comprehensive guide showing exactly where you are and where you need to go on your AI learning journey.</p>
        
        <p>Looking forward to helping you master AI!</p>
        
        <p style="margin-top: 30px;">
          Best,<br>
          <strong>Khalid Irfan</strong><br>
          <span style="color: #64748B;">Founder, teachmeai</span>
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
  `;
};
