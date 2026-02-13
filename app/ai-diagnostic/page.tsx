import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeadForm } from "@/components/lead-form"

export const metadata: Metadata = {
    title: "Free AI Skills Diagnostic — Discover Your AI Learning DNA | TeachMeAI",
    description: "Take the free 2-minute AI Skills Diagnostic. Chat with our AI to map your goals and get a personalized report revealing your learning style, cognitive strengths, and a custom roadmap.",
    openGraph: {
        title: "Free AI Skills Diagnostic | TeachMeAI",
        description: "Chat with our AI in 2 minutes to discover your AI learning style, cognitive strengths, and get a custom roadmap.",
        url: "https://teachmeai.in/ai-diagnostic",
    },
}

export default function AIDiagnosticPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "TeachMeAI AI Skills Diagnostic",
        description: "Free 2-minute AI-powered diagnostic chat that generates a personalized learning report.",
        url: "https://teachmeai.in/ai-diagnostic",
        applicationCategory: "EducationalApplication",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
        },
    }

    return (
        <main>
            <Navbar />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <section className="py-20 bg-gradient-to-br from-brand-primary/10 via-white to-sky-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
                            Discover Your AI Learning DNA
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                            Chat with our AI to map your goals in 2 minutes. We'll generate a
                            <strong> Free Personalized Report</strong> revealing your learning style,
                            cognitive strengths, and a custom roadmap.
                        </p>
                        <div className="text-sm text-slate-500 mb-8 flex justify-center gap-4 items-center font-medium">
                            <span className="bg-white px-3 py-1 rounded-full shadow-sm">✨ 2-min Chat</span>
                            <span className="text-slate-300">→</span>
                            <span className="bg-white px-3 py-1 rounded-full shadow-sm">📩 Email Link</span>
                            <span className="text-slate-300">→</span>
                            <span className="bg-white px-3 py-1 rounded-full shadow-sm">📊 Deep Analysis</span>
                        </div>
                    </div>

                    {/* Lead Form / Chat */}
                    <LeadForm />

                    {/* What You Get */}
                    <div className="mt-16 grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-6 text-center">
                            <div className="text-3xl mb-3">🧠</div>
                            <h3 className="font-bold text-brand-dark mb-2">Learning Style Profile</h3>
                            <p className="text-sm text-slate-600">Understand whether you're a Theorist, Pragmatist, Activist, or Reflector — and what it means for your AI journey.</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-6 text-center">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="font-bold text-brand-dark mb-2">Skill Gap Analysis</h3>
                            <p className="text-sm text-slate-600">See exactly where you stand on the Dreyfus scale (Novice → Expert) and which skills to prioritize.</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-6 text-center">
                            <div className="text-3xl mb-3">🗺️</div>
                            <h3 className="font-bold text-brand-dark mb-2">Custom Roadmap</h3>
                            <p className="text-sm text-slate-600">Get a personalized 30/60/90-day action plan with specific tools, milestones, and learning resources.</p>
                        </div>
                    </div>

                    {/* Trust */}
                    <div className="mt-12 text-center">
                        <p className="text-xs text-slate-400">Powered by Gemini AI • No credit card required • Your data stays private</p>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
