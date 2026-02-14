"use client"

import { useState } from 'react'
import { track } from '@vercel/analytics'

export function Hero() {
  const [selectedAudience, setSelectedAudience] = useState('entrepreneurs')

  const scrollToQuiz = () => {
    try {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.error('Error scrolling to quiz:', error)
    }
  }

  const audienceContent = {
    entrepreneurs: {
      label: "Founders",
      start: "I know AI is important for my business, but I don’t know where to apply it or what will actually move the needle.",
      end: "You’ll identify high-leverage use cases for your business, design practical AI workflows, and build early prototypes that create measurable impact — not experiments."
    },
    managers: {
      label: "Managers",
      start: "My team keeps talking about AI, but I don’t have a structured way to evaluate or implement it.",
      end: "You’ll gain clarity on where AI fits in your team’s workflow, define priority use cases, and implement small, practical initiatives that build confidence and momentum across your team."
    },
    career_changers: {
      label: "Job Seekers",
      start: "I want to transition into AI-enabled roles, but I’m not sure what skills actually matter.",
      end: "You’ll build foundational AI capability, complete real-world projects aligned to target roles, and develop the confidence to position yourself for AI-driven opportunities."
    },
    consultants: {
      label: "Consultants",
      start: "I want to use AI in my business or client work, but I don’t know how to integrate it practically.",
      end: "You’ll design and implement AI-supported workflows that improve efficiency, reduce manual effort, and create tangible value for your business or clients."
    }
  }

  return (
    <section id="hero" className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5 py-12">
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-bold tracking-wide uppercase text-slate-600 mb-3">
            1-to-1 Personalised AI Coaching
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Go from AI-curious to <span className="bg-gradient-to-r from-brand-primary to-sky-700 bg-clip-text text-transparent">AI-capable</span> in 30–90 days.
          </h1>
          <p className="text-base text-slate-700 font-medium mb-3">
            <span className="font-bold text-brand-dark">Stop figuring AI out on your own. Discover your direction with guided support.</span> Build real-world projects step by step and grow the confidence to use AI meaningfully in your work.
          </p>
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
            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              {Object.entries(audienceContent).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedAudience(key)}
                  className={`px-3 py-2 rounded-full transition-all duration-150 font-bold ${selectedAudience === key
                      ? 'bg-brand-primary text-white'
                      : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                    }`}
                >
                  {data.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
