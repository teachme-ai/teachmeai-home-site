import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
    title: "ADAPT Framework — 5-Step AI Capability Building Model | teachmeai",
    description: "The ADAPT framework is teachmeai's 5-step methodology for building individual AI capabilities: Assess, Design, Apply, Practice, Transform. From AI-curious to AI-confident.",
    openGraph: {
        title: "The ADAPT Framework | teachmeai",
        description: "5-step methodology for building individual AI capabilities and lasting competence.",
        url: "https://teachmeai.in/frameworks/adapt",
    },
}

const steps = [
    {
        letter: "A",
        title: "Assess",
        subtitle: "Current State Analysis",
        description: "Evaluate your AI readiness, skill gaps, and learning preferences using our diagnostic framework.",
        outcomes: ["Personal AI readiness score", "Skill gap identification", "Learning style assessment"],
        detail: "Using validated instruments, we assess your current skill stage (Dreyfus model), learning preferences (Kolb/Honey & Mumford), and psychological capital (hope, resilience, efficacy, optimism).",
    },
    {
        letter: "D",
        title: "Design",
        subtitle: "Personalized Roadmap",
        description: "Create a tailored learning path based on your goals, timeline, and preferred learning approach.",
        outcomes: ["Custom 30/60/90-day roadmap", "Tool recommendations", "Milestone planning"],
        detail: "Your roadmap is personalized by learner type (Theorist gets frameworks first, Pragmatist gets problem-first projects). We incorporate 70:20:10 learning model principles.",
    },
    {
        letter: "A",
        title: "Apply",
        subtitle: "Hands-on Practice",
        description: "Implement AI tools in real work scenarios with guided practice and immediate feedback loops.",
        outcomes: ["Live tool practice", "Work integration", "Confidence building"],
        detail: "Practice with ChatGPT, Gemini, NotebookLM, and domain-specific tools. Each exercise uses your real work scenarios, not hypothetical examples.",
    },
    {
        letter: "P",
        title: "Practice",
        subtitle: "Skill Reinforcement",
        description: "Develop fluency through repeated application, peer learning, and progressive challenges.",
        outcomes: ["Habit formation", "Skill mastery", "Portfolio development"],
        detail: "Build micro-artifacts (prompt packs, SOPs, demos) that demonstrate your AI capability. These become your portfolio of proof.",
    },
    {
        letter: "T",
        title: "Transform",
        subtitle: "Measurable Impact",
        description: "Achieve demonstrable results in work performance, career advancement, or teaching effectiveness.",
        outcomes: ["ROI measurement", "Career advancement", "Leadership capability"],
        detail: "We measure KPIs across four areas: learning (skills gained), work (productivity), artifacts (deliverables), and confidence (self-assessment). The goal is self-sustaining independence.",
    },
]

export default function AdaptFrameworkPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "The ADAPT Framework for AI Capability Building",
        description: "A 5-step methodology for building individual AI capabilities and lasting competence.",
        step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: `${s.letter} — ${s.title}`,
            text: s.description,
        })),
    }

    return (
        <main>
            <Navbar />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <a href="/frameworks/impact" className="text-sm text-blue-600 hover:underline mb-4 inline-block">Also see: IMPACT Framework →</a>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
                            The <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">ADAPT</span> Framework
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                            Our 5-step methodology for building individual AI capabilities. Each phase creates lasting competence rather than surface-level familiarity, ensuring sustainable AI fluency.
                        </p>
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200 inline-block">
                            <p className="text-lg font-medium text-gray-700">
                                <span className="text-blue-600 font-bold">ADAPT</span> = capability building
                            </p>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-8 mb-16">
                        {steps.map((step, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-blue-200/50 p-8 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                                        {step.letter}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <h2 className="text-2xl font-bold text-brand-dark">{step.title}</h2>
                                            <span className="text-sm text-blue-600 font-medium">{step.subtitle}</span>
                                        </div>
                                        <p className="text-slate-700 mb-4 leading-relaxed">{step.description}</p>
                                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{step.detail}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {step.outcomes.map((outcome, oidx) => (
                                                <span key={oidx} className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium">
                                                    {outcome}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* IMPACT vs ADAPT */}
                    <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 mb-12">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">IMPACT vs ADAPT — How They Work Together</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="border-2 border-emerald-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-emerald-600 mb-3">IMPACT</h3>
                                <p className="text-sm text-slate-600 mb-3">The <strong>coaching methodology</strong> — how we guide your journey from assessment to transition.</p>
                                <p className="text-xs text-slate-500">6 steps: Initiate → Map → Prioritize → Act → Consolidate → Transition</p>
                                <a href="/frameworks/impact" className="text-emerald-600 text-sm font-semibold hover:underline mt-3 inline-block">Learn more →</a>
                            </div>
                            <div className="border-2 border-blue-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-blue-600 mb-3">ADAPT</h3>
                                <p className="text-sm text-slate-600 mb-3">The <strong>capability model</strong> — how you build lasting AI skills through systematic practice.</p>
                                <p className="text-xs text-slate-500">5 steps: Assess → Design → Apply → Practice → Transform</p>
                                <span className="text-blue-600 text-sm font-semibold mt-3 inline-block">You are here</span>
                            </div>
                        </div>
                    </div>

                    {/* Why ADAPT */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl shadow-lg p-8 mb-12 text-white">
                        <h2 className="text-2xl font-bold mb-4">Why ADAPT Works</h2>
                        <p className="text-lg leading-relaxed opacity-95">
                            ADAPT is grounded in the <strong>Dreyfus Model of Skill Acquisition</strong> (Novice → Expert) and <strong>Self-Determination Theory</strong>. Each phase systematically moves you from awareness to mastery, building both competence and intrinsic motivation. The result: sustainable AI fluency, not one-off exposure.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <a
                            href="/programs"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-150 mr-4"
                        >
                            View Programs
                        </a>
                        <a
                            href="/ai-diagnostic"
                            className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-150"
                        >
                            Start Free AI Diagnostic
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
