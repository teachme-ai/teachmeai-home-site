import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import "./globals.css"
import { validateEnv } from "../lib/env-check"

validateEnv() // Fail fast if secrets are missing

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: "teachmeai - Build Real AI Capability in 30-90 Days",
  description: "1-to-1 Personalised AI Coaching. Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners. Skip the hype, build real AI skills.",
  keywords: "AI training, AI education, AI mentorship, AI coaching, AI skills, professional development, AI tools, machine learning, artificial intelligence",
  authors: [{ name: "Khalid Irfan" }],
  creator: "Khalid Irfan",
  publisher: "teachmeai",
  metadataBase: new URL('https://teachmeai.in'),
  alternates: {
    canonical: 'https://teachmeai.in',
    languages: {
      'en': 'https://teachmeai.in',
    },
  },
  other: {
    'geo.region': 'IN',
    'geo.country': 'India',
    'geo.placename': 'India',
    'ICBM': '20.5937, 78.9629',
  },
  openGraph: {
    title: "teachmeai - Build Real AI Capability in 30-90 Days",
    description: "1-to-1 Personalised AI Coaching. Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners.",
    url: 'https://teachmeai.in',
    siteName: 'teachmeai',
    type: "website",
    locale: "en_US",
    images: [{
      url: '/images/logo-brand.png',
      width: 1200,
      height: 630,
      alt: 'teachmeai - AI Coaching and Training',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "teachmeai - Build Real AI Capability in 30-90 Days",
    description: "1-to-1 Personalised AI Coaching. Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners.",
    images: ['/images/logo-brand.png'],
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
        <link rel="alternate" hrefLang="en" href="https://teachmeai.in" />
        <link rel="alternate" hrefLang="x-default" href="https://teachmeai.in" />
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://topmate.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://topmate.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-1GFLW2WR22" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["EducationalOrganization", "LocalBusiness"],
              "name": "teachmeai",
              "url": "https://teachmeai.in",
              "logo": "https://teachmeai.in/images/logo-brand.png",
              "description": "1-to-1 Personalised AI Coaching. Build real AI capability in 30-90 days with personalized roadmaps and hands-on practice.",
              "founder": {
                "@type": "Person",
                "name": "Khalid Irfan"
              },
              "serviceType": "AI Training and Coaching",
              "areaServed": ["Worldwide", "India", "United States", "United Kingdom", "Canada", "Australia"],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "India"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "20.5937",
                "longitude": "78.9629"
              },
              "telephone": "+91-XXXXXXXXXX",
              "priceRange": "$$",
              "currenciesAccepted": ["USD", "INR", "EUR", "GBP"],
              "paymentAccepted": ["Credit Card", "PayPal", "Bank Transfer"],
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
      </body>
    </html>
  )
}
