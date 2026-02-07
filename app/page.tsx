import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { TeachMeAIFrameworks } from "@/components/teachmeai-frameworks"
import { LeadForm } from "@/components/lead-form"
import { About } from "@/components/about"
import { FAQ } from "@/components/faq"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Programs />
      <TeachMeAIFrameworks />
      <About />

      {/* Structured Lead Form - High Reliability */}
      <section id="quiz" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Discover Your AI Learning DNA
            </h2>
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

          <LeadForm />
        </div>
      </section>

      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}