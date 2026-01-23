"use client"

import programs from "@/content/programs.json"
import { Target, TrendingUp, Rocket } from "lucide-react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const programIcons = [
  { icon: Target, color: "text-brand-primary" },
  { icon: TrendingUp, color: "text-sky-500" },
  { icon: Rocket, color: "text-emerald-500" }
]

export function Programs() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="programs" className="py-20">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-sky-600 bg-clip-text text-transparent mb-3">
          Choose your learning pathway
        </h2>
        <p className="text-base text-slate-600 mb-8">
          Three flexible options depending on how deep you want to go and how quickly you want results.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div key={program.id} className="relative p-6 bg-white rounded-2xl border-2 border-brand-primary/20 shadow-sm flex flex-col hover:border-brand-primary hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 h-full">
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-brand-primary to-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">MOST POPULAR</span>
                </div>
              )}
              {(() => {
                const IconComponent = programIcons[index].icon
                return (
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 mt-2 ${index === 0 ? 'bg-brand-primary/10' : index === 1 ? 'bg-sky-500/10' : 'bg-emerald-500/10'}`}>
                    <IconComponent className={`w-5 h-5 ${programIcons[index].color}`} />
                  </div>
                )
              })()}
              <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                {index === 0 ? 'Single Session' : index === 1 ? 'Starter Program' : 'Growth Program'}
              </p>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">{program.title}</h3>
              <p className="text-sm text-slate-700 mb-4">{program.description}</p>
              <ul className="text-sm text-slate-600 space-y-1 mb-5">
                {program.includes.slice(0, 3).map((item, idx) => (
                  <li key={idx}>· {item}</li>
                ))}
              </ul>
              <button
                onClick={() => window.open(program.id === 'growth' ? 'https://topmate.io/khalidirfan/1697252' : 'https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')}
                className="mt-auto bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-150"
              >
                {program.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
