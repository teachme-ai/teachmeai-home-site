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
      label: "Working Professionals",
      start: "I'm unsure where to begin and everything feels confusing.",
      end: "You'll pick the tools that fit your goals — from no-code platforms like n8n and Lovable to deep tech like Vertex AI and Genkit — and build small projects that prove you can do this."
    },
    educators: {
      label: "Educators",
      start: "I want to bring AI into my teaching, but I'm not sure what's useful or where to start.",
      end: "You'll gain clarity on tools that matter for your subject — from AI assistants to custom learning apps — and build practical demos you can use in class."
    },
    students: {
      label: "Students",
      start: "I'm unsure how AI fits into my future, and the job market feels unpredictable.",
      end: "You'll build portfolio-ready projects using real tools — from code assistants to cloud AI platforms — and gain the confidence to stand out to employers."
    },
    job_seekers: {
      label: "Job Seekers",
      start: "I want to transition into AI-enabled roles, but I’m not sure what skills actually matter.",
      end: "You’ll build foundational AI capability, complete real-world projects aligned to target roles, and develop the confidence to position yourself for AI-driven opportunities."
    },
    entrepreneurs: {
      label: "Startup Founders",
      start: "I know AI could give my startup an edge, but I’m unsure where to focus or how to avoid chasing the wrong ideas.",
      end: "You’ll identify high-leverage AI opportunities for your product or operations, build practical prototypes or workflows, and gain the clarity to integrate AI strategically — not experimentally."
    },
    consultants: {
      label: "Consultants",
      start: "I want to use AI in my business or client work, but I don’t know how to integrate it practically.",
      end: "You’ll design and implement AI-supported workflows that improve efficiency, reduce manual effort, and create tangible value for your business or clients."
    },
    managers: {
      label: "Managers",
      start: "My team keeps talking about AI, but I don’t have a structured way to evaluate or implement it.",
      end: "You’ll gain clarity on where AI fits in your team’s workflow, define priority use cases, and implement small, practical initiatives that build confidence and momentum across your team."
    },
    product: {
      label: "Product Leaders",
      start: "AI is becoming essential to product strategy, but I’m unsure how to evaluate, design, or prioritize AI features.",
      end: "You’ll define AI-driven product opportunities, build early validation experiments, and develop the confidence to integrate AI into your roadmap with clarity and strategic intent."
    },
    marketing: {
      label: "Growth Marketers",
      start: "Everyone is using AI in marketing, but I don’t know how to move beyond content generation into real performance impact.",
      end: "You’ll design AI-powered workflows for campaigns, personalization, and analytics, build measurable experiments, and apply AI consistently to drive growth outcomes."
    },
    operations: {
      label: "Ops Leaders",
      start: "We want to improve efficiency with AI, but I don’t know where it fits into our existing workflows.",
      end: "You’ll pinpoint priority processes for AI integration, design realistic automation pilots, and build structured execution plans that improve performance without disrupting operations."
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
          <p className="text-base text-slate-700 font-medium mb-6 leading-relaxed">
            <span className="font-bold text-brand-dark">Stop figuring AI out on your own. Discover your direction with guided support.</span> The result is a personalized AI roadmap grounded in your psychology, career direction, and real-world schedule. This roadmap becomes the foundation of our 1:1 mentoring conversation — ensuring we begin with clarity, not guesswork, and build momentum from day one.
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
