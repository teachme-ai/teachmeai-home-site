export function ImpactFramework() {
  const impactSteps = [
    {
      letter: "I",
      title: "Initiate Assessment",
      description: "Profile analysis, learner type identification, and skill stage evaluation"
    },
    {
      letter: "M", 
      title: "Map Opportunities",
      description: "Identify 2-3 AI use cases directly relevant to your role and industry"
    },
    {
      letter: "P",
      title: "Prioritize Actions", 
      description: "Focus on 1-2 realistic first steps with specific tools and timeline"
    },
    {
      letter: "A",
      title: "Act & Adjust",
      description: "Hands-on practice with feedback loops and weekly progress check-ins"
    },
    {
      letter: "C",
      title: "Consolidate Learning",
      description: "Reflection, synthesis, and confidence building through structured review"
    },
    {
      letter: "T",
      title: "Transition Forward",
      description: "Next 30-60-90 day roadmap with resources and follow-up pathways"
    }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            The IMPACT Framework
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Project Management:</strong> Our 6-step coaching methodology for systematic AI adoption and measurable results
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactSteps.map((step, index) => (
            <div key={step.letter} className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.letter}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}