import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { TeachMeAIFrameworks } from "@/components/teachmeai-frameworks"
import { ChatQuiz } from "@/components/chat-quiz"
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

      {/* AI ChatQuiz - Conversational Lead Qualifier */}
      <section id="quiz" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Get Your Free AI Analysis
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Chat with our AI assistant for 2-3 minutes. We'll analyze your goals and
              email you a personalized link to complete your AI learning profile.
            </p>
          </div>

          <ChatQuiz />
        </div>
      </section>

      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}