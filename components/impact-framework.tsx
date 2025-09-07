"use client"

import { useState } from "react"

export function ImpactFramework() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)

  const impactSteps = [
    {
      letter: "I",
      title: "Initiate",
      subtitle: "Assessment Phase",
      description: "Profile analysis, learner type identification, and skill stage evaluation",
      outcomes: ["Personal AI readiness profile", "Learning style assessment", "Skill gap analysis"],
      programs: ["70-minute Clarity Call", "All programs start here"]
    },
    {
      letter: "M", 
      title: "Map",
      subtitle: "Opportunity Discovery",
      description: "Identify 2-3 AI use cases directly relevant to your role and industry",
      outcomes: ["Role-specific AI use cases", "Industry relevance mapping", "Priority opportunity list"],
      programs: ["Starter Program", "Growth Program"]
    },
    {
      letter: "P",
      title: "Prioritize",
      subtitle: "Action Planning", 
      description: "Focus on 1-2 realistic first steps with specific tools and timeline",
      outcomes: ["Realistic first steps", "Tool recommendations", "Timeline planning"],
      programs: ["Growth Program", "Extended mentoring"]
    },
    {
      letter: "A",
      title: "Act",
      subtitle: "Implementation",
      description: "Hands-on practice with feedback loops and weekly progress check-ins",
      outcomes: ["Live practice sessions", "Weekly check-ins", "Feedback loops"],
      programs: ["All ongoing programs", "1-to-1 coaching"]
    },
    {
      letter: "C",
      title: "Consolidate",
      subtitle: "Learning Integration",
      description: "Reflection, synthesis, and confidence building through structured review",
      outcomes: ["Structured reflection", "Knowledge synthesis", "Confidence building"],
      programs: ["Growth Program outcomes", "Portfolio development"]
    },
    {
      letter: "T",
      title: "Transition",
      subtitle: "Future Planning",
      description: "Next 30-60-90 day roadmap with resources and follow-up pathways",
      outcomes: ["30-60-90 day roadmap", "Resource library", "Follow-up pathways"],
      programs: ["Advanced pathways", "Ongoing support"]
    }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            The IMPACT Framework
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200 inline-block mb-4">
              <p className="text-lg font-medium text-gray-700">
                <span className="text-purple-600">IMPACT</span> = 1:1 adoption
              </p>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our 6-step coaching methodology for systematic AI adoption and measurable results
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {impactSteps.map((step, index) => (
            <div 
              key={`${step.letter}-${index}`}
              className="group relative"
              onMouseEnter={() => setHoveredStep(`${step.letter}-${index}`)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Main Card */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer h-full ${
                hoveredStep === `${step.letter}-${index}` 
                  ? 'border-purple-400 shadow-2xl transform -translate-y-2 z-10' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all duration-300 ${
                    hoveredStep === `${step.letter}-${index}`
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white scale-110'
                      : 'bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600'
                  }`}>
                    {step.letter}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-purple-600 font-medium">{step.subtitle}</p>
                </div>
              </div>

              {/* Hover Details Card */}
              {hoveredStep === `${step.letter}-${index}` && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-6 z-20 animate-in fade-in duration-200">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-purple-200 rotate-45"></div>
                  
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{step.description}</h4>
                  
                  <h5 className="font-bold text-md text-gray-900 mb-3">Key Outcomes</h5>
                  <ul className="space-y-2 mb-6">
                    {step.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-purple-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h5 className="font-bold text-md text-gray-900 mb-3">Program Connection</h5>
                  <div className="space-y-2">
                    {step.programs.map((program, idx) => (
                      <div key={idx} className="bg-purple-50 text-purple-700 text-xs px-3 py-2 rounded-full inline-block mr-2 mb-2">
                        {program}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why IMPACT Works</h3>
            <p className="text-gray-600 leading-relaxed">
              Unlike generic AI courses, IMPACT ensures <strong>systematic adoption</strong> through structured project management. 
              Each phase builds on the previous, creating lasting organizational capability rather than individual learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}