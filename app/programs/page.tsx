import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import programsData from "@/content/programs.json"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { ProgramsTabbed } from "@/components/programs-tabbed"

export const metadata: Metadata = {
    title: "AI Coaching Programs — Clarity Call, 30-Day Starter, 90-Day Growth | teachmeai",
    description: "Choose your AI learning pathway: 70-minute Clarity Call, 30-Day Starter Program, or 90-Day Growth Package. Personalized AI coaching for professionals.",
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

export default function ProgramsPage() {
    return (
        <main className="bg-slate-50 min-h-screen">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://teachmeai.in/" },
                    { name: "Programs", url: "https://teachmeai.in/programs" }
                ]}
            />
            <Navbar />
            <section className="py-24">
                <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-3">Pathways</p>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight mb-6 tracking-tight">
                            AI Training Programs
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                            Every program is personalized to your goals, role, and learning style. Select a pathway to explore the details.
                        </p>
                    </div>

                    <ProgramsTabbed programs={programsData} />

                    {/* CTA */}
                    <div className="mt-24 text-center">
                        <p className="text-slate-600 font-bold mb-4">Not ready to commit? Try our free AI diagnostic first.</p>
                        <Link
                            href="/ai-diagnostic"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-sky-600 hover:from-sky-700 hover:to-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Start Free AI Diagnostic →
                        </Link>
                    </div>

                    {/* Cross-links */}
                    <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <Link href="/about" className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 text-center border-2 border-transparent hover:border-brand-primary/20">
                            <h3 className="font-bold text-brand-dark mb-2 text-lg">Meet Your Coach →</h3>
                            <p className="text-sm text-slate-500 font-medium">19+ years IT, 7+ years academia</p>
                        </Link>
                        <Link href="/frameworks/impact" className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 text-center border-2 border-transparent hover:border-brand-primary/20">
                            <h3 className="font-bold text-brand-dark mb-2 text-lg">IMPACT Framework →</h3>
                            <p className="text-sm text-slate-500 font-medium">Our coaching methodology</p>
                        </Link>
                        <Link href="/blog" className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 text-center border-2 border-transparent hover:border-brand-primary/20">
                            <h3 className="font-bold text-brand-dark mb-2 text-lg">Read the Blog →</h3>
                            <p className="text-sm text-slate-500 font-medium">AI coaching guides and tips</p>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
