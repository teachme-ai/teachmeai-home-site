# JWT Token Specification for Intake App Integration

**Version:** 1.0  
**Created:** January 25, 2026  
**Purpose:** Define the exact JWT token structure used by the ChatUI to pass data to the Intake App

---

## Overview

The ChatUI on `teachmeai.in` collects basic user information through conversation, generates a JWT token containing that data, and emails a link to the user. The Intake App at `intake.teachmeai.in` must decode this token and pre-fill the form.

---

## JWT Token Structure

### **Signing Algorithm**
- **Algorithm:** HS256 (HMAC with SHA-256)
- **Secret:** Stored in environment variable `JWT_SECRET`
- **⚠️ CRITICAL:** Both home-site and intake-app MUST use the **exact same** `JWT_SECRET`

### **Token Expiration**
- **Expiry:** 7 days from generation
- **Claim:** `exp` (standard JWT expiration)

### **Payload Structure**

```typescript
interface JWTPayload {
  // Required fields (always present)
  name: string          // User's full name
  email: string         // User's email address (validated)
  role: string          // Professional role/title
  goal: string          // Primary AI learning goal
  
  // Optional fields (may be null)
  challenge: string | null  // Current AI challenge (optional)
  
  // Metadata (always present)
  timestamp: number     // Unix timestamp (ms) when token was created
  
  // Standard JWT claims (automatically added by jsonwebtoken)
  iat: number          // Issued at (Unix timestamp)
  exp: number          // Expiration (Unix timestamp)
}
```

---

## Complete Example

### **Encoded Token (in URL)**
```
https://intake.teachmeai.in?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFqZXNoIFNpbmdoIiwiZW1haWwiOiJyYWplc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiTWFya2V0aW5nIE1hbmFnZXIiLCJnb2FsIjoiQ2FyZWVyIEdyb3d0aCIsImNoYWxsZW5nZSI6Ik5vdCBzdXJlIHdoZXJlIHRvIHN0YXJ0Iiwid mlkZXN0YW1wIjoxNzM3ODM1MjAwMDAwLCJpYXQiOjE3Mzc4MzUyMDAsImV4cCI6MTczODQ0MDAwMH0.Xy-JsVQ3D8QiKZPqHjSwX9L0zR8vN6mT4cU2eKlPo1A
```

### **Decoded Payload**
```json
{
  "name": "Rajesh Singh",
  "email": "rajesh@example.com",
  "role": "Marketing Manager",
  "goal": "Career Growth",
  "challenge": "Not sure where to start",
  "timestamp": 1737835200000,
  "iat": 1737835200,
  "exp": 1738440000
}
```

---

## Field Specifications

### **name** (string, required)
- **Format:** Plain text, UTF-8
- **Max Length:** 100 characters
- **Validation:** Non-empty after trim
- **Examples:**
  - ✅ "Rajesh Singh"
  - ✅ "Dr. Priya Sharma"
  - ✅ "John O'Brien"
  - ❌ "" (empty)
  - ❌ null

### **email** (string, required)
- **Format:** Valid email address
- **Validation Regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Max Length:** 255 characters
- **Normalization:** Stored as provided (preserving case)
- **Examples:**
  - ✅ "rajesh@example.com"
  - ✅ "priya.sharma@company.co.in"
  - ✅ "user+tag@domain.org"
  - ❌ "invalid-email"
  - ❌ "missing@domain"

### **role** (string, required)
- **Format:** Plain text job title/role
- **Max Length:** 100 characters
- **Validation:** Non-empty after trim
- **Examples:**
  - ✅ "Software Developer"
  - ✅ "Marketing Manager"
  - ✅ "Teacher"
  - ✅ "Business Analyst"
  - ✅ "Entrepreneur"
  - ❌ "" (empty)

### **goal** (string, required)
- **Format:** Plain text description
- **Max Length:** 500 characters
- **Common Values:**
  - "Career Growth"
  - "Skill Enhancement"
  - "Business Innovation"
  - "Stay Relevant"
  - "Explore AI"
  - Or custom user response
- **Examples:**
  - ✅ "Career Growth"
  - ✅ "Learn AI to improve my marketing campaigns"
  - ✅ "Understand AI tools for my business"
  - ❌ "" (empty)

### **challenge** (string | null, optional)
- **Format:** Plain text description or null
- **Max Length:** 1000 characters
- **Examples:**
  - ✅ "Not sure where to start with so many AI tools"
  - ✅ "Worried AI will replace my job"
  - ✅ null (if user didn't provide)
  - ✅ "" (empty string treated as null)

### **timestamp** (number, required)
- **Format:** Unix timestamp in milliseconds
- **Usage:** Metadata for analytics/debugging
- **Example:** 1737835200000 (January 25, 2026)

---

## Token Generation (Home Site)

### **Code Example:**

```typescript
import * as jwt from 'jsonwebtoken'

const token = jwt.sign(
  {
    name: data.name,
    email: data.email,
    role: data.role,
    goal: data.goal,
    challenge: data.challenge || null,
    timestamp: Date.now()
  },
  process.env.JWT_SECRET || 'fallback-secret-change-this',
  { expiresIn: '7d' }
)
```

### **Environment Variable:**
```bash
JWT_SECRET=your-secure-random-string-min-32-characters
```

**⚠️ SECURITY:** Use a cryptographically secure random string (minimum 32 characters).

---

## Token Decoding (Intake App)

### **Code Example:**

```typescript
import * as jwt from 'jsonwebtoken'
import { useSearchParams } from 'next/navigation'

export default function IntakePage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ''
      ) as JWTPayload
      
      // Use decoded data to pre-fill form
      console.log('Pre-fill data:', decoded)
      
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Token expired (> 7 days old)
        console.error('Token expired')
      } else if (error instanceof jwt.JsonWebTokenError) {
        // Invalid token (tampered or wrong secret)
        console.error('Invalid token')
      }
    }
  }
}
```

### **Environment Variable (MUST MATCH HOME SITE):**
```bash
JWT_SECRET=your-secure-random-string-min-32-characters
```

---

## Error Handling

### **Token Expired (After 7 Days)**
**Error:** `TokenExpiredError`

**User Experience:**
```
❌ Your intake link has expired

This link was valid for 7 days and is now expired.

[Start a New Assessment] ← Link back to teachmeai.in
```

### **Invalid Token (Tampered)**
**Error:** `JsonWebTokenError`

**User Experience:**
```
❌ Invalid link

This link appears to be invalid or corrupted.

[Start a New Assessment] ← Link back to teachmeai.in
```

### **Missing Token**
**Scenario:** User goes to `intake.teachmeai.in` without `?token=` parameter

**User Experience:**
- Show regular intake form (no pre-fill)
- OR redirect to home site with message: "Please start from teachmeai.in"

---

## Pre-fill UI Guidelines

### **Welcome Message Example:**

```tsx
<div className="welcome-banner">
  <h2>Welcome back, {decoded.name}! 👋</h2>
  <p>Based on our quick chat, here's what we know:</p>
  <ul>
    <li>✓ Name: {decoded.name}</li>
    <li>✓ Email: {decoded.email}</li>
    <li>✓ Role: {decoded.role}</li>
    <li>✓ Goal: {decoded.goal}</li>
    {decoded.challenge && (
      <li>✓ Challenge: {decoded.challenge}</li>
    )}
  </ul>
  <p>Now let's dive deeper into your learning profile...</p>
</div>
```

### **Form Pre-fill:**
- **Name field:** Pre-filled, marked as `readonly` or `disabled`
- **Email field:** Pre-filled, marked as `readonly` or `disabled`
- **Role field:** Pre-filled, allow editing (in case user wants to clarify)
- **Goal field:** Pre-filled, allow editing
- **Challenge field:** Pre-filled if provided, allow editing
- **All other fields:** Empty, user must fill

---

## Testing Checklist

### **For Home Site (Already done)**
- [x] Generate valid JWT token
- [x] Token contains all required fields
- [x] Token has 7-day expiration
- [x] Email sends successfully with token in URL
- [x] URL is properly encoded

### **For Intake App (To be implemented)**
- [ ] Decode token from URL parameter
- [ ] Verify token signature matches
- [ ] Handle expired tokens gracefully
- [ ] Handle invalid/tampered tokens
- [ ] Pre-fill form fields correctly
- [ ] Show welcome message with collected data
- [ ] Allow user to edit pre-filled data (except email)
- [ ] Submit combined data (ChatUI + Intake) to orchestration

---

## Integration Testing

### **Test Case 1: Happy Path**
1. Complete ChatUI conversation on home site
2. Receive email with link
3. Click link → Opens intake app with `?token=xxx`
4. Token decodes successfully
5. Form shows pre-filled data
6. User completes remaining fields (VARK, etc.)
7. Submit → Orchestration receives both datasets

### **Test Case 2: Expired Token**
1. Generate token
2. Manually set expiration to past (or wait 7 days)
3. Try to use link
4. Should show "Token expired" error
5. Offer to restart from home site

### **Test Case 3: Invalid Token**
1. Take valid token, change a few characters
2. Try to use link
3. Should show "Invalid link" error
4. Offer to restart from home site

### **Test Case 4: No Token**
1. Go directly to `intake.teachmeai.in` (no `?token=`)
2. Should show regular form OR redirect to home site
3. No pre-fill

---

## Security Considerations

### **⚠️ CRITICAL:**
1. **Never expose JWT_SECRET** in client-side code
2. **Validate token server-side** before trusting data
3. **Re-validate email format** even though it was validated in home site
4. **Use HTTPS only** for token transmission
5. **Log token usage** for abuse detection (rate limiting)

### **Attack Scenarios:**

**Scenario 1: Token Reuse**
- User uses same link multiple times → ALLOWED (unless you implement one-time tokens)
- Current design: Token can be reused within 7-day window

**Scenario 2: Token Sharing**
- User shares link with someone else → POSSIBLE
- Mitigation: Email address is in token, intake app can verify it matches
- Optional: Add browser fingerprint or IP verification

**Scenario 3: Secret Leakage**
- If JWT_SECRET is compromised → Attacker can generate valid tokens
- Mitigation: Rotate secret regularly, invalidates old tokens

---

## Environment Variables Summary

### **Home Site (.env.local)**
```bash
# Required for ChatUI
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-secure-random-string-min-32-characters  # ⚠️ MUST MATCH INTAKE APP
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional
NEXT_PUBLIC_BASE_URL=https://teachmeai.in
NEXT_PUBLIC_INTAKE_APP_URL=https://intake.teachmeai.in
NEXT_PUBLIC_QUIZ_WEBHOOK_URL=your-google-sheets-webhook
```

### **Intake App (.env.local)**
```bash
# Required for token verification
JWT_SECRET=your-secure-random-string-min-32-characters  # ⚠️ MUST MATCH HOME SITE

# Existing intake app variables
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_SHEETS_CREDENTIALS=...
RESEND_API_KEY=re_xxxxxxxxxxxxx
# ... etc
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│  HOME SITE (teachmeai.in)               │
│                                          │
│  ChatUI collects:                        │
│  ├─ name: "Rajesh Singh"                 │
│  ├─ email: "rajesh@example.com"          │
│  ├─ role: "Marketing Manager"            │
│  ├─ goal: "Career Growth"                │
│  └─ challenge: "Not sure where to start" │
│                                          │
│  ↓ Generate JWT Token                    │
│                                          │
│  Token payload: {                        │
│    name, email, role, goal, challenge,  │
│    timestamp, iat, exp                   │
│  }                                        │
│                                          │
│  ↓ Sign with JWT_SECRET                  │
│                                          │
│  Token: eyJhbGc...                       │
│                                          │
│  ↓ Email Link                            │
│                                          │
└───────────────┬──────────────────────────┘
                │
                │ Email:
                │ https://intake.teachmeai.in?token=eyJhbGc...
                │
                ↓
┌─────────────────────────────────────────┐
│  INTAKE APP (intake.teachmeai.in)       │
│                                          │
│  ↓ Extract token from URL                │
│                                          │
│  token = searchParams.get('token')      │
│                                          │
│  ↓ Verify with JWT_SECRET                │
│                                          │
│  decoded = jwt.verify(token, SECRET)     │
│                                          │
│  ↓ Pre-fill form                          │
│                                          │
│  Name: "Rajesh Singh" [readonly]         │
│  Email: "rajesh@example.com" [readonly]  │
│  Role: "Marketing Manager" [editable]    │
│  Goal: "Career Growth" [editable]        │
│  Challenge: "Not sure..." [editable]     │
│                                          │
│  + Additional fields (VARK, etc.)        │
│                                          │
│  ↓ User completes & submits              │
│                                          │
│  Combined data sent to orchestration:    │
│  {                                       │
│    chatQuizData: { name, email, ... },  │
│    intakeFormData: { vark, ... }        │
│  }                                       │
│                                          │
└─────────────────────────────────────────┘
```

---

## Questions for Implementation

### **For the Intake App Developer:**

1. **Should pre-filled fields be editable?**
   - Recommendation: Allow editing except for email (use as identifier)

2. **What if token is missing?**
   - Option A: Show regular form (no pre-fill)
   - Option B: Redirect to home site
   - Recommendation: Option A (more flexible)

3. **Should we implement one-time tokens?**
   - Current: Token can be reused within 7 days
   - Alternative: Mark token as "used" after first submission
   - Recommendation: Current design is simpler, implement one-time later if needed

4. **How to handle token in orchestration submission?**
   - Include original token in submission for audit trail?
   - Or just merge the decoded data?
   - Recommendation: Merge decoded data, no need to pass token further

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 25, 2026 | Initial specification |

---

## Contact

**Questions about this specification?**
- Check: `CHATUI_QUIZ_ARCHITECTURE.md` for overall architecture
- Check: `CHATUI_IMPLEMENTATION_CHECKLIST.md` for implementation guide
- Contact: Integration team

---

**END OF JWT TOKEN SPECIFICATION**
