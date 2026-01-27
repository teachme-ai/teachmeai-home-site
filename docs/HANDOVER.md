# Handover: AI ChatUI Integration (Home Site -> Intake App)

**Date:** January 25, 2026  
**Status:** Home Site Implementation Complete (Phases 1-3)  

## Completed in Home Site
- [x] **Premium ChatUI Component**: Located at `/components/chat-quiz.tsx`.
- [x] **AI Chat API**: Located at `/app/api/chat-quiz/route.ts`. Handles data extraction via Genkit/Gemini.
- [x] **Email & Token Service**: Located at `/app/api/send-intake-link/route.ts`. 
  - Generates JWT tokens.
  - Sends personalized emails via Resend.
  - Uses templates from `@/lib/email-templates`.

## Next Steps for the Intake App Agent (Phase 4)

### 1. Environment Variables
Ensure the following is added to `teachmeai-intake-app/.env.local`:
```bash
JWT_SECRET=8fc3db9eca4d2c7cad8e2066985548c2ea8537a9b816f07f02bea261c0f8cd4e (Must match Home Site)
```

### 2. Token Decoding
- Install `jsonwebtoken` in the intake app.
- Update `src/app/page.tsx` to check for the `token` query parameter.
- Decode and verify the token (see `JWT_SPECIFICATION.md` for payload structure).

### 3. Pre-fill Logic
- Use the decoded data (`name`, `email`, `role`, `goal`, `challenge`) to pre-populate the intake form.
- Create a "Welcome back, [Name]!" experience to acknowledge the previous chat.

### 4. Integration
- Ensure the final submission from the intake app incorporates the pre-filled data.

## Documentation
- **Technical Specs**: See `CHATUI_QUIZ_ARCHITECTURE.md` on the home site.
- **JWT Payload**: See `JWT_SPECIFICATION.md` on the home site.

The Home Site is now fully configured to send qualified leads to the Intake App. Good luck! 🚀
