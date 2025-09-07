"use client"

import { useState } from "react"

export function TeachMeAIFrameworks() {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null)

  const frameworks = [
    {
      icon: "🎯",
      title: "Clarity Over Hype",
      subtitle: "Cut Through AI Noise",
      description: "We strip away AI jargon and noise. Every roadmap is grounded in what actually matters to your role, work, and career.",
      outcomes: ["No AI jargon or buzzwords", "Role-specific focus", "Career-grounded roadmaps"],
      frameworks: ["IMPACT (Initiate → Map → Prioritize)", "Essentials-first approach"]
    },
    {
      icon: "👤",
      title: "Personalization with Purpose",
      subtitle: "Tailored Learning Paths",
      description: "No one-size-fits-all. Each plan is tailored to learner profile, motivation, domain, and role. We respect different learning styles and stages.",
      outcomes: ["Individual learner profiles", "Learning style adaptation", "Role-specific customization"],
      frameworks: ["Self-Regulated Learning", "IMPACT guided mentoring", "Kolb/Honey-Mumford styles"]
    },
    {
      icon: "⚡",
      title: "Confidence Through Action",
      subtitle: "Learning by Doing",
      description: "Learning isn't passive; it's built by doing and reflecting. We encourage micro-wins, artifacts, and reflection prompts.",
      outcomes: ["Hands-on practice", "Micro-wins and artifacts", "Reflection-based growth"],
      frameworks: ["Master Adaptive Learner", "AFERR (experiment, adjust, reflect)", "Prompt packs & SOPs"]
    },
    {
      icon: "🤝",
      title: "Ethical & Human-Centered AI",
      subtitle: "AI as Co-pilot",
      description: "AI is a co-pilot, not a replacement. We emphasize ethical use, bias-awareness, and human oversight.",
      outcomes: ["Human-first approach", "Bias awareness training", "Ethical AI practices"],
      frameworks: ["ADAPT methodology", "UNESCO AI Competencies", "Responsible AI adoption"]
    },
    {
      icon: "🔄",
      title: "Agility & Adaptability",
      subtitle: "Continuous Evolution",
      description: "Work and skills evolve fast. We equip learners to adapt continuously, not just complete a single course.",
      outcomes: ["Continuous adaptation skills", "Future-ready capabilities", "Lifelong learning mindset"],
      frameworks: ["ADAPT framework", "Capability Academies", "Skill evolution focus"]
    },
    {
      icon: "📊",
      title: "Measurable Impact",
      subtitle: "Tangible Outcomes",
      description: "Learning must show tangible outcomes: time saved, confidence gained, skills proven. We anchor roadmaps in Expected Impact.",
      outcomes: ["Time savings metrics", "Confidence measurement", "Skill validation"],
      frameworks: ["Impact & Measurement", "70:20:10 model", "Work → Career → Confidence ROI"]
    }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-green-50 via-white to-teal-50 scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            TeachMeAI Frameworks
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200 inline-block mb-4">
              <p className="text-lg font-medium text-gray-700">
                <span className="text-teal-600">Brand Values</span> = Our Foundation
              </p>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Six core principles that guide every aspect of our AI coaching methodology
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {frameworks.map((framework, index) => (
            <div 
              key={`${framework.title}-${index}`}
              className="group relative"
              onMouseEnter={() => setHoveredFramework(`${framework.title}-${index}`)}
              onMouseLeave={() => setHoveredFramework(null)}
            >
              {/* Main Card */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer h-full ${
                hoveredFramework === `${framework.title}-${index}` 
                  ? 'border-teal-400 shadow-2xl transform -translate-y-2 z-10' 
                  : 'border-gray-200 hover:border-teal-200'
              }`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${
                    hoveredFramework === `${framework.title}-${index}`
                      ? 'bg-gradient-to-br from-teal-500 to-green-500 scale-110'
                      : 'bg-gradient-to-br from-teal-100 to-green-100'
                  }`}>
                    {framework.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{framework.title}</h3>
                  <p className="text-sm text-teal-600 font-medium">{framework.subtitle}</p>
                </div>
              </div>

              {/* Hover Details Card */}
              {hoveredFramework === `${framework.title}-${index}` && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-teal-200 p-6 z-20 animate-in fade-in duration-200">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-teal-200 rotate-45"></div>
                  
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{framework.description}</h4>
                  
                  <h5 className="font-bold text-md text-gray-900 mb-3">Key Outcomes</h5>
                  <ul className="space-y-2 mb-6">
                    {framework.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-teal-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h5 className="font-bold text-md text-gray-900 mb-3">Applied Frameworks</h5>
                  <div className="space-y-2">
                    {framework.frameworks.map((fw, idx) => (
                      <div key={idx} className="bg-teal-50 text-teal-700 text-xs px-3 py-2 rounded-full inline-block mr-2 mb-2">
                        {fw}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why These Values Matter</h3>
            <p className="text-gray-600 leading-relaxed">
              These six brand values form the foundation of every TeachMeAI program. They ensure that AI adoption is not just about learning tools, but about building <strong>sustainable capability</strong> that grows with you and your career.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}