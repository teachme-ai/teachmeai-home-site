"use client"

import { useState } from 'react'

export function AudienceBento() {
  const [selectedAudience, setSelectedAudience] = useState('builder')

  const audienceContent = {
    builder: {
      label: "The Builder",
      start: "I see AI's potential to create, but getting past basic prompting to actually building autonomous agents and real workflows feels overwhelming.",
      end: "You'll move beyond chat interfaces to orchestrating multi-agent systems, deploying AI pipelines, and architecting solutions that execute complex tasks autonomously."
    },
    solver: {
      label: "The Problem Solver",
      start: "My operations are bottlenecked, but deploying AI feels like chasing hype rather than solving actual systemic issues.",
      end: "You'll learn to decompose complex business bottlenecks and map them to targeted AI capabilities—building high-leverage, reliable automations that drastically reduce manual friction."
    },
    collaborator: {
      label: "The Collaborator",
      start: "I want to lead my team into the AI era, but I don't know how to integrate AI as a true 'team member' rather than just a shiny tool.",
      end: "You'll design human-in-the-loop workflows where AI agents augment your team’s capabilities, accelerating execution without replacing the human touch."
    },
    empath: {
      label: "The Empath",
      start: "I want to use AI to scale personalized education, coaching, or customer care, but I worry about losing authenticity and empathy.",
      end: "You'll master the art of designing context-aware, highly personalized AI interactions that scale your presence while maintaining deep ethical boundaries and genuine human connection."
    }
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in visible">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4">Who is this for?</h2>
          <p className="text-lg text-slate-600 font-medium">Select your mindset to see how you'll transform in 30–90 days.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
          {/* Roles Grid (Bento style) */}
          <div className="w-full md:w-1/2 flex flex-wrap gap-3 relative">
            {Object.entries(audienceContent).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedAudience(key)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm border-2 group relative overflow-hidden ${selectedAudience === key
                  ? 'bg-brand-primary text-white border-brand-primary scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-brand-primary/50 hover:shadow-md'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {data.label}
                  {selectedAudience !== key && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary/60">→</span>}
                </span>
              </button>
            ))}
            <div className="w-full mt-2 text-center md:text-left text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
               ↑ Click a mindset to explore
            </div>
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
