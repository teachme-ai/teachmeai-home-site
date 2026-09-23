"use client"

import { useState } from 'react'

export function AudienceBento() {
  const [selectedAudience, setSelectedAudience] = useState('professionals')

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
    <section className="py-20 bg-slate-50">
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in visible">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4">Who is this for?</h2>
          <p className="text-lg text-slate-600 font-medium">Select your role to see how you'll transform in 30–90 days.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
          {/* Roles Grid (Bento style) */}
          <div className="w-full md:w-1/2 flex flex-wrap gap-3">
            {Object.entries(audienceContent).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedAudience(key)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm border-2 ${selectedAudience === key
                  ? 'bg-brand-primary text-white border-brand-primary scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-brand-primary/50 hover:shadow-md'
                  }`}
              >
                {data.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Reveal */}
          <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-xl p-8 border-2 border-slate-100 transition-all duration-300 min-h-[300px] flex flex-col justify-center">
             <div>
                <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Your Starting Point</p>
                <p className="text-lg text-slate-800 leading-relaxed font-medium mb-6">"{audienceContent[selectedAudience as keyof typeof audienceContent].start}"</p>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />
              <div>
                <p className="text-xs md:text-sm font-bold text-brand-primary uppercase tracking-widest mt-6 mb-2">In 30–90 Days ✦</p>
                <p className="text-lg text-slate-800 leading-relaxed font-medium">{audienceContent[selectedAudience as keyof typeof audienceContent].end}</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
