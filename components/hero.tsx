"use client"

import { track } from '@vercel/analytics'

export function Hero() {
  const scrollToQuiz = () => {
    try {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.error('Error scrolling to quiz:', error)
    }
  }

  return (
    <section className="bg-gradient-to-br from-brand-secondary/10 to-brand-primary/5 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-slate-500 mb-3">
            Personalized AI Mentorship
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Build real AI capability in 30–90 days — without the hype.
          </h1>
          <p className="text-base text-slate-600 mb-6">
            I help students, educators, and professionals design practical AI roadmaps, ship real projects, and feel confident using AI at work and in the classroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button 
              onClick={() => {
                track('cta_book_clicked', { location: 'hero' })
                window.open('https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')
              }}
              className="bg-brand-primary hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-150"
            >
              Book a 70-minute Clarity Call
            </button>
            <button 
              onClick={() => {
                track('quiz_cta_clicked', { location: 'hero' })
                scrollToQuiz()
              }}
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-150"
            >
              Check Your AI Readiness
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-brand-border w-full max-w-sm space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Your Starting Point</p>
              <p className="text-sm text-slate-700">"I feel overwhelmed by AI tools."</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">In 30–90 Days</p>
              <p className="text-sm text-slate-700">You'll have a clear workflow, 1–2 shipped projects, and a repeatable system.</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">Students</span>
              <span className="px-2 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary">Educators</span>
              <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">Professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
