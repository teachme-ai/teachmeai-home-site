"use client"

import { useState } from 'react'
import { track } from '@vercel/analytics'

export function Hero() {
  const [selectedAudience, setSelectedAudience] = useState('students')
  
  const scrollToQuiz = () => {
    try {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.error('Error scrolling to quiz:', error)
    }
  }

  const audienceContent = {
    students: {
      start: "I'm not sure how AI fits into my career path.",
      end: "You'll have portfolio projects, a clear AI skill roadmap, and confidence to showcase your capabilities."
    },
    educators: {
      start: "I want to use AI in teaching but don't know where to start.",
      end: "You'll have practical lesson plans, AI tools integrated into your curriculum, and student engagement strategies."
    },
    professionals: {
      start: "I feel overwhelmed by AI tools and hype.",
      end: "You'll have a clear workflow, 1–2 shipped projects, and a repeatable system for your work."
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
            I help people understand AI, use it with confidence, and take steady steps that move their learning and work forward.
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
        <div className="flex justify-end">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-brand-border w-full space-y-4 md:space-y-5">
            <div>
              <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase mb-2">Your Starting Point</p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">"{audienceContent[selectedAudience as keyof typeof audienceContent].start}"</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase mb-2">In 30–90 Days</p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">{audienceContent[selectedAudience as keyof typeof audienceContent].end}</p>
            </div>
            <div className="flex gap-2 text-xs md:text-sm">
              <button 
                onClick={() => setSelectedAudience('students')}
                className={`px-3 py-2 rounded-full transition-all duration-150 ${
                  selectedAudience === 'students' 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                }`}
              >
                Students
              </button>
              <button 
                onClick={() => setSelectedAudience('educators')}
                className={`px-3 py-2 rounded-full transition-all duration-150 ${
                  selectedAudience === 'educators' 
                    ? 'bg-brand-secondary text-white' 
                    : 'bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary/20'
                }`}
              >
                Educators
              </button>
              <button 
                onClick={() => setSelectedAudience('professionals')}
                className={`px-3 py-2 rounded-full transition-all duration-150 ${
                  selectedAudience === 'professionals' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                Professionals
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
