import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
    title: "IMPACT Framework — 6-Step AI Adoption Methodology | teachmeai",
    description: "The IMPACT framework is teachmeai's 6-step coaching methodology for systematic AI adoption: Initiate, Map, Prioritize, Act, Consolidate, Transition. Measurable results for professionals and organizations.",
    openGraph: {
        title: "The IMPACT Framework | teachmeai",
        description: "6-step coaching methodology for systematic AI adoption and measurable results.",
        url: "https://teachmeai.in/frameworks/impact",
    },
}

const steps = [
    {
        letter: "I",
        title: "Initiate",
        subtitle: "Assessment Phase",
        description: "Profile analysis, learner type identification, and skill stage evaluation. We understand where you are today.",
        outcomes: ["Personal AI readiness profile", "Learning style assessment", "Skill gap analysis"],
        detail: "Using intake diagnostics (Profile, Aspirations, Pains, Gains), we build a Client Profile & Focus Areas. This includes your Dreyfus stage, SRL index, and motivation mapping.",
    },
    {
        letter: "M",
        title: "Map",
        subtitle: "Opportunity Discovery",
        description: "Identify 2-3 AI use cases directly relevant to your role and industry.",
        outcomes: ["Role-specific AI use cases", "Industry relevance mapping", "Priority opportunity list"],
        detail: "Agent analyzes responses + role/industry to shortlist 2-3 AI use cases/workflows directly relevant to the client.",
    },
    {
        letter: "P",
        title: "Prioritize",
        subtitle: "Action Planning",
        description: "Focus on 1-2 realistic first steps with specific tools and timeline.",
        outcomes: ["Realistic first steps", "Tool recommendations", "Timeline planning"],
        detail: "We weigh motivation, time friction, and skill stage to select 1-2 realistic first steps with specific tools and a timeline. Quick wins vs long-term goals.",
    },
    {
        letter: "A",
        title: "Act",
        subtitle: "Implementation",
        description: "Hands-on practice with feedback loops and weekly progress check-ins.",
        outcomes: ["Live practice sessions", "Weekly check-ins", "Feedback loops"],
        detail: "First tasks and hands-on trials aligned to learner type (e.g., Pragmatist = problem-first mini project). Weekly check-ins or async reflection prompts create accountability.",
    },
    {
        letter: "C",
        title: "Consolidate",
        subtitle: "Learning Integration",
        description: "Reflection, synthesis, and confidence building through structured review.",
        outcomes: ["Structured reflection", "Knowledge synthesis", "Confidence building"],
        detail: "Reflection prompts and short synthesis of what success/struggles reveal. Reinforce confidence and habits. Track KPIs across learning, work, artifacts, and confidence.",
    },
    {
        letter: "T",
        title: "Transition",
        subtitle: "Future Planning",
        description: "Next 30-60-90 day roadmap with resources and follow-up pathways.",
        outcomes: ["30-60-90 day roadmap", "Resource library", "Follow-up pathways"],
        detail: "Outline what's next: further learning resources, community links, transition pathways, and suggested mentoring cadence for continued independence.",
    },
]

export default function ImpactFrameworkPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "The IMPACT Framework for AI Adoption",
        description: "A 6-step coaching methodology for systematic AI adoption and measurable results.",
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

            <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <a href="/frameworks/adapt" className="text-sm text-emerald-600 hover:underline mb-4 inline-block">Also see: ADAPT Framework →</a>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
                            The <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">IMPACT</span> Framework
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                            Our 6-step coaching methodology for systematic AI adoption. Each phase builds on the previous, creating lasting organizational capability rather than surface-level familiarity.
                        </p>
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200 inline-block">
                            <p className="text-lg font-medium text-gray-700">
                                <span className="text-emerald-600 font-bold">IMPACT</span> = 1:1 adoption coaching
                            </p>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-8 mb-16">
                        {steps.map((step, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-emerald-200/50 p-8 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
                                        {step.letter}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <h2 className="text-2xl font-bold text-brand-dark">{step.title}</h2>
                                            <span className="text-sm text-emerald-600 font-medium">{step.subtitle}</span>
                                        </div>
                                        <p className="text-slate-700 mb-4 leading-relaxed">{step.description}</p>
                                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{step.detail}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {step.outcomes.map((outcome, oidx) => (
                                                <span key={oidx} className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-medium">
                                                    {outcome}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Why IMPACT */}
                    <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl shadow-lg p-8 mb-12 text-white">
                        <h2 className="text-2xl font-bold mb-4">Why IMPACT Works</h2>
                        <p className="text-lg leading-relaxed opacity-95">
                            Unlike generic AI courses, IMPACT ensures <strong>systematic adoption</strong> through structured project management. IMPACT is rooted in Self-Regulated Learning, Kolb's Experiential Learning, and the 70:20:10 model. Each phase is designed around proven adult learning principles (Andragogy), ensuring that professionals learn by doing, not just watching.
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
