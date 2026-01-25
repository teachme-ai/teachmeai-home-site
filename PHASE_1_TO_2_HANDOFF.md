# Phase 1 → Phase 2 Handoff Document

**Date:** January 25, 2026  
**Status:** Phase 1 Complete ✅ | Phase 2 Ready to Start  
**Agent 1 (Home Site):** Complete  
**Agent 2 (Intake App):** Awaiting deployment

---

## ✅ **Phase 1 Deliverables (Complete)**

### **1. Working ChatUI System**
- Location: `/components/chat-quiz.tsx`
- Live URL: Vercel (teachmeai-home-site-xxx.vercel.app)
- Features:
  - AI conversation (Gemini)
  - Data collection (name, email, role, goal, challenge)
  - JWT token generation
  - Email delivery with link

### **2. Sample JWT Token Received**

**Test Email Sent To:** reachirfan@gmail.com

**JWT Token:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWVzIiwiZW1haWwiOiJyZWFjaGlyZmFuQGdtYWlsLmNvbSIsInJvbGUiOiJlZHVjYXRvciIsImdvYWwiOiJza2lsbCBlbmhhbmNlbWVudCBhbmQgYXBwbGljYXRpb24gaW4gaW1wcm92aW5nIGxlYXJuaW5nIGV4cHJlcmllbmNlIiwiY2hhbGxlbmdlIjpudWxsLCJ0aW1lc3RhbXAiOjE3NjkzNTU5Njc2MTMsImlhdCI6MTc2OTM1NTk2NywiZXhwIjoxNzY5OTYwNzY3fQ.dIAfzsCNe2QFrNyQ0XRNyNdQn0y1nwzqWX8kY-evLFA
```

**Decoded Payload:**
```json
{
  "name": "yes",
  "email": "reachirfan@gmail.com",
  "role": "educator",
  "goal": "skill enhancement and application in improving learning experience",
  "challenge": null,
  "timestamp": 1769355967613,
  "iat": 1769355967,
  "exp": 1769960767
}
```

**Link Generated:**
```
https://intake.teachmeai.in/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔐 **Critical Information for Phase 2**

### **JWT_SECRET (MUST BE IDENTICAL)**

**⚠️ IMPORTANT:** The intake app MUST use the EXACT SAME `JWT_SECRET` as the home site.

**Location in Home Site:**
- File: `.env.local`
- Variable: `JWT_SECRET`
- Format: 64-character hex string

**Action Required:**
1. Get JWT_SECRET from home site `.env.local`
2. Add to intake app `.env.local`
3. Add to Vercel/Cloud Run environment variables
4. Verify they match EXACTLY

**Test Verification:**
```bash
# Decode the sample token above with JWT_SECRET
# Should decode successfully without errors
```

---

## 📋 **Phase 2 Requirements**

### **1. JWT Token Decoding**

**Read token from URL:**
```typescript
// In intake app
const searchParams = new URLSearchParams(window.location.search)
const token = searchParams.get('token')
```

**Decode token:**
```typescript
import * as jwt from 'jsonwebtoken'

const decoded = jwt.verify(token, process.env.JWT_SECRET)
// Returns: { name, email, role, goal, challenge, timestamp, iat, exp }
```

**Handle errors:**
- Token expired (> 7 days old)
- Token invalid (wrong signature)
- Token missing from URL
- JWT_SECRET mismatch

---

### **2. Form Pre-fill**

**Use decoded data to pre-fill:**
```typescript
interface ChatQuizData {
  name: string
  email: string
  role: string
  goal: string
  challenge: string | null
}

// Pre-fill form fields
setFormData({
  name: decoded.name,
  email: decoded.email,
  role: decoded.role,
  goal: decoded.goal,
  challenge: decoded.challenge || ''
})
```

**Make fields read-only or show as badges:**
- User shouldn't need to re-enter this data
- But can edit if needed

---

### **3. Welcome Message**

**Show personalized greeting:**
```typescript
<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
  <h2 className="text-xl font-bold text-blue-900">
    Welcome back, {decoded.name}! 👋
  </h2>
  <p className="text-blue-700">
    We saved your information from our chat. Let's complete your AI learning profile.
  </p>
  <ul className="mt-2 text-sm text-blue-600">
    <li>✅ Role: {decoded.role}</li>
    <li>✅ Goal: {decoded.goal}</li>
  </ul>
</div>
```

---

### **4. Combined Data Submission**

**When user completes full form:**
```typescript
const fullData = {
  // From ChatUI (JWT token)
  name: decoded.name,
  email: decoded.email,
  role: decoded.role,
  goal: decoded.goal,
  challenge: decoded.challenge,
  
  // From intake form
  experience: formData.experience,
  varkResults: formData.varkResults,
  // ... other intake form fields
}

// Submit to orchestration
await submitToOrchestration(fullData)
```

---

## 🏗️ **Deployment Requirements**

### **Intake App Deployment:**

**Option 1: Vercel**
```bash
# Push to GitHub
git push origin main

# In Vercel:
# - Import repository
# - Add environment variables (including JWT_SECRET!)
# - Deploy
# - Add custom domain: intake.teachmeai.in
```

**Option 2: Cloud Run**
```bash
gcloud run deploy teachmeai-intake-app \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars JWT_SECRET=<same-as-home-site>
  
# Map domain
gcloud run domain-mappings create \
  --service teachmeai-intake-app \
  --domain intake.teachmeai.in
```

**DNS Configuration:**
```
Type: CNAME
Name: intake
Value: cname.vercel-dns.com (or ghs.googlehosted.com for Cloud Run)
```

---

## 🧪 **Testing Checklist**

### **Phase 2 Agent Should Test:**

**1. Token Decoding:**
- [ ] Can read token from URL parameter
- [ ] Token decodes successfully
- [ ] Handles expired tokens
- [ ] Handles invalid tokens
- [ ] Handles missing tokens

**2. Data Display:**
- [ ] Welcome message shows user's name
- [ ] Form pre-fills with ChatQuiz data
- [ ] User can see what was already collected
- [ ] User can edit if needed

**3. Full Flow:**
- [ ] User clicks email link
- [ ] Lands on intake.teachmeai.in with token
- [ ] Sees personalized welcome
- [ ] Completes VARK assessment
- [ ] Completes additional questions
- [ ] Submits combined data
- [ ] Receives AI analysis report

**4. Edge Cases:**
- [ ] Token expired (show friendly error + option to start over)
- [ ] Token tampered (show security error)
- [ ] No token in URL (redirect to home site)
- [ ] Network errors during submission

---

## 📊 **Expected User Journey**

```
1. User visits teachmeai.in
   └─> Starts ChatUI conversation
       └─> Provides: name, email, role, goal
           └─> Completes conversation
               └─> ChatUI generates JWT token
                   └─> Email sent with link
                       └─> User clicks email link
                           └─> Opens: intake.teachmeai.in?token=xxx
                               └─> [PHASE 2 STARTS HERE]
                                   └─> Intake app decodes token
                                       └─> Shows "Welcome back, [name]!"
                                           └─> Pre-fills form with ChatQuiz data
                                               └─> User completes VARK + additional questions
                                                   └─> Submits combined data
                                                       └─> Orchestration agents process
                                                           └─> User receives AI analysis report
```

---

## 🔗 **Key Files Created in Phase 1**

**For Phase 2 Reference:**

1. **JWT_TOKEN_SPECIFICATION.md**
   - Complete token format
   - Payload structure
   - Security notes
   - Example code

2. **CHATUI_SETUP_GUIDE.md**
   - How ChatUI works
   - Data collection flow
   - API endpoints

3. **LOCAL_DEVELOPMENT_GUIDE.md**
   - Running both apps locally
   - Port configuration (3000 vs 3001)
   - Environment setup

4. **PRODUCTION_DEPLOYMENT_GUIDE.md**
   - Vercel deployment
   - Cloud Run deployment
   - Domain configuration

---

## ⚡ **Quick Start for Phase 2 Agent**

**Immediate Actions:**

1. **Get JWT_SECRET from Agent 1**
   ```bash
   # Agent 1: Share the value from .env.local
   cat .env.local | grep JWT_SECRET
   ```

2. **Add to Intake App**
   ```bash
   # In /Users/khalidirfan/projects/teachmeai-intake-app/.env.local
   JWT_SECRET=<exact-value-from-home-site>
   ```

3. **Test Token Decoding Locally**
   ```bash
   # Use the sample token from above
   # Verify it decodes with your JWT_SECRET
   ```

4. **Build Token Decoder Component**
   ```typescript
   // components/token-decoder.tsx
   // Or wherever makes sense in your architecture
   ```

5. **Deploy to intake.teachmeai.in**

6. **Test with Real Email Link**
   - Use the link from reachirfan@gmail.com
   - Verify it decodes and pre-fills

---

## 🎯 **Success Criteria for Phase 2**

**Phase 2 is complete when:**

- [ ] Intake app deployed at `intake.teachmeai.in`
- [ ] JWT token from email link decodes successfully
- [ ] Form pre-fills with ChatQuiz data
- [ ] User sees personalized welcome message
- [ ] User can complete remaining intake questions
- [ ] Combined data (ChatQuiz + Intake) submits to orchestration
- [ ] End-to-end flow works: ChatUI → Email → Intake → Report

---

## 📞 **Coordination**

**Agent 1 (Home Site) Contact:** Waiting for Phase 2 completion  
**Agent 2 (Intake App) Action:** Begin implementation  

**Shared Secret:** JWT_SECRET (must synchronize)  
**Integration Point:** URL parameter `?token=xxx`

---

## 🚀 **Ready to Start Phase 2!**

**Phase 1 is 100% complete and production-ready.**  
**Phase 2 can begin immediately.**

All necessary specifications, sample data, and documentation provided above.

---

**Last Updated:** January 25, 2026  
**Phase 1 Status:** ✅ Complete  
**Phase 2 Status:** 🟡 Ready to Start
