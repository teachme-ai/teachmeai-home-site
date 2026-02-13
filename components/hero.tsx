"use client"

import { useState } from 'react'
import { track } from '@vercel/analytics'

export function Hero() {
  const [selectedAudience, setSelectedAudience] = useState('professionals')

  const scrollToQuiz = () => {
    try {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.error('Error scrolling to quiz:', error)
    }
  }

  const audienceContent = {
    professionals: {
      start: "I'm unsure where to begin and everything feels confusing.",
      end: "You'll pick the tools that fit your goals — from no-code platforms like n8n and Lovable to deep tech like Vertex AI and Genkit — and build small projects that prove you can do this."
    },
    educators: {
      start: "I want to bring AI into my teaching, but I'm not sure what's useful or where to start.",
      end: "You'll gain clarity on tools that matter for your subject — from AI assistants to custom learning apps — and build practical demos you can use in class."
    },
    students: {
      start: "I'm unsure how AI fits into my future, and the job market feels unpredictable.",
      end: "You'll build portfolio-ready projects using real tools — from code assistants to cloud AI platforms — and gain the confidence to stand out to employers."
    }
  }

  return (
    <section id="hero" className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-bold tracking-wide uppercase text-slate-600 mb-3">
            1-to-1 Personalised AI Coaching
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Go from AI-curious to <span className="bg-gradient-to-r from-brand-primary to-sky-700 bg-clip-text text-transparent">AI-capable</span> in 30–90 days.
          </h1>
          <p className="text-base text-slate-700 font-medium mb-3">
            Skip the hype. Pick the tools you want to learn — from ChatGPT to Vertex AI to no-code builders — and build real projects with 1-to-1 guidance.
          </p>
          <div className="flex items-center gap-4 mb-6 text-sm text-slate-700 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-600 rounded-full" />
              500+ professionals coached
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-brand-primary rounded-full" />
              4.9★ average rating
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={() => {
                track('cta_diagnostic_clicked', { location: 'hero' })
                scrollToQuiz()
              }}
              className="btn-shimmer bg-gradient-to-r from-brand-primary to-sky-700 hover:from-sky-800 hover:to-brand-primary text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-150"
            >
              Start Free AI Diagnostic
            </button>
            <button
              onClick={() => {
                track('cta_book_clicked', { location: 'hero' })
                window.open('https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')
              }}
              className="border-2 border-brand-primary text-brand-primary hover:bg-gradient-to-r hover:from-brand-primary hover:to-sky-700 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-150"
            >
              Book a Clarity Call — ₹2,100
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-brand-primary/30 w-full space-y-4 md:space-y-5">
            <div>
              <p className="text-xs md:text-sm font-bold text-slate-700 uppercase mb-2">Your Starting Point</p>
              <p className="text-sm md:text-base text-slate-800 leading-relaxed font-medium">"{audienceContent[selectedAudience as keyof typeof audienceContent].start}"</p>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
            <div>
              <p className="text-xs md:text-sm font-bold text-emerald-700 uppercase mb-2">In 30–90 Days ✦</p>
              <p className="text-sm md:text-base text-slate-800 leading-relaxed font-medium">{audienceContent[selectedAudience as keyof typeof audienceContent].end}</p>
            </div>
            <div className="flex gap-2 text-xs md:text-sm">
              <button
                onClick={() => setSelectedAudience('professionals')}
                className={`px-3 py-2 rounded-full transition-all duration-150 font-bold ${selectedAudience === 'professionals'
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                  }`}
              >
                Professionals
              </button>
              <button
                onClick={() => setSelectedAudience('educators')}
                className={`px-3 py-2 rounded-full transition-all duration-150 font-bold ${selectedAudience === 'educators'
                  ? 'bg-brand-secondary text-white'
                  : 'bg-brand-secondary/15 text-brand-secondary hover:bg-brand-secondary/25'
                  }`}
              >
                Educators
              </button>
              <button
                onClick={() => setSelectedAudience('students')}
                className={`px-3 py-2 rounded-full transition-all duration-150 font-bold ${selectedAudience === 'students'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
              >
                Students
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
