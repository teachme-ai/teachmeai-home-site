import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
    title: "About Khalid Irfan — AI Coach & Mentor | teachmeai",
    description: "Meet Khalid Irfan, founder of teachmeai. 19+ years in enterprise IT, 7+ years in academia. IBM Certified, Google Certified Teacher, Agile Coach. Personalized AI coaching for professionals, educators, and students.",
    openGraph: {
        title: "About Khalid Irfan — AI Coach & Mentor",
        description: "19+ years in IT, 7+ years in academia. Personalized AI coaching using the IMPACT & ADAPT frameworks.",
        url: "https://teachmeai.in/about",
    },
}

const certifications = [
    "IBM Certified Design Thinking Practitioner",
    "Agile Certified Coach",
    "Google Certified Teacher",
    "IBM Recognised Educator",
]

const companies = [
    { name: "RBI", color: "bg-blue-800" },
    { name: "NPCI", color: "bg-orange-500" },
    { name: "TCS", color: "bg-slate-800" },
    { name: "Vodafone", color: "bg-red-600" },
    { name: "Volkswagen", color: "bg-blue-600" },
    { name: "Flipkart", color: "bg-yellow-500" },
    { name: "Target", color: "bg-red-500" },
    { name: "Telstra", color: "bg-orange-600" },
    { name: "Lowes", color: "bg-blue-700" },
    { name: "O2", color: "bg-indigo-600" },
]

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <section className="py-20 bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-brand-light border-4 border-brand-primary/30 overflow-hidden mb-6">
                            <Image src="/images/irfanpic.jpeg" alt="Khalid Irfan - AI Coach and Mentor" width={400} height={400} className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
                            Meet Your Facilitator — Khalid Irfan
                        </h1>
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            {certifications.map((cert) => (
                                <span key={cert} className="px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-sky-100 text-brand-primary text-xs font-semibold rounded-full border border-brand-primary/30">
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8 mb-10">
                            <h2 className="text-2xl font-bold text-brand-dark mb-4">My Story</h2>
                            <p className="text-base text-slate-700 mb-4 leading-relaxed">
                                I'm Khalid Irfan, founder of teachmeai.in and Ai4Education.in. With 19+ years in IT and 7+ years in academia, I help professionals, educators, and entrepreneurs adopt AI with clarity, confidence, and measurable impact.
                            </p>
                            <p className="text-base text-slate-700 mb-4 leading-relaxed">
                                Struggling to make sense of AI? You're not alone. Many feel overwhelmed by the hype yet uncertain about how to use AI meaningfully in their work. I help you cut through the AI noise — and grow your career with confidence.
                            </p>
                            <p className="text-base text-slate-700 leading-relaxed">
                                Leveraging over 25 years of experience in both enterprise IT for global leaders and academic innovation, I personally guide you through a structured journey. We start by deeply understanding your career aspirations and domain expertise, then dive into hands-on, guided sessions with AI tools.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-gradient-to-r from-brand-primary to-sky-500 rounded-2xl shadow-lg p-8 mb-10 text-white">
                            <h2 className="text-2xl font-bold mb-4">My Mission</h2>
                            <p className="text-lg leading-relaxed opacity-95">
                                To help every professional transition from AI curiosity to career-defining confidence — not through generic courses, but through personalized, science-backed coaching using the IMPACT and ADAPT frameworks.
                            </p>
                        </div>

                        {/* What Sets Me Apart */}
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8 mb-10">
                            <h2 className="text-2xl font-bold text-brand-dark mb-6">What Sets Me Apart</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex gap-3">
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <h3 className="font-semibold text-brand-dark mb-1">Personalized, Not Generic</h3>
                                        <p className="text-sm text-slate-600">Every coaching engagement starts with understanding your unique context, goals, and challenges.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-2xl">🧠</span>
                                    <div>
                                        <h3 className="font-semibold text-brand-dark mb-1">Science-Backed Methods</h3>
                                        <p className="text-sm text-slate-600">Rooted in Self-Regulated Learning, Adult Learning Theory, and Psychological Capital research.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-2xl">🏢</span>
                                    <div>
                                        <h3 className="font-semibold text-brand-dark mb-1">Enterprise Experience</h3>
                                        <p className="text-sm text-slate-600">Real-world AI implementation across RBI, NPCI, TCS, Flipkart, Vodafone, and more.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-2xl">📊</span>
                                    <div>
                                        <h3 className="font-semibold text-brand-dark mb-1">Measurable Outcomes</h3>
                                        <p className="text-sm text-slate-600">Track progress through KPIs, confidence indices, and concrete work outputs — not vague promises.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Strip */}
                        <div className="text-center">
                            <p className="text-sm text-slate-600 font-medium mb-4">Experience across leading organizations:</p>
                            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-8">
                                {companies.map((company) => (
                                    <span key={company.name} className={`${company.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                                        {company.name}
                                    </span>
                                ))}
                                <span className="text-xs text-slate-500 font-medium">+8 more</span>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://www.linkedin.com/in/irfankhalid/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-150 font-semibold shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    Connect on LinkedIn
                                </a>
                                <a
                                    href="/ai-diagnostic"
                                    className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-6 py-3 rounded-lg transition-all duration-150 font-semibold"
                                >
                                    Start Free AI Diagnostic →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Cross-links */}
                    <div className="max-w-3xl mx-auto mt-12">
                        <h2 className="text-xl font-bold text-brand-dark mb-4 text-center">Explore More</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Link href="/programs" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-brand-dark mb-1">View Programs →</h3>
                                <p className="text-sm text-slate-600">Compare Clarity Call, Starter, and Growth packages</p>
                            </Link>
                            <Link href="/frameworks/impact" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-brand-dark mb-1">IMPACT Framework →</h3>
                                <p className="text-sm text-slate-600">The methodology behind every coaching engagement</p>
                            </Link>
                            <Link href="/blog" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-brand-dark mb-1">Read the Blog →</h3>
                                <p className="text-sm text-slate-600">Guides on AI coaching, career growth, and learning AI the right way</p>
                            </Link>
                            <Link href="/ai-diagnostic" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-brand-dark mb-1">Free AI Diagnostic →</h3>
                                <p className="text-sm text-slate-600">2-minute assessment to discover your AI learning path</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
