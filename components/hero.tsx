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
    <section className="relative w-full h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-white hero-scroll-container">
      {/* Immersive background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center hero-content">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          1-to-1 Personalised AI Coaching
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-brand-dark tracking-tight leading-[1.05] mb-6">
          Go from AI-curious to <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-brand-primary to-sky-600 bg-clip-text text-transparent">AI-capable.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 font-medium mb-12 max-w-3xl leading-relaxed">
          Stop figuring AI out on your own. Discover your direction with guided support and build real-world skills in 30–90 days.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              track('cta_diagnostic_clicked', { location: 'hero' })
              scrollToQuiz()
            }}
            className="btn-shimmer w-full sm:w-auto bg-gradient-to-r from-brand-primary to-sky-600 hover:from-sky-700 hover:to-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-lg"
          >
            Start Free AI Diagnostic
          </button>
          <a
            onClick={() => track('cta_book_clicked', { location: 'hero' })}
            href="https://topmate.io/khalidirfan/1622786"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-700 hover:border-brand-primary hover:text-brand-primary font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg shadow-sm"
          >
            Book a Clarity Call
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2 animate-bounce hero-scroll-indicator">
        <span className="text-xs font-bold tracking-widest uppercase">Explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>
  )
}
