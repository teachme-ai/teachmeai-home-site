# Antigravity Agent Implementation Plan

This document contains modular, specific prompts designed for the Antigravity Agent to implement the TeachMeAI architecture.

## Phase 1: Security & Configuration Hardening
**Goal:** Prevent the application from starting if critical secrets are missing.
**Files:** `lib/env-check.ts`, `instrumentation.ts`

### 📋 Prompt for Agent
```text
I need to ensure my application fails fast if the JWT_SECRET is missing or insecure.

1. Create or update a file `lib/env-check.ts`.
2. Add a function `validateEnv()` that checks:
   - If `process.env.JWT_SECRET` exists.
   - If `process.env.JWT_SECRET` is at least 32 characters long.
3. If the check fails, throw a hard Error: "CRITICAL: JWT_SECRET is missing or insecure."
4. Call this function in the app's entry point (e.g., `instrumentation.ts` register function or the root layout) so the app refuses to start without it.
```

---

## Phase 2: ChatUI Input Constraints
**Goal:** Prevent URL overflow by limiting the "Challenge" input field.
**Files:** `components/chat-quiz.tsx`

### 📋 Prompt for Agent
```text
I need to enforce input limits on the ChatUI to ensure the generated JWT token fits in a URL.

1. Locate the input field where the user describes their "Challenge" or "Goal".
2. Add a `maxLength` attribute of 500 characters to the input/textarea.
3. Add a visual counter (e.g., "450/500 characters") so the user knows the limit.
4. Ensure the state update function truncates any pasted text to 500 characters before setting state.
```

---

## Phase 3: The "Hybrid Redirect" Flow
**Goal:** Reduce friction by redirecting users immediately while emailing a backup link.
**Files:** `app/api/chat-quiz/route.ts`, `components/chat-quiz.tsx`

### 📋 Prompt for Agent
```text
I want to implement a "Hybrid Redirect" flow for the chat completion.

1. Update the backend API that generates the JWT (`app/api/chat-quiz/route.ts`):
   - It should still send the email via Resend (keep existing logic).
   - BUT, it must also return the signed `token` in the JSON response to the frontend.
   
2. Update the Frontend Chat Component:
   - When the API response returns success, capture the `token`.
   - Immediately redirect the user to `https://intake.teachmeai.in?token={token}` using `router.push`.
   - Show a toast or message: "Redirecting you to your report... (We also emailed you a link!)"
```

---

## Phase 4: Intake App Token Receiver
**Goal:** Decode the JWT in the Intake App to pre-fill the form.
**Files:** `app/page.tsx` (Intake App), `lib/jwt.ts`

### 📋 Prompt for Agent
```text
I need to handle the incoming JWT token on the Intake App.

1. Install `jsonwebtoken` if not present.
2. Create `lib/jwt.ts` with a function `verifyIntakeToken(token: string)` that uses `process.env.JWT_SECRET` to verify and return the payload.
3. In the main Intake Form component (client-side):
   - Use `useSearchParams` to get the `token` query param.
   - If a token exists, call a Server Action (or API route) to verify it (do not verify client-side to keep secret safe).
   - If valid, pre-fill the form state (Name, Email, Role, Goal) and mark Name/Email as `readOnly`.
   - If invalid/expired, show an error message: "This link has expired. Please start again at teachmeai.in".
```

---

## Phase 5: Fail-Safe Data Logging
**Goal:** Ensure data is saved to Google Sheets *before* risky AI operations.
**Files:** Agent Service Backend

### 📋 Prompt for Agent
```text
I need to make the data submission robust.

1. Locate the function that handles the final intake submission.
2. Before triggering the AI PDF generation or sending the email:
   - Await a call to `appendRowToGoogleSheet` with the raw intake data.
   - Only proceed to PDF generation if the Sheet update succeeds (or log the error and proceed anyway, but ensure the data is captured somewhere).
3. This ensures that if the AI hangs or crashes, we still have the lead's contact info in the Sheet.
```

---

## Phase 6: Psychometric Profiler Agent
**Goal:** Analyze implicit user data to derive the 5 psychographic dimensions.
**Files:** Agent Service / Genkit Flow
**Reference:** `app/psych-profile.ts` (Schema)

### 📋 Prompt for Agent
```text
I need to implement the 'Psychometric Profiler' agent using Genkit.

1. Import the `PsychographicProfileSchema` from the shared types.
2. Create a new Genkit flow named `profilingAgent`.
3. The flow should accept the raw text from the user's "Goal" and "Challenge" inputs.
4. Use a Gemini prompt to analyze the text and extract these 5 dimensions:
   - Decision Style (Intuitive vs Analytical)
   - Uncertainty Handling (Paralyzed vs Experimenter)
   - Change Preference (1-10 Scale)
   - Social Entanglement (Solitary vs Social)
   - Cognitive Load Tolerance (Low/Med/High)
5. Return the structured JSON matching the Zod schema.
```