import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import programsData from "@/content/programs.json"

export const metadata: Metadata = {
    title: "AI Coaching Programs — Clarity Call, 30-Day Starter, 90-Day Growth | teachmeai",
    description: "Choose your AI learning pathway: 70-minute Clarity Call (₹2,100), 30-Day Starter Program (₹3,600), or 90-Day Growth Package (₹7,100). Personalized AI coaching for professionals.",
    openGraph: {
        title: "AI Coaching Programs — Personalized 1:1 Mentorship | teachmeai",
        description: "Choose from our Clarity Call, Starter (30-day), or Growth (90-day) programs to master AI tools and frameworks.",
        url: "https://teachmeai.in/programs",
        images: [{ url: '/images/og/programs.png', width: 1200, height: 630, alt: 'AI Coaching Programs - teachmeai' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Coaching Programs — Personalized 1:1 Mentorship | teachmeai',
        description: 'Choose from our Clarity Call, Starter (30-day), or Growth (90-day) programs to master AI tools and frameworks.',
        images: ['/images/og/programs.png'],
    },
}

const programSlugs: Record<string, string> = {
    single: "clarity-call",
    starter: "starter-30-day",
    growth: "growth-90-day",
}

const programPricing: Record<string, string> = {
    single: "₹2,100",
    starter: "₹3,600",
    growth: "₹7,100",
}

const programIcons: Record<string, string> = {
    single: "🎯",
    starter: "🚀",
    growth: "📈",
}

export default function ProgramsPage() {
    return (
        <main>
            <Navbar />
            <section className="py-20 bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
                            AI Training Programs
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Choose your pathway from a single clarity session to a comprehensive 90-day growth program. Every program is personalized to your goals, role, and learning style.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {programsData.map((program) => (
                            <Link
                                key={program.id}
                                href={`/programs/${programSlugs[program.id]}`}
                                className="group bg-white rounded-2xl shadow-lg border-2 border-brand-primary/20 p-8 hover:border-brand-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{programIcons[program.id]}</div>
                                <h2 className="text-2xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                                    {program.title}
                                </h2>
                                <p className="text-slate-600 mb-4">{program.description}</p>
                                <div className="text-2xl font-bold text-brand-primary mb-6">
                                    {programPricing[program.id]}
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {program.includes.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-slate-700">
                                            <span className="text-brand-primary mr-2 mt-0.5">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-brand-primary font-semibold text-sm group-hover:underline">
                                    Learn more →
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Comparison */}
                    <div className="bg-white rounded-2xl shadow-lg border border-brand-primary/20 p-8 mb-12">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">Not sure which to choose?</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2 border-brand-primary/20">
                                        <th className="text-left py-3 px-4 text-slate-500">Feature</th>
                                        <th className="py-3 px-4 text-brand-primary font-semibold">Clarity Call</th>
                                        <th className="py-3 px-4 text-brand-primary font-semibold">Starter 30-Day</th>
                                        <th className="py-3 px-4 text-brand-primary font-semibold">Growth 90-Day</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center text-slate-700">
                                    <tr className="border-b border-slate-100">
                                        <td className="text-left py-3 px-4 font-medium">Duration</td>
                                        <td className="py-3 px-4">70 minutes</td>
                                        <td className="py-3 px-4">30 days</td>
                                        <td className="py-3 px-4">90 days</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="text-left py-3 px-4 font-medium">Sessions</td>
                                        <td className="py-3 px-4">1</td>
                                        <td className="py-3 px-4">Weekly check-ins</td>
                                        <td className="py-3 px-4">4 mentorship sessions</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="text-left py-3 px-4 font-medium">AI Readiness Assessment</td>
                                        <td className="py-3 px-4">✅</td>
                                        <td className="py-3 px-4">✅</td>
                                        <td className="py-3 px-4">✅</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="text-left py-3 px-4 font-medium">Personalized Roadmap</td>
                                        <td className="py-3 px-4">1-page</td>
                                        <td className="py-3 px-4">30-day plan</td>
                                        <td className="py-3 px-4">90-day plan</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="text-left py-3 px-4 font-medium">Hands-on Practice</td>
                                        <td className="py-3 px-4">—</td>
                                        <td className="py-3 px-4">✅</td>
                                        <td className="py-3 px-4">✅</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="text-left py-3 px-4 font-medium">KPI Tracking</td>
                                        <td className="py-3 px-4">—</td>
                                        <td className="py-3 px-4">—</td>
                                        <td className="py-3 px-4">✅</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left py-3 px-4 font-medium">Price</td>
                                        <td className="py-3 px-4 font-bold text-brand-primary">₹2,100</td>
                                        <td className="py-3 px-4 font-bold text-brand-primary">₹3,600</td>
                                        <td className="py-3 px-4 font-bold text-brand-primary">₹7,100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <p className="text-slate-600 mb-4">Not ready to commit? Try our free AI diagnostic first.</p>
                        <Link
                            href="/ai-diagnostic"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-150"
                        >
                            Start Free AI Diagnostic →
                        </Link>
                    </div>

                    {/* Cross-links */}
                    <div className="mt-12 grid sm:grid-cols-3 gap-4">
                        <Link href="/about" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow text-center">
                            <h3 className="font-semibold text-brand-dark mb-1">Meet Your Coach →</h3>
                            <p className="text-sm text-slate-600">19+ years IT, 7+ years academia</p>
                        </Link>
                        <Link href="/frameworks/impact" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow text-center">
                            <h3 className="font-semibold text-brand-dark mb-1">IMPACT Framework →</h3>
                            <p className="text-sm text-slate-600">Our coaching methodology</p>
                        </Link>
                        <Link href="/blog" className="block bg-white rounded-xl border border-brand-primary/20 p-5 hover:shadow-md transition-shadow text-center">
                            <h3 className="font-semibold text-brand-dark mb-1">Read the Blog →</h3>
                            <p className="text-sm text-slate-600">AI coaching guides and tips</p>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
