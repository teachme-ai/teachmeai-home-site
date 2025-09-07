# TeachMeAI Homepage

A conversion-focused homepage built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- Hero section with clear value proposition
- Programs showcase with expandable details
- AI Readiness Quiz with form validation
- Newsletter signup
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
- `NEWSLETTER_API_KEY`: Newsletter service API key (Mailerlite/Buttondown)
- `QUIZ_WEBHOOK_URL`: Google Apps Script webhook URL for quiz submissions

## Content Management

Update content by editing JSON files in the `/content` directory:

- `/content/programs.json`: Program details and pricing
- `/content/faq.json`: FAQ questions and answers

## Deployment

Deploy to Vercel:

```bash
npm run build
```

The site is optimized for Vercel deployment with automatic builds on push.

## Performance

- Lighthouse score target: ≥90 (mobile/desktop)
- First Contentful Paint: ≤2.0s on 4G
- Images optimized and lazy loaded

## Analytics Events

The following events are tracked:
- `cta_book_clicked`: Book call button clicks
- `quiz_started`: Quiz form started
- `quiz_submitted`: Quiz form completed
- `newsletter_submitted`: Newsletter signup
- `expander_programs_opened`: Program details expanded