"use client"

export function TeachMeAIFrameworks() {
  const brandValues = [
    { icon: "🎯", title: "Clarity Over Hype" },
    { icon: "👤", title: "Personalization" },
    { icon: "⚡", title: "Action-Based Learning" },
    { icon: "🤝", title: "Ethical AI" },
    { icon: "🔄", title: "Agility" },
    { icon: "📊", title: "Measurable Impact" }
  ]

  const impact = [
    { letter: "I", title: "Initiate", subtitle: "Assessment Phase" },
    { letter: "M", title: "Map", subtitle: "Opportunity Discovery" },
    { letter: "P", title: "Prioritize", subtitle: "Focus Selection" },
    { letter: "A", title: "Act", subtitle: "Implementation" },
    { letter: "C", title: "Communicate", subtitle: "Stakeholder Alignment" },
    { letter: "T", title: "Track", subtitle: "Measure Outcomes" }
  ]

  const adapt = [
    { letter: "A", title: "Assess", subtitle: "Current State Analysis" },
    { letter: "D", title: "Design", subtitle: "Personalized Roadmap" },
    { letter: "A", title: "Apply", subtitle: "Hands-on Practice" },
    { letter: "P", title: "Practice", subtitle: "Skill Reinforcement" },
    { letter: "T", title: "Transform", subtitle: "Measurable Impact" }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-brand-primary/5 via-sky-50 to-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-sky-600 bg-clip-text text-transparent mb-8 text-center">teachmeai Frameworks</h2>

        {/* Brand Values */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-brand-primary mb-4">Brand Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {brandValues.map((value, idx) => (
              <div key={idx} className="bg-white border-2 border-brand-primary/20 rounded-lg p-4 text-center hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-150">
                <div className="text-3xl mb-2">{value.icon}</div>
                <p className="text-sm font-medium text-brand-dark">{value.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IMPACT & ADAPT */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-brand-primary mb-4">IMPACT for adoption, ADAPT for capability</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* IMPACT */}
            <div>
              <h4 className="text-lg font-semibold text-brand-primary mb-3">IMPACT</h4>
              <div className="space-y-2">
                {impact.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-white to-brand-primary/5 border-2 border-brand-primary/30 rounded-full px-4 py-2 flex items-center gap-3 hover:border-brand-primary transition-all duration-150">
                    <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">{item.letter}</span>
                    <div className="flex-1">
                      <span className="font-semibold text-brand-dark text-sm">{item.title}</span>
                      <span className="text-slate-500 text-xs"> – {item.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADAPT */}
            <div>
              <h4 className="text-lg font-semibold text-brand-secondary mb-3">ADAPT</h4>
              <div className="space-y-2">
                {adapt.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-white to-sky-50 border-2 border-sky-400/30 rounded-full px-4 py-2 flex items-center gap-3 hover:border-sky-500 transition-all duration-150">
                    <span className="w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center font-bold text-sm">{item.letter}</span>
                    <div className="flex-1">
                      <span className="font-semibold text-brand-dark text-sm">{item.title}</span>
                      <span className="text-slate-500 text-xs"> – {item.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why they work */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-brand-primary/20 rounded-lg p-5 hover:border-brand-primary transition-all duration-150">
            <h4 className="font-semibold text-brand-primary mb-2">Why IMPACT Works</h4>
            <p className="text-sm text-slate-600">IMPACT ensures organizational AI adoption is strategic, not reactive. It aligns stakeholders, prioritizes high-value use cases, and tracks measurable outcomes from day one.</p>
          </div>
          <div className="bg-white border-2 border-sky-400/20 rounded-lg p-5 hover:border-sky-500 transition-all duration-150">
            <h4 className="font-semibold text-brand-secondary mb-2">Why ADAPT Works</h4>
            <p className="text-sm text-slate-600">ADAPT builds individual capability through systematic skill development. Each phase creates lasting competence rather than surface-level familiarity, ensuring sustainable AI fluency.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
