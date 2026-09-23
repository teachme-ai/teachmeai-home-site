"use client"

import { useState } from 'react'

export function AudienceBento() {
  const [selectedAudience, setSelectedAudience] = useState('professionals')

  const rolesContent = {
    professionals: {
      label: "Working Professionals",
      start: "I'm overwhelmed by AI hype and don't know how to turn it into an actual 'team member' for my daily work.",
      end: "You'll adopt a collaborator mindset, orchestrating AI agents to handle routine workflows so you can focus on high-impact problem-solving."
    },
    educators: {
      label: "Educators",
      start: "I want to bring AI into my teaching to scale my impact, but I worry about losing authenticity and genuine connection.",
      end: "You'll embrace the empath mindset, building context-aware AI assistants that personalize learning while maintaining deep ethical boundaries and the human touch."
    },
    students: {
      label: "Students",
      start: "I'm unsure how AI fits into my future, and just prompting ChatGPT doesn't feel like a real differentiator.",
      end: "You'll adopt a builder spirit, moving beyond chat interfaces to orchestrating real AI pipelines and deploying portfolio projects that prove your autonomy."
    },
    job_seekers: {
      label: "Job Seekers",
      start: "I want to transition into AI-enabled roles, but listing 'prompt engineering' on my resume isn't opening doors.",
      end: "You’ll become a true problem solver, learning to decompose complex business bottlenecks and mapping them to targeted AI capabilities that employers actually value."
    },
    entrepreneurs: {
      label: "Startup Founders",
      start: "I know AI could give my startup an edge, but getting past basic prompting to building autonomous agents feels overwhelming.",
      end: "You’ll channel the builder spirit to architect multi-agent systems and deploy AI pipelines that execute complex tasks and scale your product autonomously."
    },
    consultants: {
      label: "Consultants",
      start: "I want to use AI to deliver faster results for clients, but deploying it feels like chasing hype rather than solving systemic issues.",
      end: "You’ll become a strategic problem solver, designing human-in-the-loop workflows that drastically reduce manual friction and create tangible value for your clients."
    },
    managers: {
      label: "Managers",
      start: "My team keeps talking about AI, but I don't know how to integrate it as a true 'team member' rather than just a shiny tool.",
      end: "You’ll adopt the collaborator mindset, designing workflows where AI agents augment your team’s capabilities without replacing the human touch."
    },
    product: {
      label: "Product Leaders",
      start: "AI is essential to our roadmap, but I’m unsure how to design AI features that actually understand and respect our users.",
      end: "Combining the empath and builder mindsets, you’ll design context-aware, highly personalized AI interactions that scale your product's value authentically."
    },
    marketing: {
      label: "Growth Marketers",
      start: "Everyone uses AI to generate generic content, but I don't know how to move beyond that into real systemic growth.",
      end: "You’ll adopt a problem-solving mindset, orchestrating high-leverage AI-powered workflows for campaigns, personalization, and analytics to drive measurable outcomes."
    },
    operations: {
      label: "Ops Leaders",
      start: "Our operations are bottlenecked, but applying AI feels like an experimental distraction rather than a robust solution.",
      end: "You’ll channel the builder spirit to decompose complex bottlenecks, deploying reliable, targeted AI automations that drastically reduce friction."
    }
  }

  const mindsetsContent = {
    builder: {
      label: "The Builder",
      start: "I see AI's potential to create, but getting past basic prompting to actually building autonomous agents and real workflows feels overwhelming.",
      end: "You'll move beyond chat interfaces to orchestrating multi-agent systems, deploying AI pipelines, and architecting solutions that execute complex tasks autonomously."
    },
    solver: {
      label: "The Problem Solver",
      start: "My operations are bottlenecked, but deploying AI feels like chasing hype rather than solving actual systemic issues.",
      end: "You'll learn to decompose complex business bottlenecks and map them to targeted AI capabilities—building high-leverage, reliable automations."
    },
    collaborator: {
      label: "The Collaborator",
      start: "I want to lead my team into the AI era, but I don't know how to integrate AI as a true 'team member' rather than just a shiny tool.",
      end: "You'll design human-in-the-loop workflows where AI agents augment your team’s capabilities, accelerating execution without replacing the human touch."
    },
    empath: {
      label: "The Empath",
      start: "I want to use AI to scale personalized education, coaching, or customer care, but I worry about losing authenticity and empathy.",
      end: "You'll master the art of designing context-aware, highly personalized AI interactions that scale your presence while maintaining genuine human connection."
    },
    hacker: {
      label: "The Hacker",
      start: "I have ideas I want to validate quickly, but getting bogged down in complex AI infrastructure slows down my momentum.",
      end: "You'll embrace rapid prototyping, quickly stitching together LLMs, APIs, and no-code tools to ship MVPs and test assumptions at lightning speed."
    },
    systems_thinker: {
      label: "The Systems Thinker",
      start: "I see fragmented AI tools everywhere, but I struggle to see how they all orchestrate together into a cohesive enterprise architecture.",
      end: "You'll master the big picture, designing robust multi-agent topologies and scalable data pipelines that transform disjointed tools into a unified, intelligent system."
    }
  }

  const allContent = { ...rolesContent, ...mindsetsContent }

  return (
    <section className="py-20 bg-slate-50">
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in visible">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4">Who is this for?</h2>
          <p className="text-lg text-slate-600 font-medium">Select your role or mindset to see how you'll transform in 30–90 days.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-start max-w-7xl mx-auto">
          {/* Pills Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-10 relative">
            
            {/* Roles */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-300 rounded-full"></span> By Professional Role
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(rolesContent).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAudience(key)}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm border-2 group relative overflow-hidden ${selectedAudience === key
                      ? 'bg-brand-dark text-white border-brand-dark scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:shadow-md'
                      }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {data.label}
                      {selectedAudience !== key && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">→</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mindsets */}
            <div>
              <h3 className="text-sm font-bold text-brand-primary/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-primary/60 rounded-full"></span> By AI Mindset
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(mindsetsContent).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAudience(key)}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm border-2 group relative overflow-hidden ${selectedAudience === key
                      ? 'bg-brand-primary text-white border-brand-primary scale-105'
                      : 'bg-white text-brand-primary border-brand-primary/20 hover:border-brand-primary/60 hover:shadow-md'
                      }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {data.label}
                      {selectedAudience !== key && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary/60">→</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full mt-2 text-center md:text-left text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
               ↑ Click a role or mindset to explore
            </div>
          </div>

          {/* Dynamic Content Reveal */}
          <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-slate-100 transition-all duration-300 md:sticky md:top-32 flex flex-col justify-center min-h-[400px]">
             <div>
                <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Your Starting Point</p>
                <p className="text-xl text-slate-800 leading-relaxed font-medium mb-8">"{allContent[selectedAudience as keyof typeof allContent].start}"</p>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />
              <div>
                <p className="text-xs md:text-sm font-bold text-brand-primary uppercase tracking-widest mt-8 mb-3">In 30–90 Days ✦</p>
                <p className="text-xl text-slate-800 leading-relaxed font-medium">{allContent[selectedAudience as keyof typeof allContent].end}</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
