"use client"

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Briefcase, Rocket, Users, TrendingUp } from 'lucide-react'

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
      icon: Rocket,
      start: "I know AI is important for my business, but I don’t know where to apply it or what will actually move the needle.",
      end: "You’ll identify high-leverage use cases for your business, design practical AI workflows, and build early prototypes that create measurable impact — not experiments.",
      color: "bg-blue-600"
    },
    managers: {
      label: "Managers",
      icon: Users,
      start: "My team keeps talking about AI, but I don’t have a structured way to evaluate or implement it.",
      end: "You’ll gain clarity on where AI fits in your team’s workflow, define priority use cases, and implement small, practical initiatives that build confidence and momentum across your team.",
      color: "bg-indigo-600"
    },
    career_changers: {
      label: "Job Seekers",
      icon: TrendingUp,
      start: "I want to transition into AI-enabled roles, but I’m not sure what skills actually matter.",
      end: "You’ll build foundational AI capability, complete real-world projects aligned to target roles, and develop the confidence to position yourself for AI-driven opportunities.",
      color: "bg-emerald-600"
    },
    consultants: {
      label: "Consultants",
      icon: Briefcase,
      start: "I want to use AI in my business or client work, but I don’t know how to integrate it practically.",
      end: "You’ll design and implement AI-supported workflows that improve efficiency, reduce manual effort, and create tangible value for your business or clients.",
      color: "bg-orange-600"
    }
  }

  return (
    <section id="hero" className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5 py-12">
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Column: Heading & CTA */}
        <div>
          <p className="text-xs font-bold tracking-wide uppercase text-slate-600 mb-3">
            1-to-1 Personalised AI Coaching
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Go from AI-curious to <span className="bg-gradient-to-r from-brand-primary to-sky-700 bg-clip-text text-transparent">AI-capable</span> in 30–90 days.
          </h1>
          <p className="text-base text-slate-700 font-medium mb-8 leading-relaxed max-w-lg">
            <span className="font-bold text-brand-dark">Stop figuring AI out on your own.</span> Discover your direction with guided support. Build real-world projects step by step and grow the confidence to use AI meaningfully in your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => {
                track('cta_diagnostic_clicked', { location: 'hero' })
                scrollToQuiz()
              }}
              className="btn-shimmer bg-gradient-to-r from-brand-primary to-sky-700 hover:from-sky-800 hover:to-brand-primary text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free AI Diagnostic
            </button>
            <button
              onClick={() => {
                track('cta_book_clicked', { location: 'hero' })
                window.open('https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')
              }}
              className="border-2 border-brand-primary/20 text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 font-bold py-3.5 px-8 rounded-xl transition-all duration-200"
            >
              Book Clarity Call
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Taking new cohorts for March 2026
          </div>
        </div>

        {/* Right Column: Audience Card */}
        <div className="flex justify-end relative">
          {/* Decorative blur element behind the card */}
          <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full opacity-20 transform translate-x-10 translate-y-10"></div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-sky-400 to-emerald-400"></div>

            <div className="space-y-6">
              {/* Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(audienceContent).map(([key, data]) => {
                  const isActive = selectedAudience === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAudience(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border flex items-center gap-1.5
                        ${isActive
                          ? `${data.color} text-white border-transparent shadow-md transform scale-105`
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                    >
                      {isActive && <data.icon className="w-3 h-3" />}
                      {data.label}
                    </button>
                  )
                })}
              </div>

              {/* Dynamic Content */}
              <div className="space-y-6 animate-fade-in">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 relative">
                  <div className="absolute -left-1 top-6 w-1 h-8 rounded-r bg-slate-300"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current State</p>
                  <p className="text-sm text-slate-700 italic font-medium leading-relaxed">
                    "{audienceContent[selectedAudience as keyof typeof audienceContent].start}"
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-px bg-slate-200"></div>
                </div>

                <div className="bg-gradient-to-br from-brand-primary/5 to-sky-50 rounded-xl p-5 border border-brand-primary/10 relative">
                  <div className="absolute -left-1 top-6 w-1 h-8 rounded-r bg-brand-primary"></div>
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">In 90 Days</p>
                  <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                    {audienceContent[selectedAudience as keyof typeof audienceContent].end}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
