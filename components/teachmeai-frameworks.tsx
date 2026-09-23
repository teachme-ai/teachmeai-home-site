"use client"

import Link from "next/link"
import { Target, RefreshCw, ArrowRight } from "lucide-react"

export function TeachMeAIFrameworks() {
  const impact = [
    { letter: "I", title: "Initiate" },
    { letter: "M", title: "Map" },
    { letter: "P", title: "Prioritize" },
    { letter: "A", title: "Act" },
    { letter: "C", title: "Communicate" },
    { letter: "T", title: "Track" }
  ]

  const adapt = [
    { letter: "A", title: "Assess" },
    { letter: "D", title: "Design" },
    { letter: "A", title: "Apply" },
    { letter: "P", title: "Practice" },
    { letter: "T", title: "Transform" }
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="text-center mb-16">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
          Methodology
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
          Structured for success.
        </h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row relative">
        {/* Sticky Left Column: Visual representation */}
        <div className="w-full md:w-1/2 md:sticky md:top-32 h-auto md:h-[60vh] flex flex-col items-center justify-center p-8 mb-12 md:mb-0">
          <div className="relative w-full max-w-sm aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-sky-400/10 opacity-50"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Target className="w-10 h-10 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Our Frameworks</h3>
              <p className="text-slate-500 font-medium">Keep scrolling</p>
            </div>
          </div>
        </div>

        {/* Scrolling Right Column: Content blocks */}
        <div className="w-full md:w-1/2 md:py-[10vh] flex flex-col gap-[30vh]">
          {/* IMPACT Block */}
          <div className="scroll-reveal bg-white rounded-3xl shadow-xl border-2 border-brand-primary/10 p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <h3 className="text-3xl font-bold text-brand-dark mb-4">IMPACT Framework</h3>
            <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
              For organizations and teams. Strategic AI adoption that aligns stakeholders, prioritizes high-value use cases, and tracks measurable outcomes from day one.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {impact.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-brand-primary flex items-center justify-center font-bold text-lg shadow-sm">
                    {item.letter}
                  </span>
                  <span className="font-bold text-slate-700">{item.title}</span>
                </div>
              ))}
            </div>

            <Link href="/frameworks/impact" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
              Learn about IMPACT <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* ADAPT Block */}
          <div className="scroll-reveal bg-white rounded-3xl shadow-xl border-2 border-sky-500/10 p-10 relative overflow-hidden mb-[10vh]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <h3 className="text-3xl font-bold text-brand-dark mb-4">ADAPT Framework</h3>
            <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
              For individuals and learners. Build lasting personal AI competence through systematic skill development and hands-on practice, not surface-level familiarity.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {adapt.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-sky-500 flex items-center justify-center font-bold text-lg shadow-sm">
                    {item.letter}
                  </span>
                  <span className="font-bold text-slate-700">{item.title}</span>
                </div>
              ))}
            </div>

            <Link href="/frameworks/adapt" className="inline-flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all">
              Learn about ADAPT <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
