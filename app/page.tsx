import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import dynamic from 'next/dynamic'

// Below-the-fold components loaded dynamically to reduce TBT
const LeadForm = dynamic(() => import("@/components/lead-form").then(mod => mod.LeadForm))
const AgenticFlow = dynamic(() => import("@/components/agentic-flow").then(mod => mod.AgenticFlow))
const Programs = dynamic(() => import("@/components/programs").then(mod => mod.Programs))
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => mod.Testimonials))
const About = dynamic(() => import("@/components/about").then(mod => mod.About))
const TeachMeAIFrameworks = dynamic(() => import("@/components/teachmeai-frameworks").then(mod => mod.TeachMeAIFrameworks))
const FAQ = dynamic(() => import("@/components/faq").then(mod => mod.FAQ))
const Newsletter = dynamic(() => import("@/components/newsletter").then(mod => mod.Newsletter))
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer))
const StickyCTA = dynamic(() => import("@/components/sticky-cta").then(mod => mod.StickyCTA))

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* AI Diagnostic — Aggressively flattened to reduce depth below 10 */}
      <section id="quiz" className="py-20 px-4 bg-slate-50">
        <div className="w-full max-w-[96%] mx-auto text-center mb-12">
          <p className="text-xs font-bold tracking-wide uppercase text-slate-700 mb-3">
            Free in 2 Minutes
          </p>
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Discover Your AI Learning DNA
          </h2>
          <p className="text-lg text-slate-700 font-medium max-w-2xl mx-auto mb-8">
            Chat with our AI to map your goals in 2 minutes. We&apos;ll generate a
            <strong className="text-brand-primary"> Free Personalized Report</strong> revealing your learning style,
            cognitive strengths, and a custom roadmap.
          </p>
          <div className="text-sm text-slate-700 flex flex-wrap justify-center gap-4 items-center font-bold">
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 whitespace-nowrap">✨ 2-min Chat</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 whitespace-nowrap">📩 Email Link</span>
            <span className="text-slate-300">→</span>
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 whitespace-nowrap">📊 Deep Analysis</span>
          </div>
        </div>


        <div className="w-full max-w-[96%] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image & Description */}
          <AgenticFlow />

          {/* Right Column: Quiz Module */}
          <LeadForm />
        </div>
      </section>

      <Programs />
      <Testimonials />
      <About />
      <TeachMeAIFrameworks />
      <FAQ />
      <Newsletter />
      <Footer />
      <StickyCTA />
    </main >
  )
}