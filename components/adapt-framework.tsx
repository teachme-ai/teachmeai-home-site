"use client"

import { useState } from "react"

export function AdaptFramework() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)

  const adaptSteps = [
    {
      letter: "A",
      title: "Assess",
      subtitle: "Current State Analysis",
      description: "Evaluate your AI readiness, skill gaps, and learning preferences using our diagnostic framework.",
      outcomes: ["Personal AI readiness score", "Skill gap identification", "Learning style assessment"],
      programs: ["All programs start here", "70-minute Clarity Call"]
    },
    {
      letter: "D", 
      title: "Design",
      subtitle: "Personalized Roadmap",
      description: "Create a tailored learning path based on your goals, timeline, and preferred learning approach.",
      outcomes: ["Custom 30/60/90-day roadmap", "Tool recommendations", "Milestone planning"],
      programs: ["Starter Program", "Growth Program"]
    },
    {
      letter: "A",
      title: "Apply",
      subtitle: "Hands-on Practice", 
      description: "Implement AI tools in real work scenarios with guided practice and immediate feedback loops.",
      outcomes: ["Live tool practice", "Work integration", "Confidence building"],
      programs: ["Growth Program", "Extended mentoring"]
    },
    {
      letter: "P",
      title: "Practice",
      subtitle: "Skill Reinforcement",
      description: "Develop fluency through repeated application, peer learning, and progressive challenges.",
      outcomes: ["Habit formation", "Skill mastery", "Portfolio development"],
      programs: ["All ongoing programs", "Community access"]
    },
    {
      letter: "T",
      title: "Transform",
      subtitle: "Measurable Impact",
      description: "Achieve demonstrable results in work performance, career advancement, or teaching effectiveness.",
      outcomes: ["ROI measurement", "Career advancement", "Leadership capability"],
      programs: ["Growth Program outcomes", "Advanced pathways"]
    }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            The ADAPT Framework
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200 inline-block mb-4">
              <p className="text-lg font-medium text-gray-700">
                <span className="text-green-600">ADAPT</span> = capability building
              </p>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our systematic approach to building individual AI capabilities - hover over each phase to explore
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {adaptSteps.map((step, index) => (
            <div 
              key={`${step.letter}-${index}`}
              className="group relative"
              onMouseEnter={() => {
                try {
                  setHoveredStep(`${step.letter}-${index}`)
                } catch (error) {
                  console.error('Error setting hovered step:', error)
                }
              }}
              onMouseLeave={() => {
                try {
                  setHoveredStep(null)
                } catch (error) {
                  console.error('Error clearing hovered step:', error)
                }
              }}
            >
              {/* Main Card */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer h-full ${
                hoveredStep === `${step.letter}-${index}` 
                  ? 'border-green-400 shadow-2xl transform -translate-y-2 z-10' 
                  : 'border-gray-200 hover:border-green-200'
              }`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all duration-300 ${
                    hoveredStep === `${step.letter}-${index}`
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white scale-110'
                      : 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-600'
                  }`}>
                    {step.letter}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-green-600 font-medium mb-3">{step.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Hover Details Card */}
              {hoveredStep === `${step.letter}-${index}` && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-6 z-20 animate-in fade-in duration-200">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-green-200 rotate-45"></div>
                  
                  <h4 className="font-bold text-lg text-gray-900 mb-4">Key Outcomes</h4>
                  <ul className="space-y-2 mb-6">
                    {step.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-bold text-lg text-gray-900 mb-3">Program Connection</h4>
                  <div className="space-y-2">
                    {step.programs.map((program, idx) => (
                      <div key={idx} className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-full inline-block mr-2 mb-2">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why ADAPT Works</h3>
            <p className="text-gray-600 leading-relaxed">
              Unlike generic AI courses, ADAPT ensures <strong>measurable progress</strong> through systematic skill building. 
              Each phase builds on the previous, creating lasting capability rather than surface-level familiarity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}