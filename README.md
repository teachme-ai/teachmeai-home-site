# TeachMeAI Homepage

A conversion-focused homepage built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- Hero section with clear value proposition
- Programs showcase with expandable details
- AI Readiness Quiz with form validation
- IMPACT & ADAPT Framework sections
- FAQ section with accordion
- Responsive design (mobile-first)
- SEO optimized

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics or Plausible tracking ID
- `NEXT_PUBLIC_QUIZ_WEBHOOK_URL`: Google Apps Script webhook URL for quiz submissions
- `GEMINI_API_KEY`: Google Gemini API key for ChatUI
- `JWT_SECRET`: Shared secret with intake app (must be identical in both)
- `RESEND_API_KEY`: Transactional email via Resend
- `NEXT_PUBLIC_BASE_URL`: Public URL of this app (e.g. `https://teachmeai.in`)
- `NEXT_PUBLIC_INTAKE_APP_URL`: URL of the intake app (e.g. `https://intake.teachmeai.in`)

### Booking Mode Toggle

Controls whether "Book Now" links go to Topmate or the custom booking app:

- `NEXT_PUBLIC_BOOKING_MODE`: `topmate` (default) or `custom`
- `NEXT_PUBLIC_BOOKING_APP_URL`: URL of the booking app (e.g. `https://book.teachmeai.in`)

Set `NEXT_PUBLIC_BOOKING_MODE=custom` in Vercel env vars to switch all program page booking links to the custom booking app at `book.teachmeai.in`.

## Deployment

Vercel GitHub integration is enabled — any push to `main` triggers an automatic build and deploy.

```bash
git push origin main
```

## Performance

- Lighthouse score target: ≥90 (mobile/desktop)
- First Contentful Paint: ≤2.0s on 4G
- Images optimized and lazy loaded

## Analytics Events

The following events are tracked:
- `cta_book_clicked`: Book call button clicks
- `quiz_started`: Quiz form started
- `quiz_submitted`: Quiz form completed
- `expander_programs_opened`: Program details expanded
