# ChatUI Quiz Implementation Checklist

**Project:** TeachMeAI Home Site  
**Component:** AI ChatUI Conversational Quiz  
**Reference:** See `CHATUI_QUIZ_ARCHITECTURE.md` for complete technical details  
**Target Launch:** Mid-February 2026

---

## Phase 1: ChatUI Frontend Component (Week 1)

### Day 1-2: UI Component Structure

- [ ] **Create base component**
  - File: `/components/chat-quiz.tsx`
  - Set up TypeScript interfaces (Message, CollectedData)
  - Initialize React state hooks
  - Create basic component structure

- [ ] **Design chat UI elements**
  - Message bubbles (user vs. AI styling)
  - Typing indicator animation
  - Input field with send button
  - Scroll container with auto-scroll
  - Mobile-responsive layout (TailwindCSS)

- [ ] **Add animations**
  - Message fade-in animations
  - Typing indicator dots
  - Smooth scroll behavior
  - Button hover states

**Deliverable:** Static ChatUI that looks good but doesn't connect to AI yet

**Test:** Load component, manually add messages, verify UI works on mobile/desktop

---

### Day 3-4: State Management & Flow

- [ ] **Implement conversation state**
  - Message history array
  - Collected data object (name, email, role, goal, challenge)
  - Loading states (isTyping, isSubmitting)
  - Completion state (isComplete)

- [ ] **Add input handling**
  - Handle Enter key to send message
  - Validate input (non-empty)
  - Disable input during AI response
  - Clear input after send

- [ ] **Build conversation logic**
  - Add user message to UI immediately
  - Show typing indicator
  - Simulate AI response (hardcoded for now)
  - Update collected data as info is gathered

**Deliverable:** Interactive chat that simulates conversation (no real AI yet)

**Test:** Complete a simulated conversation, verify data collection, check state updates

---

## Phase 2: AI Integration (Week 2)

### Day 1-2: API Route Setup

- [ ] **Create API route**
  - File: `/app/api/chat-quiz/route.ts`
  - Set up Genkit AI initialization
  - Import Gemini 2.5 Flash model
  - Create POST endpoint handler

- [ ] **Implement request handling**
  - Parse incoming JSON (conversationHistory, userMessage, collectedData)
  - Validate request data
  - Build AI prompt with context
  - Handle errors gracefully

- [ ] **Set up streaming response**
  - Use Server-Sent Events (SSE) or Response streaming
  - Stream AI response chunks
  - Include metadata (dataCollected, isComplete, confidence)

**Deliverable:** Working API route that accepts requests and streams AI responses

**Test:** Use curl or Postman to test API endpoint with sample data

---

### Day 3-4: Connect Frontend to AI

- [ ] **Update ChatUI to call API**
  - Replace simulated responses with real API calls
  - Send POST request with conversation context
  - Handle streaming response chunks
  - Display AI response progressively

- [ ] **Implement data extraction**
  - Parse user messages for key information (name, email, role, etc.)
  - Update collectedData state as info is gathered
  - Track completion percentage
  - Detect when all required fields are collected

- [ ] **Add validation**
  - Email format validation (regex)
  - Required field checking
  - Confidence scoring (0-100)
  - Trigger completion at 85%+ confidence

**Deliverable:** Fully functional AI conversation that collects user data

**Test:** Complete real conversation, verify all data collected, check validation works

---

## Phase 3: Email + Token System (Week 3)

### Day 1-2: JWT Token Generation

- [ ] **Set up JWT library**
  - Install: `npm install jsonwebtoken @types/jsonwebtoken`
  - Add JWT_SECRET to environment variables
  - Create token generation utility function

- [ ] **Build token generation logic**
  - Sign token with collected data (name, email, role, goal, challenge)
  - Set 7-day expiration
  - Include timestamp
  - Handle signing errors

- [ ] **Create intake app URL builder**
  - Base URL: `https://intake.teachmeai.in`
  - Append token as query parameter: `?token=xxx`
  - URL encode if needed
  - Validate URL format

**Deliverable:** Function that generates valid JWT tokens with user data

**Test:** Generate token, decode it manually, verify data integrity and expiration

---

### Day 3-4: Email Delivery System

- [ ] **Set up Resend**
  - Sign up at resend.com
  - Add domain: teachmeai.in
  - Configure DNS records (SPF, DKIM, DMARC)
  - Verify domain
  - Get API key
  - Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`

- [ ] **Create email template**
  - File: `/lib/email-templates.tsx` or inline in API route
  - Personalized greeting with user's name
  - Context from conversation (role, goal)
  - Clear CTA button with intake link
  - 7-day validity notice
  - Professional signature

- [ ] **Build email sender API route**
  - File: `/app/api/send-intake-link/route.ts`
  - Accept collected data
  - Generate JWT token
  - Build intake URL
  - Send email via Resend
  - Log to Google Sheets (optional)
  - Return success/failure

**Deliverable:** Email delivery system that sends personalized links with tokens

**Test:** Trigger email send, check inbox, click link, verify token in URL

---

### Day 5: Integration & Testing

- [ ] **Connect ChatUI completion to email**
  - Detect when conversation is complete (85%+ confidence)
  - Call `/api/send-intake-link` automatically
  - Show success message in chat
  - Disable further input
  - Display "Check your email" message

- [ ] **Add error handling**
  - Email delivery failures
  - Network errors
  - Invalid data
  - User-friendly error messages

- [ ] **Test end-to-end flow**
  - Start conversation on home site
  - Complete ChatUI quiz
  - Receive email
  - Verify link and token
  - Fix any issues

**Deliverable:** Complete ChatUI → Email flow working end-to-end

**Test:** Run through full user journey multiple times with different data

---

## Phase 4: Intake App Pre-fill (Week 4)

### Day 1-2: Token Decoding in Intake App

- [ ] **Update intake app**
  - File: `/Users/khalidirfan/projects/teachmeai-intake-app/src/app/page.tsx`
  - Install JWT library if not present
  - Add JWT_SECRET to intake app environment variables

- [ ] **Implement token parsing**
  - Read `token` from URL query parameters
  - Decode and verify JWT token
  - Handle expired tokens gracefully
  - Handle invalid/tampered tokens
  - Extract user data from token

- [ ] **Add validation**
  - Check token signature
  - Verify expiration (7 days)
  - Validate required fields exist
  - Show error for invalid tokens

**Deliverable:** Intake app can decode and validate tokens from URL

**Test:** Manually create URL with token, verify parsing and validation

---

### Day 3-4: Pre-fill UI Component

- [ ] **Create welcome component**
  - File: `/Users/khalidirfan/projects/teachmeai-intake-app/src/components/prefill-welcome.tsx`
  - Display "Welcome back, [Name]!" greeting
  - Show pre-filled data summary
  - List: Name ✓, Email ✓, Role ✓, Goal ✓, Challenge ✓
  - Clear visual confirmation
  - Professional, friendly design

- [ ] **Update form component**
  - Pre-populate form fields from token data
  - Mark pre-filled fields as read-only or editable
  - Allow user to correct any data if needed
  - Focus on first empty field

- [ ] **Handle missing token**
  - If no token in URL, show regular form
  - Don't break for users who arrive directly
  - Optional: prompt them to start from home site

**Deliverable:** Intake form pre-fills with data from ChatUI conversation

**Test:** Click email link, verify pre-fill works, test editing pre-filled data

---

### Day 5: Full Integration Testing

- [ ] **Test complete flow**
  - Start: ChatUI on teachmeai.in
  - Collect: All required data via conversation
  - Email: Receive personalized link
  - Click: Open intake app with token
  - Pre-fill: Verify all data carried over
  - Complete: Submit full intake form

- [ ] **Fix bugs and edge cases**
  - Token expiration handling
  - Email delivery failures
  - Network interruptions
  - Invalid/incomplete data
  - Browser compatibility

**Deliverable:** Seamless ChatUI → Email → Intake flow

**Test:** Multiple end-to-end tests with different user profiles

---

## Phase 5: Orchestration Integration (Week 5)

### Day 1-2: Update Intake Submission

- [ ] **Modify submission endpoint**
  - File: `/Users/khalidirfan/projects/teachmeai-intake-app/src/app/api/submit-intake/route.ts`
  - Accept both ChatUI data and Intake form data
  - Merge data structures
  - Validate combined data

- [ ] **Update data schema**
  ```typescript
  {
    source: 'chatui',
    chatQuizData: {
      name: string,
      email: string,
      role: string,
      goal: string,
      challenge?: string
    },
    intakeFormData: {
      varkResponses: [...],
      experienceLevel: string,
      ...
    }
  }
  ```

**Deliverable:** Submission endpoint accepts enriched data structure

**Test:** Submit intake form, verify both datasets are captured

---

### Day 3-4: Enhance Agent Context

- [ ] **Update Orchestration Agent**
  - File: `/Users/khalidirfan/projects/teachmeai-intake-app/agent-service/src/agents/orchestration.ts`
  - Pass ChatUI context to specialized agents
  - Use conversation data to enrich prompts
  - Improve agent instructions with additional context

- [ ] **Update specialized agents**
  - VARK Agent: Use role/goal context
  - SRL Agent: Use challenge information
  - Goals Agent: Use stated objectives
  - Synthesis Agent: Combine all enriched data

**Deliverable:** Agents produce better reports with ChatUI context

**Test:** Compare report quality with vs. without ChatUI data

---

### Day 5: System Testing

- [ ] **Full end-to-end testing**
  - ChatUI conversation
  - Email delivery
  - Token validation
  - Pre-fill functionality
  - Complete intake form
  - Agent orchestration
  - Report generation
  - Final email delivery

- [ ] **Performance testing**
  - Measure response times
  - Check streaming performance
  - Verify email delivery speed
  - Monitor agent processing time

- [ ] **Error testing**
  - Network failures
  - Invalid inputs
  - Token tampering
  - Email bounces
  - Agent failures

**Deliverable:** Production-ready system with comprehensive testing

**Test:** Multiple complete flows with edge cases and error scenarios

---

## Phase 6: Analytics & Monitoring (Week 6)

### Tracking Implementation

- [ ] **Add analytics events**
  - `chatquiz_started` - User opens chat
  - `chatquiz_message_sent` - Each user message
  - `chatquiz_completed` - All data collected
  - `chatquiz_abandoned` - User closes before complete
  - `intake_email_sent` - Email delivered
  - `intake_email_opened` - User opened email (Resend tracking)
  - `intake_link_clicked` - User clicked CTA
  - `intake_form_started` - From token link
  - `intake_form_prefilled` - Data pre-populated
  - `intake_form_submitted` - Complete submission

- [ ] **Set up conversion tracking**
  - ChatUI completion rate
  - Email open rate
  - Link click-through rate
  - Intake form completion rate
  - Overall conversion (start → report)

- [ ] **Create analytics dashboard**
  - Google Sheets or simple dashboard
  - Track key metrics
  - Identify drop-off points
  - Monitor performance

**Deliverable:** Comprehensive analytics for optimization

**Test:** Trigger all events, verify tracking works

---

## Launch Checklist

### Pre-Launch (1 week before)

- [ ] **Alpha testing**
  - Test with 5-10 internal users
  - Collect qualitative feedback
  - Fix critical bugs
  - Iterate on conversation flow

- [ ] **A/B test setup (optional)**
  - 50% ChatUI, 50% old static form
  - Compare completion rates
  - Measure user satisfaction

- [ ] **Documentation**
  - Update README
  - Create user guide
  - Document analytics setup
  - Write troubleshooting guide

### Launch Day

- [ ] **Deploy to production**
  - Push ChatUI component to home site (Vercel)
  - Deploy intake app updates (Vercel)
  - Deploy agent service updates (Cloud Run)
  - Verify all environment variables

- [ ] **Monitoring setup**
  - Set up error alerts (Sentry or similar)
  - Monitor email delivery rates
  - Watch analytics dashboard
  - Check server logs

- [ ] **Smoke tests**
  - Complete one full flow yourself
  - Verify email delivery
  - Check report generation
  - Confirm all systems operational

### Post-Launch (First Week)

- [ ] **Monitor metrics**
  - Track completion rates daily
  - Check for errors/bugs
  - Monitor user feedback
  - Analyze drop-off points

- [ ] **Quick iterations**
  - Fix any critical issues immediately
  - Adjust conversation flow if needed
  - Optimize based on user behavior
  - Improve error messages

- [ ] **Collect feedback**
  - Send survey to first 20 users
  - Ask about experience
  - Identify pain points
  - Plan improvements

---

## Success Metrics (Goals)

### Week 1 Post-Launch
- [ ] ChatUI completion rate: **≥60%**
- [ ] Email open rate: **≥35%**
- [ ] Link click-through: **≥50%**
- [ ] Zero critical bugs

### Month 1 Post-Launch
- [ ] ChatUI completion rate: **≥70%**
- [ ] Email open rate: **≥40%**
- [ ] Link click-through: **≥60%**
- [ ] Intake completion (from link): **≥80%**
- [ ] Overall conversion (start → report): **≥35%**
- [ ] User satisfaction: **≥4/5 average**

---

## Rollback Plan

If ChatUI performs worse than static form:

1. **Immediate**: Revert to static form in production
2. **Analyze**: Review analytics to understand why
3. **Fix**: Address specific issues identified
4. **Re-test**: Try ChatUI again with improvements
5. **Keep option**: Maintain both, let users choose

**Decision point**: After 100 completions or 2 weeks, whichever comes first

---

## Files to Create/Modify

### Home Site (`teachmeai-home-site`)
**New Files:**
- `components/chat-quiz.tsx` - Main ChatUI component
- `app/api/chat-quiz/route.ts` - Chat API endpoint
- `app/api/send-intake-link/route.ts` - Email sender
- `lib/email-templates.tsx` - Email template
- `CHATUI_QUIZ_ARCHITECTURE.md` - Technical documentation ✅
- `CHATUI_IMPLEMENTATION_CHECKLIST.md` - This file ✅

**Modified Files:**
- `components/hero.tsx` - Update CTA to launch ChatUI
- `app/page.tsx` - Integrate ChatUI component
- `.env.local` - Add JWT_SECRET, RESEND_API_KEY

### Intake App (`teachmeai-intake-app`)
**Modified Files:**
- `src/app/page.tsx` - Add token parsing and pre-fill
- `src/components/intake-form.tsx` - Support pre-filled data
- `src/app/api/submit-intake/route.ts` - Accept ChatUI + Intake data
- `agent-service/src/agents/orchestration.ts` - Use enriched context
- `.env.local` - Add JWT_SECRET (same as home site)

---

## Environment Variables Needed

### Home Site
```bash
GEMINI_API_KEY=xxx                    # For ChatUI AI responses
JWT_SECRET=xxx                         # For token generation
RESEND_API_KEY=re_xxx                 # For email delivery
NEXT_PUBLIC_INTAKE_APP_URL=https://intake.teachmeai.in
```

### Intake App
```bash
JWT_SECRET=xxx                         # Must match home site
GOOGLE_SHEETS_CREDENTIALS=xxx         # Existing
GEMINI_API_KEY=xxx                    # Existing for agents
RESEND_API_KEY=re_xxx                 # For report delivery
```

---

## Estimated Timeline

| Phase | Duration | Effort Hours |
|-------|----------|--------------|
| Phase 1: ChatUI Frontend | 4 days | 12 hours |
| Phase 2: AI Integration | 4 days | 12 hours |
| Phase 3: Email + Token | 5 days | 15 hours |
| Phase 4: Intake Pre-fill | 5 days | 12 hours |
| Phase 5: Orchestration | 5 days | 10 hours |
| Phase 6: Analytics | 3 days | 6 hours |
| **Total** | **~26 days** | **~67 hours** |

**Realistic Timeline:** 5-6 weeks working part-time (10-15 hours/week)

**Target Launch:** Mid to late February 2026

---

## Risk Mitigation

### Risk: ChatUI feels impersonal or robotic
**Mitigation:**
- Use warm, encouraging AI tone
- Add personality to responses
- Include emojis sparingly
- Test with real users early

### Risk: Email deliverability issues
**Mitigation:**
- Proper DNS configuration (SPF, DKIM, DMARC)
- Start with small volume, warm up domain
- Monitor bounce rates closely
- Use established provider (Resend)

### Risk: Token security concerns
**Mitigation:**
- Strong JWT_SECRET (32+ characters)
- 7-day expiration (not too long)
- HTTPS only for all endpoints
- Validate token on every use

### Risk: Users don't complete intake after ChatUI
**Mitigation:**
- Make email compelling with clear value prop
- Send reminder email after 2-3 days
- Optimize "Welcome back" experience
- Track and address drop-off points

---

**Last Updated:** January 24, 2026  
**Status:** Ready for Implementation  
**Next Step:** Begin Phase 1 (ChatUI Frontend Component)

---

*For technical details, see `CHATUI_QUIZ_ARCHITECTURE.md`*
