import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"
import { notFound } from "next/navigation"

const programs: Record<string, {
    title: string
    subtitle: string
    description: string
    price: string
    duration: string
    format: string
    topmate: string
    includes: string[]
    outcomes: string[]
    idealFor: string[]
    faq: { q: string; a: string }[]
}> = {
    "clarity-call": {
        title: "70-Minute Clarity Call",
        subtitle: "Rapid diagnosis, quick-win tactics, and a one-page action sheet.",
        description: "Are you a professional seeking to transition from AI curiosity to career-defining confidence? This is not a one-size-fits-all course — it's a personalized session designed to build your unique AI adoption pathway. We start by deeply understanding your career aspirations and domain expertise, then identify immediate opportunities to optimize your current role.",
        price: "₹2,100",
        duration: "70 minutes",
        format: "1-on-1 video call",
        topmate: "https://topmate.io/khalidirfan/1622786",
        includes: [
            "Personalized AI readiness assessment",
            "Quick-win tactics for immediate impact",
            "One-page action sheet with next steps",
            "Tool recommendations based on your goals",
            "Role-specific AI use case identification",
        ],
        outcomes: [
            "Clear understanding of where AI fits in your role",
            "2-3 specific tools you can start using today",
            "A personalized one-page action plan",
            "Confidence to take your first AI steps",
        ],
        idealFor: [
            "Professionals curious about AI but unsure where to start",
            "Career changers wanting to add AI skills",
            "Managers evaluating AI for their teams",
            "Educators exploring AI in teaching",
        ],
        faq: [
            { q: "What happens during the 70 minutes?", a: "We follow the ASSESS phase of the IMPACT framework: evaluate your AI readiness, identify immediate opportunities in your workflow, and create a one-page action plan with specific tool recommendations and quick-win tactics you can implement immediately." },
            { q: "Do I need any AI experience?", a: "None at all. The session is designed for all levels, from complete beginners to those who've experimented but need structure." },
            { q: "What's the refund policy?", a: "Full refund if cancelled 24 hours before the session. If you're not satisfied, we'll adjust the approach or provide a full refund." },
        ],
    },
    "starter-30-day": {
        title: "Starter Program (30 Days)",
        subtitle: "Compact evaluation, weekly milestones, and a curated tool list.",
        description: "A structured 30-day program to take you from AI-curious to AI-capable. With weekly milestones, curated tools, and regular check-ins, you'll build real skills and confidence in just one month.",
        price: "₹3,600",
        duration: "30 days",
        format: "Weekly check-ins + async support",
        topmate: "https://topmate.io/khalidirfan/1622786",
        includes: [
            "Weekly milestone tracking",
            "Curated tool and prompt library",
            "Progress check-ins",
            "Email support for questions",
            "30-day roadmap with clear objectives",
            "Personalized learning pathway",
        ],
        outcomes: [
            "Confident daily use of 3-5 AI tools",
            "A working AI workflow integrated into your job",
            "Measurable productivity improvement",
            "Clear roadmap for continued growth",
        ],
        idealFor: [
            "Professionals ready to commit to structured learning",
            "Those who completed a Clarity Call and want more",
            "Self-motivated learners who want accountability",
            "Small team leads wanting to pilot AI adoption",
        ],
        faq: [
            { q: "How much time do I need per week?", a: "Plan for 3-5 hours per week: a mix of guided practice, tool exploration, and reflection. The program adapts to your schedule." },
            { q: "What tools will I learn?", a: "Tools are selected based on your role and goals during the initial assessment. Common ones include ChatGPT, Gemini, NotebookLM, and domain-specific tools." },
            { q: "Can I upgrade to the 90-day program?", a: "Absolutely. Your progress and assessment carry over seamlessly into the Growth program." },
        ],
    },
    "growth-90-day": {
        title: "Growth Package (90 Days)",
        subtitle: "Deeper mentorship, hands-on practice, KPIs, and an ROI review.",
        description: "A comprehensive 90-day mentorship program for those who want hands-on practice and accountability. Includes a discovery session, 3 weekly mentorship sessions with guided practice, and an AI Pathway Template with curated tools and use-cases relevant to your work.",
        price: "₹7,100",
        duration: "90 days",
        format: "1 Discovery + 3 Weekly Mentorship Sessions",
        topmate: "https://topmate.io/khalidirfan/1697252",
        includes: [
            "4 one-on-one mentorship sessions",
            "Hands-on practice with real projects",
            "KPI tracking and measurement",
            "ROI review and optimization",
            "Custom AI implementation strategy",
            "Ongoing support throughout 90 days",
            "AI Pathway Template with curated tools",
        ],
        outcomes: [
            "Build real confidence applying AI in work/life",
            "Measurable ROI on AI adoption",
            "Career advancement with demonstrable AI skills",
            "Self-sustaining AI learning habits",
        ],
        idealFor: [
            "Those who want hands-on practice & accountability",
            "Professionals seeking a career transformation",
            "Leaders implementing AI across their teams",
            "Entrepreneurs building AI into their business",
        ],
        faq: [
            { q: "What's the format of the 4 sessions?", a: "1 Discovery Session to set your baseline, followed by 3 Weekly Mentorship Sessions with hands-on tools, guided practice, and Q&A. Between sessions, you work on real projects with async support." },
            { q: "How do you measure ROI?", a: "We track KPIs across four areas: learning (skills gained), work (productivity improvement), artifacts (deliverables produced), and confidence (self-assessment scale). We review ROI formally at the end." },
            { q: "What happens after 90 days?", a: "You'll have a self-sustaining learning practice. Many clients continue with advanced pathways or periodic check-ins, but the goal is independence." },
        ],
    },
}

export async function generateStaticParams() {
    return Object.keys(programs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const program = programs[slug]
    if (!program) return {}

    return {
        title: `${program.title} — AI Coaching | teachmeai`,
        description: `${program.subtitle} ${program.price !== "Custom" ? `Starting at ${program.price}.` : ""} Personalized AI coaching with Khalid Irfan.`,
        openGraph: {
            title: `${program.title} | teachmeai`,
            description: program.subtitle,
            url: `https://teachmeai.in/programs/${slug}`,
        },
    }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const program = programs[slug]
    if (!program) notFound()

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: program.title,
        description: program.subtitle,
        provider: {
            "@type": "Person",
            name: "Khalid Irfan",
            url: "https://teachmeai.in/about",
        },
        offers: {
            "@type": "Offer",
            price: slug === "clarity-call" ? "2100" : slug === "starter-30-day" ? "3600" : "7100",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
        },
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: program.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    }

    return (
        <main>
            <Navbar />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <section className="py-20 bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <a href="/programs" className="text-sm text-brand-primary hover:underline mb-4 inline-block">← All Programs</a>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">{program.title}</h1>
                        <p className="text-lg text-slate-600 mb-6">{program.subtitle}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-semibold">{program.price}</span>
                            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full">{program.duration}</span>
                            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full">{program.format}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">About This Program</h2>
                        <p className="text-slate-700 leading-relaxed">{program.description}</p>
                    </div>

                    {/* Two columns: includes + outcomes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8">
                            <h2 className="text-xl font-bold text-brand-dark mb-4">What's Included</h2>
                            <ul className="space-y-3">
                                {program.includes.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-slate-700">
                                        <span className="text-brand-primary mr-2 mt-0.5 font-bold">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8">
                            <h2 className="text-xl font-bold text-brand-dark mb-4">Expected Outcomes</h2>
                            <ul className="space-y-3">
                                {program.outcomes.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-slate-700">
                                        <span className="text-emerald-500 mr-2 mt-0.5 font-bold">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Ideal For */}
                    <div className="bg-gradient-to-r from-brand-primary to-sky-500 rounded-2xl shadow-lg p-8 mb-8 text-white">
                        <h2 className="text-xl font-bold mb-4">Ideal For</h2>
                        <ul className="space-y-2">
                            {program.idealFor.map((item, idx) => (
                                <li key={idx} className="flex items-start text-sm opacity-95">
                                    <span className="mr-2 mt-0.5">👤</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Program FAQ */}
                    <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6">Frequently Asked Questions</h2>
                        {program.faq.map((item, idx) => (
                            <div key={idx} className="mb-6 last:mb-0">
                                <h3 className="font-semibold text-brand-dark mb-2">{item.q}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-white rounded-2xl shadow-lg border-2 border-brand-primary/30 p-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">Ready to get started?</h2>
                        <p className="text-slate-600 mb-6">Book your {program.title} and begin your AI journey today.</p>
                        <a
                            href={program.topmate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-150"
                        >
                            Book Now — {program.price}
                        </a>
                        <p className="text-xs text-slate-400 mt-4">Payments handled securely via Topmate</p>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
