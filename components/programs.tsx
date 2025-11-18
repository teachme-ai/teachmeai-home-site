"use client"

import programs from "@/content/programs.json"

export function Programs() {
  return (
    <section id="programs" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-dark mb-3">
          Choose your learning pathway
        </h2>
        <p className="text-base text-slate-600 mb-8">
          Three flexible options depending on how deep you want to go and how quickly you want results.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div key={program.id} className="p-6 bg-brand-light rounded-2xl border border-brand-border shadow-sm flex flex-col hover:border-brand-primary hover:-translate-y-0.5 transition-all duration-150">
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
