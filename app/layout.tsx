import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeachMeAI - Build Real AI Capability in 30-90 Days",
  description: "1-to-1 Personalised AI Coaching. Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners. Skip the hype, build real AI skills.",
  keywords: "AI training, AI education, AI mentorship, AI coaching, AI skills, professional development, AI tools, machine learning, artificial intelligence",
  authors: [{ name: "Khalid Irfan" }],
  creator: "Khalid Irfan",
  publisher: "TeachMeAI",
  metadataBase: new URL('https://teachmeai.in'),
  alternates: {
    canonical: 'https://teachmeai.in',
  },
  openGraph: {
    title: "TeachMeAI - Build Real AI Capability in 30-90 Days",
    description: "1-to-1 Personalised AI Coaching. Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners.",
    url: 'https://teachmeai.in',
    siteName: 'TeachMeAI',
    type: "website",
    locale: "en_US",
    images: [{
      url: '/images/logo.png',
      width: 1200,
      height: 630,
      alt: 'TeachMeAI - AI Coaching and Training',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeachMeAI - Build Real AI Capability in 30-90 Days",
    description: "1-to-1 Personalised AI Coaching. Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners.",
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "TeachMeAI",
              "url": "https://teachmeai.in",
              "logo": "https://teachmeai.in/images/logo.png",
              "description": "1-to-1 Personalised AI Coaching. Build real AI capability in 30-90 days with personalized roadmaps and hands-on practice.",
              "founder": {
                "@type": "Person",
                "name": "Khalid Irfan"
              },
              "serviceType": "AI Training and Coaching",
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Coaching Programs",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Clarity Call",
                      "description": "70-minute AI readiness assessment and personalized roadmap"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Growth Program",
                      "description": "Comprehensive AI skill development program"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}