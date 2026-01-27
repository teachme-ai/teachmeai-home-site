# TeachMeAI Website: Implementation Checklist

**Goal**: Transform teachmeai.in to support "Free AI Report → Paid Consulting" funnel

---

## Quick Start (This Weekend - 2 hours)

### ✅ Tasks You Can Do Right Now

- [x] **Update Hero Section** (`components/hero.tsx`)
  - Line 30-35: Change primary CTA text
  - Old: "Book a 70-minute Clarity Call"
  - New: "Get Your Free AI Analysis"
  - Add secondary CTA: "Skip to Clarity Call (₹2,600)"

- [x] **Build AI ChatUI Quiz Component** (`components/chat-quiz.tsx`)
  - Replace static form with conversational AI interface
  - Implement real-time chat with Gemini 2.5 Flash
  - Add streaming responses and typing indicators
  - Collect: Name, Email, Role, Goal, Challenge
  - Send email with JWT token to intake app link
  - See: `CHATUI_QUIZ_ARCHITECTURE.md` for full details

- [x] **Modify Programs Section** (`components/programs.tsx`)
  - Add new first card: "Free AI Analysis"
  - Reorder existing cards
  - Update pricing copy for clarity call

- [ ] **Test Locally**
  ```bash
  cd /Users/khalidirfan/projects/teachmeai-home-site
  npm run dev
  ```
  - Navigate to localhost:3000
  - Test quiz flow
  - Verify all CTAs work

---

## Week 1: Backend Setup (8 hours)

### Day 1-2: Free Report Agent

**Location**: `/Users/khalidirfan/projects/teachmeai-intake-app/agent-service/src/agents/`

- [ ] Create `free-report.ts`
  ```typescript
  export const freeReportAgent = ai.defineFlow({
    name: 'freeReportAgent',
    inputSchema: IntakeResponseSchema,
    outputSchema: FreeReportSchema
  }, async (intake) => {
    // Gemini 2.5 Flash prompt here
  });
  ```

- [ ] Test with sample data
  ```bash
  cd /Users/khalidirfan/projects/teachmeai-intake-app/agent-service
  npm run test -- free-report.test.ts
  ```

### Day 3-4: PDF Generation

- [ ] Install pdfkit
  ```bash
  npm install pdfkit @types/pdfkit
  ```

- [ ] Create `/agent-service/src/lib/pdf-generator.ts`
  - 3-page template
  - Include your logo (add to `/public/logo.png`)
  - Footer with CTA

- [ ] Test PDF generation
  ```bash
  node -e "require('./lib/pdf-generator').generateFreePDF({...})"
  ```

### Day 5: Email Setup

- [ ] Sign up for Resend
  - Go to resend.com
  - Add domain: teachmeai.in
  - Set DNS records (check email)
  - Get API key

- [ ] Add to `.env.local` (intake app)
  ```
  RESEND_API_KEY=re_xxxxx
  ```

- [ ] Create email template
  - File: `/agent-service/src/lib/email-templates.ts`
  - Subject: "Your AI Analysis is Ready"
  - Body: See ARCHITECTURE.md for copy

### Day 6-7: Integration

- [ ] Update `/src/app/api/submit-intake/route.ts`
  ```typescript
  // Add after validation:
  const freeReport = await freeReportAgent(intakeData);
  const pdfUrl = await generateFreePDF(freeReport, intakeData.email);
  await sendFreeReport(intakeData.email, intakeData.name, pdfUrl);
  ```

- [ ] Test end-to-end
  - Fill out quiz on home site
  - Check terminal logs
  - Verify email received
  - Open PDF, check formatting

---

## Week 2: Polish & Analytics (4 hours)

- [ ] Add Vercel Analytics events
  - `quiz_started`
  - `quiz_completed`
  - `report_generated`
  - `cta_clicked`

- [ ] Update Google Sheets schema
  - Add column: `reportUrl`
  - Add column: `conversionStatus` (free/call/deepdive)

- [ ] A/B test email subject lines
  - Split traffic 50/50
  - Track open rates in Resend dashboard

- [ ] Collect feedback
  - Send to 10 friends/colleagues
  - Ask: "Would you book a call after this report?"
  - Iterate based on responses

---

## Week 3-4: Premium Offering (12 hours)

- [ ] Build Deep Research agent
  - File: `/agent-service/src/agents/deep-research.ts`
  - Enable Thinking Mode
  - Add Google Search grounding
  - Test with 3 industries

- [ ] Create 10-page PDF template
  - Extend existing generator
  - Add charts, visual roadmaps
  - Include research citations section

- [ ] Set up Topmate product
  - Create "Deep Dive Package" (₹6,000)
  - Add description
  - Test checkout flow

- [ ] Build webhook handler
  - File: `/src/app/api/topmate-webhook/route.ts`
  - Verify payment signature
  - Trigger Deep Research agent
  - Send premium email

---

## Deployment Checklist

### Home Site (teachmeai.in)

- [ ] Push updates to GitHub
  ```bash
  cd /Users/khalidirfan/projects/teachmeai-home-site
  git add .
  git commit -m "feat: update to free AI report funnel"
  git push origin main
  ```

- [ ] Vercel auto-deploys (check dashboard)

- [ ] Test production site
  - Visit teachmeai.in
  - Complete quiz
  - Verify email received

### Intake App (Backend)

- [ ] Build agent service
  ```bash
  cd /Users/khalidirfan/projects/teachmeai-intake-app/agent-service
  npm run build
  ```

- [ ] Deploy to Cloud Run
  ```bash
  gcloud run deploy teachmeai-agent-service \
    --source . \
    --region us-central1 \
    --set-env-vars RESEND_API_KEY=$RESEND_API_KEY
  ```

- [ ] Update environment variable
  - Add `RESEND_API_KEY` in Cloud Run console
  - Add `AGENT_SERVICE_URL` in Vercel (if changed)

---

## Launch Strategy

### Soft Launch (Week 1 after build)

- [ ] Email to personal network (20-30 people)
  - Subject: "I built something - need your feedback"
  - Body: Link to quiz, ask for honest review
  - Offer: First 10 get lifetime free access to premium reports

### Public Launch (Week 2 after build)

- [ ] LinkedIn announcement
  - Post: "How AI analyzed my learning profile in 2 minutes"
  - Include sample free report (yours)
  - CTA: "Try it yourself: teachmeai.in"

- [ ] Update email signature
  - "Get your free AI learner analysis: teachmeai.in"

- [ ] Twitter/X thread (optional)
  - Share behind-the-scenes of building this
  - Show AI report samples
  - Discuss "AI + human" positioning

---

## Success Criteria

### Week 1
- [ ] 10+ quiz completions
- [ ] 8+ emails delivered successfully
- [ ] 1+ call bookings

### Month 1
- [ ] 50+ quiz completions
- [ ] 5-8 call bookings (10-15% conversion)
- [ ] Revenue: ₹13,000-₹20,000

### Month 2
- [ ] 100+ quiz completions
- [ ] 15+ call bookings
- [ ] 3-5 premium packages sold
- [ ] Revenue: ₹50,000-₹80,000

---

## Troubleshooting

### Email not sending
- Check Resend dashboard for errors
- Verify DNS records are correct
- Test with Resend's API explorer first

### PDF not generating
- Check Cloud Run logs: `gcloud run logs read`
- Verify pdfkit installed correctly
- Test locally first

### Quiz not submitting
- Check browser console for errors
- Verify API endpoint is correct
- Check CORS settings

---

## Files to Edit

**Home Site** (`/Users/khalidirfan/projects/teachmeai-home-site/`):
- `components/hero.tsx` - Update CTAs
- `components/quiz.tsx` - Update submit flow
- `components/programs.tsx` - Add free tier
- `app/page.tsx` - Update hero messaging

**Intake App** (`/Users/khalidirfan/projects/teachmeai-intake-app/`):
- `agent-service/src/agents/free-report.ts` - NEW FILE
- `agent-service/src/lib/pdf-generator.ts` - NEW FILE
- `agent-service/src/lib/email-templates.ts` - NEW FILE
- `src/app/api/submit-intake/route.ts` - UPDATE
- `.env.local` - Add RESEND_API_KEY

---

**READY TO START?** Pick one task from "Quick Start" and complete it today!
