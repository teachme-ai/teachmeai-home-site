# JWT Token Specification for Intake Pre-fill

**Version:** 1.0  
**Created:** January 25, 2026  
**Status:** ACTIVE  

## Overview
This document specifies the structure and handling of the JWT token used to pass data from the `teachmeai-home-site` (ChatUI) to the `teachmeai-intake-app`.

## Token Details
- **Algorithm:** HS256
- **Secret:** Use the `JWT_SECRET` environment variable (must be identical in both projects)
- **Expiration:** 7 days (`7d`)

## Payload Structure
The token contains a JSON object with the following fields:

```typescript
{
  "name": string,         // User's name collected in chat
  "email": string,        // Validated user email
  "role": string,         // User's profession/role
  "goal": string,         // Primary AI learning goal
  "challenge": string | null, // (Optional) User's primary challenge
  "timestamp": number,    // Date.now() when token was created
  "iat": number,          // Issued at (JWT standard)
  "exp": number           // Expiration time (JWT standard)
}
```

## URL Integration
The token is passed to the intake app via the `token` query parameter.

**Example URL:**
`https://intake.teachmeai.in?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Handling in Intake App (Receiver)

### 1. Extraction
Extract the `token` parameter from the URL.

### 2. Verification
Verify the token using the shared `JWT_SECRET`. 
- Check if expired (`exp`).
- Verify signature.

### 3. Pre-fill Logic
If valid, pre-populate the intake form fields:
- `fullName` -> `name`
- `email` -> `email`
- `profession` -> `role`
- `mainGoal` -> `goal`
- `biggestChallenge` -> `challenge`

### 4. User Experience
- Show a "Welcome back, [Name]!" message.
- Allow users to edit pre-filled fields if they want.
- Smoothly transition to the next step (VARK assessment).

## Security Considerations
- **Do not share the JWT_SECRET.**
- The token is signed, not encrypted. Do not put sensitive secrets (passwords) in the payload.
- Use HTTPS for all links containing tokens.
