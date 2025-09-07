import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeachMeAI - Build Real AI Capability in 30-90 Days",
  description: "Personalized roadmaps, hands-on practice, and measurable outcomes for students, educators, and professionals. Skip the hype, build real AI skills.",
  keywords: "AI training, AI education, AI mentorship, AI skills, professional development",
  authors: [{ name: "Irfan Khalid" }],
  openGraph: {
    title: "TeachMeAI - Build Real AI Capability in 30-90 Days",
    description: "Personalized roadmaps, hands-on practice, and measurable outcomes for students, educators, and professionals.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeachMeAI - Build Real AI Capability in 30-90 Days",
    description: "Personalized roadmaps, hands-on practice, and measurable outcomes for students, educators, and professionals.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}