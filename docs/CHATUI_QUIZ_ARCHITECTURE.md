# AI ChatUI Quiz Architecture

**Version:** 1.0  
**Created:** January 24, 2026  
**Purpose:** Replace static quiz form with conversational AI interface that qualifies leads before full intake app

---

## Overview

### Current Flow (Static Form)
```
teachmeai.in → Static Quiz Form → Submit → Email with PDF
```

### New Flow (AI ChatUI + Orchestration)
```
teachmeai.in 
  ↓
AI ChatUI Quick Quiz (3-5 questions)
  ↓
Capture Email + Basic Info
  ↓
Send Email with Intake App Link
  ↓
User Clicks Link → Full Intake App
  ↓
Agent Orchestration (Multi-agent analysis)
  ↓
Complete Assessment + Report Generation
```

---

## Architecture Components

### Component 1: AI ChatUI (Home Site)

**Location:** `/Users/khalidirfan/projects/teachmeai-home-site/components/chat-quiz.tsx`

**Purpose:** Conversational qualifier that:
- Engages user in natural conversation
- Captures essential information (name, email, role, goal)
- Qualifies leads for full intake
- Sends email with intake app link

**Technology Stack:**
- **Frontend:** React + TailwindCSS
- **AI Model:** Gemini 2.5 Flash (via API route)
- **Streaming:** Server-Sent Events (SSE) for real-time responses
- **State Management:** React hooks (useState, useReducer)

**Key Features:**
1. **Natural Conversation Flow**
   - AI asks questions one at a time
   - Adapts based on user responses
   - Validates answers in real-time
   - Uses encouraging, friendly tone

2. **Progressive Disclosure**
   - Starts with easy questions (name, role)
   - Gradually moves to deeper topics (goals, challenges)
   - Ends with email capture + CTA

3. **Visual Design**
   - Chat bubbles (AI vs. User)
   - Typing indicators
   - Message timestamps
   - Smooth animations
   - Mobile-responsive

**Data Collection Goals:**
- Name (required)
- Email (required, validated)
- Role/Profession (required)
- Primary AI goal (required)
- Current challenge (optional but encouraged)

---

### Component 2: ChatUI API Route

**Location:** `/Users/khalidirfan/projects/teachmeai-home-site/app/api/chat-quiz/route.ts`

**Purpose:** Backend handler for chat interactions

**Endpoints:**

#### POST `/api/chat-quiz`
Handles each chat turn

**Request:**
```typescript
{
  conversationHistory: Message[],
  userMessage: string,
  collectedData: {
    name?: string,
    email?: string,
    role?: string,
    goal?: string,
    challenge?: string
  }
}
```

**Response (Streaming SSE):**
```typescript
{
  message: string,              // AI response
  nextQuestion?: string,         // What to ask next
  dataCollected: {               // Updated collected data
    name?: string,
    email?: string,
    ...
  },
  isComplete: boolean,          // Ready to send email?
  confidence: number            // 0-100, completion confidence
}
```

**Logic Flow:**
1. Receive user message
2. Check what data is already collected
3. Validate latest user response
4. Determine next question (gap detection)
5. Generate AI response via Gemini
6. Stream response back to frontend
7. If complete (85%+ confidence) → trigger email

---

### Component 3: Email + Intake Link Sender

**Location:** `/Users/khalidirfan/projects/teachmeai-home-site/app/api/send-intake-link/route.ts`

**Purpose:** Send personalized email with link to full intake app

**Trigger:** When ChatUI quiz reaches completion

**Email Template:**

```
Subject: Complete Your AI Learning Profile - [Name]

Hi [Name],

Great start! You mentioned you're a [Role] looking to [Goal].

To generate your personalized AI analysis, we need a bit more context.

👉 Complete your profile here: https://intake.teachmeai.in?token=[JWT_TOKEN]

This will take about 5-7 minutes and give us everything we need to:
- Analyze your learning style (VARK assessment)
- Map your AI readiness
- Generate your custom 3-5 page report

Looking forward to helping you on your AI journey!

Best,
Khalid Irfan
TeachMeAI

P.S. Your intake link is valid for 7 days.
```

**Token Generation:**
- JWT containing: `{ name, email, role, goal, challenge, timestamp }`
- Signed with `JWT_SECRET`
- 7-day expiration
- Used to pre-fill intake app

---

### Component 4: Intake App Pre-fill

**Location:** `/Users/khalidirfan/projects/teachmeai-intake-app/src/app/page.tsx`

**Purpose:** Pre-populate form with data from ChatUI quiz

**Flow:**
1. User clicks email link: `intake.teachmeai.in?token=xxx`
2. Intake app decodes JWT token
3. Pre-fills: Name, Email, Role, Goal, Challenge
4. User completes remaining fields (VARK, detailed questions)
5. Submits to orchestration agents

**Benefits:**
- Reduces friction (don't ask twice)
- Shows continuity (ChatUI → Intake)
- Increases completion rate
- Better user experience

---

## Detailed User Flow

### Step 1: Landing on teachmeai.in

**User Action:** Visits teachmeai.in, clicks "Get Your Free AI Analysis"

**System Response:**
- Loads ChatUI component
- Initializes conversation
- AI sends first message:

```
AI: Hi there! I'm TeachMeAI's AI assistant. I'll ask you a few quick questions to understand your AI learning goals.

This should take about 2 minutes. Ready to start?

[Yes, let's go!] [Not right now]
```

---

### Step 2: Quick Conversation (3-5 questions)

**Question 1: Name**
```
AI: Great! Let's begin. What should I call you?

User: Rajesh

AI: Nice to meet you, Rajesh! 👋
```

**Question 2: Role/Profession**
```
AI: What do you do professionally? (e.g., Software Developer, Teacher, Business Analyst)

User: Marketing Manager

AI: Got it - Marketing Manager. AI is transforming marketing right now!
```

**Question 3: Primary Goal**
```
AI: What's your main reason for exploring AI right now?

[Career Growth] [Skill Enhancement] [Business Innovation] [Just Curious]

User: [Career Growth]

AI: Smart move. 62% of professionals are upskilling in AI to stay competitive.
```

**Question 4: Current Challenge (Optional)**
```
AI: One more thing - what's your biggest challenge with AI right now?

User: Not sure where to start, too many tools

AI: You're not alone - that's the #1 frustration I hear. We can help with that.
```

**Question 5: Email Capture**
```
AI: Perfect! To send you the next step, I'll need your email.

Where should I send your personalized intake link?

User: rajesh@example.com

AI: Got it - rajesh@example.com ✅
```

---

### Step 3: Completion & Email Send

**AI Final Message:**
```
AI: Excellent, Rajesh! 

I've just sent an email to rajesh@example.com with your personalized intake link.

📧 Check your inbox (and spam folder just in case)

The next step takes about 5-7 minutes, and then you'll get your:
✅ Personalized AI learning profile
✅ Learning style analysis
✅ 3-5 page AI readiness report

Talk soon!
```

**System Actions:**
1. Save conversation to database/Google Sheets
2. Generate JWT token with collected data
3. Send email via Resend
4. Track analytics event: `chatquiz_completed`
5. Show success state in ChatUI

---

### Step 4: User Receives Email

**Email Delivered:**
- Subject: "Complete Your AI Learning Profile - Rajesh"
- Contains personalized message
- Clear CTA button: "Complete Your Profile →"
- Link includes JWT token

**User Clicks:**
- Redirected to: `https://intake.teachmeai.in?token=eyJhbGc...`

---

### Step 5: Full Intake App

**Intake App Page Loads:**

**Pre-filled Fields:**
```
Welcome back, Rajesh! 👋

Based on our quick chat, here's what we know:
✓ Name: Rajesh
✓ Email: rajesh@example.com
✓ Role: Marketing Manager
✓ Goal: Career Growth
✓ Challenge: Not sure where to start, too many tools

Now let's dive deeper...
```

**Remaining Questions:**
- VARK learning style assessment
- AI tool experience levels
- Industry-specific context
- Time availability
- Budget considerations
- Expected outcomes

**Submission:**
- All data (ChatUI + Intake form) sent to orchestration
- Agents process the complete profile
- Generate comprehensive report

---

## Technical Implementation

### ChatUI Component Architecture

**File:** `components/chat-quiz.tsx`

```typescript
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

interface ChatQuizProps {
  onComplete?: (data: CollectedData) => void
}

export function ChatQuiz({ onComplete }: ChatQuizProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [collectedData, setCollectedData] = useState<CollectedData>({})
  const [isComplete, setIsComplete] = useState(false)

  // Send message to AI
  async function sendMessage(userMessage: string) {
    // Add user message to UI
    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Stream AI response
    const response = await fetch('/api/chat-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationHistory: messages,
        userMessage,
        collectedData
      })
    })

    // Handle streaming response
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let aiMessage = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const data = JSON.parse(chunk)

      aiMessage += data.message
      setCollectedData(data.dataCollected)

      if (data.isComplete) {
        setIsComplete(true)
        onComplete?.(data.dataCollected)
      }
    }

    // Add AI message to UI
    setMessages(prev => [...prev, {
      id: generateId(),
      role: 'assistant',
      content: aiMessage,
      timestamp: new Date()
    }])

    setIsLoading(false)
  }

  return (
    <div className="chat-quiz-container">
      <div className="messages">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Type your response..."
          disabled={isComplete}
        />
        <button onClick={() => sendMessage(input)}>Send</button>
      </div>
    </div>
  )
}
```

---

### API Route Implementation

**File:** `app/api/chat-quiz/route.ts`

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { conversationHistory, userMessage, collectedData } = await req.json()

  // Determine what data we still need
  const missingFields = detectMissingFields(collectedData)
  
  // Extract data from user message (if applicable)
  const extractedData = await extractDataFromMessage(
    userMessage, 
    missingFields[0] // Next field to collect
  )

  // Update collected data
  const updatedData = { ...collectedData, ...extractedData }

  // Check if we have everything
  const isComplete = calculateCompletion(updatedData)

  // Generate AI response
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  
  const prompt = buildPrompt({
    conversationHistory,
    userMessage,
    collectedData: updatedData,
    nextField: missingFields[1] // What to ask next
  })

  const result = await model.generateContentStream(prompt)

  // Stream response back to client
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        controller.enqueue(JSON.stringify({
          message: text,
          dataCollected: updatedData,
          isComplete,
          confidence: calculateConfidence(updatedData)
        }))
      }

      // If complete, trigger email
      if (isComplete) {
        await sendIntakeLink(updatedData)
      }

      controller.close()
    }
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}

function detectMissingFields(data: CollectedData): string[] {
  const required = ['name', 'email', 'role', 'goal']
  return required.filter(field => !data[field])
}

function buildPrompt(context: any): string {
  return `You are a friendly AI assistant helping someone get started with AI learning.

Conversation history:
${context.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

User just said: "${context.userMessage}"

Data collected so far: ${JSON.stringify(context.collectedData)}

Next field to collect: ${context.nextField}

Instructions:
1. Acknowledge the user's response warmly
2. If the response contains the data for current field, extract it
3. Ask for the next missing field naturally
4. Keep responses brief (1-2 sentences max)
5. Be encouraging and positive

Generate your response:`
}
```

---

### Email Sender Implementation

**File:** `app/api/send-intake-link/route.ts`

```typescript
import { Resend } from 'resend'
import jwt from 'jsonwebtoken'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.json()

  // Generate JWT token
  const token = jwt.sign(
    {
      name: data.name,
      email: data.email,
      role: data.role,
      goal: data.goal,
      challenge: data.challenge,
      timestamp: Date.now()
    },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  // Build intake link
  const intakeLink = `https://intake.teachmeai.in?token=${token}`

  // Send email
  await resend.emails.send({
    from: 'Khalid at TeachMeAI <khalid@teachmeai.in>',
    to: data.email,
    subject: `Complete Your AI Learning Profile - ${data.name}`,
    html: `
      <h2>Hi ${data.name},</h2>
      
      <p>Great start! You mentioned you're a <strong>${data.role}</strong> looking to <strong>${data.goal}</strong>.</p>
      
      <p>To generate your personalized AI analysis, we need a bit more context.</p>
      
      <p style="margin: 30px 0;">
        <a href="${intakeLink}" 
           style="background: #0066CC; color: white; padding: 15px 30px; 
                  text-decoration: none; border-radius: 8px; font-weight: bold;">
          Complete Your Profile →
        </a>
      </p>
      
      <p>This will take about 5-7 minutes and give us everything we need to:</p>
      <ul>
        <li>Analyze your learning style (VARK assessment)</li>
        <li>Map your AI readiness</li>
        <li>Generate your custom 3-5 page report</li>
      </ul>
      
      <p>Looking forward to helping you on your AI journey!</p>
      
      <p>Best,<br>Khalid Irfan<br>TeachMeAI</p>
      
      <p style="font-size: 12px; color: #666;">
        P.S. Your intake link is valid for 7 days.
      </p>
    `
  })

  // Log to Google Sheets
  await logToGoogleSheets({
    ...data,
    intakeLink,
    timestamp: new Date().toISOString(),
    status: 'email_sent'
  })

  return Response.json({ success: true })
}
```

---

### Intake App Pre-fill

**File:** `/Users/khalidirfan/projects/teachmeai-intake-app/src/app/page.tsx`

```typescript
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'

export default function IntakeForm() {
  const searchParams = useSearchParams()
  const [prefillData, setPrefillData] = useState(null)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!)
        setPrefillData(decoded)
      } catch (err) {
        console.error('Invalid token:', err)
      }
    }
  }, [searchParams])

  if (prefillData) {
    return (
      <div className="prefill-welcome">
        <h2>Welcome back, {prefillData.name}! 👋</h2>
        <p>Based on our quick chat, here's what we know:</p>
        <ul>
          <li>✓ Name: {prefillData.name}</li>
          <li>✓ Email: {prefillData.email}</li>
          <li>✓ Role: {prefillData.role}</li>
          <li>✓ Goal: {prefillData.goal}</li>
          {prefillData.challenge && (
            <li>✓ Challenge: {prefillData.challenge}</li>
          )}
        </ul>
        <p>Now let's dive deeper...</p>

        <IntakeFormFields initialData={prefillData} />
      </div>
    )
  }

  return <IntakeFormFields />
}
```

---

## Orchestration Integration

### How ChatUI Data Flows to Agents

**Current Orchestration:**
```
Intake Form → Submit → Orchestration Agent
  ↓
Gap Detection Agent (what's missing?)
  ↓
VARK Agent + SRL Agent + Goals Agent (parallel)
  ↓
Synthesis Agent (combine results)
  ↓
Report Generation
```

**With ChatUI:**
```
ChatUI (Basic Info) → Email with Token
  ↓
User Clicks → Intake App (Pre-filled + Additional Questions)
  ↓
Submit to Orchestration Agent
  ↓
[Same orchestration flow as before]
```

**Key Integration Point:**

When intake app submits, it sends:
```json
{
  "source": "chatui",
  "chatQuizData": {
    "name": "Rajesh",
    "email": "rajesh@example.com",
    "role": "Marketing Manager",
    "goal": "Career Growth",
    "challenge": "Not sure where to start"
  },
  "intakeFormData": {
    "varkResponses": [...],
    "experienceLevel": "Intermediate",
    "timeAvailable": "5-10 hours/week",
    ...
  }
}
```

**Orchestration Agent** receives **both** datasets and:
1. Validates completeness
2. Detects any remaining gaps
3. Routes to specialized agents
4. Each agent now has richer context
5. Synthesis produces better report

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────┐
│  teachmeai.in (Next.js - Vercel)                     │
│                                                       │
│  ┌────────────────────────────────────────────┐     │
│  │  Hero Section                              │     │
│  │  "Get Your Free AI Analysis"               │     │
│  └───────────────┬────────────────────────────┘     │
│                  │ User clicks                       │
│  ┌───────────────▼────────────────────────────┐     │
│  │  ChatUI Quiz Component                     │     │
│  │  - Conversational AI (Gemini 2.5 Flash)    │     │
│  │  - Collects: Name, Email, Role, Goal       │     │
│  │  - Validates in real-time                  │     │
│  │  - Streaming responses (SSE)               │     │
│  └───────────────┬────────────────────────────┘     │
│                  │ Complete (85% confidence)         │
└──────────────────┼───────────────────────────────────┘
                   │
                   ↓
┌──────────────────────────────────────────────────────┐
│  API Route: /api/send-intake-link                    │
│  - Generate JWT token with collected data            │
│  - Send email via Resend                             │
│  - Log to Google Sheets                              │
└──────────────────┬───────────────────────────────────┘
                   │
                   ↓
┌──────────────────────────────────────────────────────┐
│  Email Delivered to User                             │
│  - Personalized message                              │
│  - Link: intake.teachmeai.in?token=xxx               │
│  - CTA: "Complete Your Profile"                      │
└──────────────────┬───────────────────────────────────┘
                   │ User clicks
                   ↓
┌──────────────────────────────────────────────────────┐
│  teachmeai-intake-app (Vercel)                       │
│                                                       │
│  ┌────────────────────────────────────────────┐     │
│  │  Intake Form Page                          │     │
│  │  - Decode JWT token from URL               │     │
│  │  - Pre-fill: Name, Email, Role, Goal       │     │
│  │  - Show "Welcome Back" message             │     │
│  │  - Additional questions (VARK, etc.)       │     │
│  └───────────────┬────────────────────────────┘     │
│                  │ User submits full form            │
└──────────────────┼───────────────────────────────────┘
                   │
                   ↓
┌──────────────────────────────────────────────────────┐
│  Agent Service (Cloud Run)                           │
│                                                       │
│  ┌────────────────────────────────────────────┐     │
│  │  Orchestration Agent                       │     │
│  │  - Receives ChatUI data + Intake data      │     │
│  │  - Validates completeness                  │     │
│  │  - Routes to specialized agents            │     │
│  └───────────────┬────────────────────────────┘     │
│                  │                                    │
│  ┌───────────────▼────────────────────────────┐     │
│  │  Parallel Agent Processing                 │     │
│  │  - VARK Agent (learning style)             │     │
│  │  - SRL Agent (self-regulation)             │     │
│  │  - Goals Agent (motivation)                │     │
│  │  - Context enriched with ChatUI data       │     │
│  └───────────────┬────────────────────────────┘     │
│                  │                                    │
│  ┌───────────────▼────────────────────────────┐     │
│  │  Synthesis Agent                           │     │
│  │  - Combines all agent outputs              │     │
│  │  - Creates comprehensive profile           │     │
│  │  - Generates 3-5 page report               │     │
│  └───────────────┬────────────────────────────┘     │
│                  │                                    │
└──────────────────┼───────────────────────────────────┘
                   │
                   ↓
┌──────────────────────────────────────────────────────┐
│  Report Delivery                                     │
│  - PDF generated (pdfkit)                            │
│  - Uploaded to Cloud Storage                         │
│  - Email sent with download link                     │
│  - CTA: "Book Clarity Call (₹2,600)"                 │
└──────────────────────────────────────────────────────┘
```

---

## Benefits of This Architecture

### 1. **Better User Experience**
- Conversational, engaging (vs boring form)
- Feels personalized from the start
- Lower cognitive load (one question at a time)
- Immediate feedback and validation

### 2. **Higher Completion Rates**
- ChatUI: Quick and easy (2 mins)
- Email link: Self-paced, can complete later
- Pre-filled data: Less friction
- Expected improvement: 60% → 75%+ completion

### 3. **Lead Qualification**
- ChatUI captures intent early
- Email delivery = verified contact
- Click-through = serious interest
- Better signal for sales funnel

### 4. **Data Quality**
- Real-time validation
- Natural language extraction
- Conversational context preserves nuance
- Richer data for agents

### 5. **Flexibility**
- Can adjust questions dynamically
- A/B test conversation flows
- Personalize based on segment
- Easy to iterate and improve

---

## Implementation Phases

### Phase 1: ChatUI MVP (Week 1-2)

**Goal:** Build basic conversational quiz

**Tasks:**
- [ ] Create ChatUI component (UI only, hardcoded)
- [ ] Add message bubbles, typing indicators
- [ ] Test UX with static conversation
- [ ] Design and collect feedback

**Deliverable:** Static ChatUI prototype

---

### Phase 2: AI Integration (Week 3)

**Goal:** Connect to Gemini API

**Tasks:**
- [ ] Build `/api/chat-quiz` route
- [ ] Implement streaming responses
- [ ] Add data extraction logic
- [ ] Test with real conversations

**Deliverable:** Working AI chatbot (no email yet)

---

### Phase 3: Email + Token System (Week 4)

**Goal:** Email link to intake app

**Tasks:**
- [ ] Build JWT token generation
- [ ] Create email template
- [ ] Set up Resend integration
- [ ] Build `/api/send-intake-link` route

**Deliverable:** Complete ChatUI → Email flow

---

### Phase 4: Intake App Pre-fill (Week 5)

**Goal:** Pre-populate intake form

**Tasks:**
- [ ] Add token parsing to intake app
- [ ] Build pre-fill UI component
- [ ] Test token validation
- [ ] Handle expired/invalid tokens

**Deliverable:** Seamless ChatUI → Intake transition

---

### Phase 5: Orchestration Integration (Week 6)

**Goal:** Connect to existing agent system

**Tasks:**
- [ ] Update orchestration to accept ChatUI data
- [ ] Enhance agents with additional context
- [ ] Test full end-to-end flow
- [ ] Monitor and optimize

**Deliverable:** Complete integrated system

---

## Analytics & Tracking

### Events to Track

**ChatUI Events:**
- `chatquiz_started` - User opens chat
- `chatquiz_message_sent` - Each user message
- `chatquiz_completed` - All data collected
- `chatquiz_abandoned` - User closes before complete

**Email Events:**
- `intake_email_sent` - Email delivered
- `intake_email_opened` - User opened email
- `intake_link_clicked` - User clicked CTA

**Intake Events:**
- `intake_form_started` - From token link
- `intake_form_prefilled` - Data pre-populated
- `intake_form_submitted` - Complete submission

**Funnel Metrics:**
- ChatUI completion rate
- Email open rate
- Link click-through rate
- Intake form completion rate (from link)
- Overall conversion (ChatUI → Report)

---

## Cost Analysis

### Per-User Cost

| Component | Cost | Notes |
|-----------|------|-------|
| ChatUI conversation (5 messages) | ₹0.005 | Gemini 2.5 Flash |
| Email delivery | ₹0 | Resend free tier |
| JWT token generation | ₹0 | Negligible compute |
| Intake app hosting | ₹0 | Vercel free tier |
| Agent processing | ₹0.015 | Existing cost |
| **Total per user** | **₹0.02** | (~$0.0002) |

**At 100 users/month:** ₹2 total cost

---

## Success Criteria

### Week 1-2 (ChatUI Prototype)
- [ ] ChatUI loads smoothly on mobile and desktop
- [ ] Conversation feels natural (5+ test users confirm)
- [ ] UI is visually appealing and on-brand

### Week 3-4 (AI + Email Integration)
- [ ] AI responses are contextual and helpful
- [ ] Email delivery 95%+ success rate
- [ ] Tokens generate and validate correctly

### Week 5-6 (Full Integration)
- [ ] ChatUI → Email → Intake flow working end-to-end
- [ ] Pre-fill data accuracy: 100%
- [ ] Orchestration receives enriched data
- [ ] Reports quality improves (subjective assessment)

### Post-Launch (Month 1)
- [ ] ChatUI completion rate: 70%+
- [ ] Email open rate: 40%+
- [ ] Link click-through: 60%+
- [ ] Intake completion (from link): 80%+
- [ ] Overall funnel: 35%+ (start → report)

---

## Next Steps

### This Week
1. Review this architecture document
2. Create ChatUI component (static version)
3. Design conversation flow (question sequence)
4. Set up Resend account (if not done)

### Next Week
5. Build `/api/chat-quiz` route
6. Implement basic AI conversation
7. Add data extraction logic
8. Test with sample conversations

### Week 3
9. Build email + token system
10. Create email template
11. Test ChatUI → Email flow
12. Alpha test with 5-10 users

### Week 4
13. Add intake app pre-fill logic
14. Test full end-to-end flow
15. Fix bugs and iterate
16. Prepare for launch

**Target Launch:** Mid-February 2026

---

## FAQ

### Q: Why not just improve the current static form?
**A:** ChatUI provides:
- Much better engagement (conversation vs. form)
- Higher completion rates (progressive disclosure)
- Better lead qualification (email verified before full intake)
- More flexibility (can adapt questions dynamically)

### Q: Won't this add complexity?
**A:** Initially yes, but:
- Better UX = higher conversion = more revenue
- Once built, it's fully automated
- Can A/B test with existing form
- Easier to iterate on conversation vs. form design

### Q: What if users prefer the form?
**A:** We'll A/B test:
- 50% users: ChatUI
- 50% users: Static form
- Measure completion rates, satisfaction, conversion
- Keep the better performer

### Q: How long will ChatUI conversations be?
**A:** Target: 5-7 messages total
- Actual time: 2-3 minutes
- Faster than current form (3-5 mins)
- More enjoyable experience

### Q: Will this work on mobile?
**A:** Yes, mobile-first design:
- Touch-optimized
- Responsive bubbles
- Keyboard-aware scrolling
- Works on all devices

---

**END OF CHATUI ARCHITECTURE DOCUMENT**

For implementation questions:
- ChatUI frontend: See `components/chat-quiz.tsx` section
- API routes: See `app/api/chat-quiz/route.ts` section
- Integration: See "Orchestration Integration" section
