"use client"

import Link from "next/link"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Zap, Users, Target, BarChart3, RefreshCw, Shield, ArrowRight } from "lucide-react"

export function TeachMeAIFrameworks() {
  const { ref, isVisible } = useScrollAnimation()

  const brandValues = [
    { icon: Target, title: "Clarity Over Hype", color: "text-brand-primary", bg: "bg-brand-primary/10" },
    { icon: Users, title: "Personalization", color: "text-sky-500", bg: "bg-sky-500/10" },
    { icon: Zap, title: "Action-Based Learning", color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Shield, title: "Ethical AI", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: RefreshCw, title: "Agility", color: "text-violet-500", bg: "bg-violet-500/10" },
    { icon: BarChart3, title: "Measurable Impact", color: "text-rose-500", bg: "bg-rose-500/10" }
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
    <section className="py-20 bg-white">
      <div ref={ref} className={`w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in ${isVisible ? 'visible' : ''}`}>

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-wide uppercase text-slate-600 mb-3">
            Our Methodology
          </p>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-sky-700 bg-clip-text text-transparent mb-3">
            Two frameworks. One goal.
          </h2>
          <p className="text-base text-slate-700 font-medium max-w-2xl mx-auto">
            Whether you're an organization adopting AI or an individual building skills — we have a structured, proven path for you.
          </p>
        </div>

        {/* Brand Values — compact horizontal strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {brandValues.map((value, idx) => {
            const IconComponent = value.icon
            return (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm">
                <div className={`w-7 h-7 rounded-full ${value.bg} flex items-center justify-center`}>
                  <IconComponent className={`w-3.5 h-3.5 ${value.color}`} />
                </div>
                <span className="font-medium text-slate-700">{value.title}</span>
              </div>
            )
          })}
        </div>

        {/* IMPACT & ADAPT side-by-side cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* IMPACT */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-white rounded-2xl border border-brand-primary/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark">IMPACT</h3>
                <p className="text-xs text-slate-700 font-bold">For organizations & teams</p>
              </div>
            </div>
            <p className="text-sm text-slate-800 font-medium mb-5">
              Strategic AI adoption — aligns stakeholders, prioritizes high-value use cases, and tracks measurable outcomes from day one.
            </p>
            <div className="space-y-2 mb-5">
              {impact.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                    {item.letter}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-brand-dark text-sm">{item.title}</span>
                    <span className="text-slate-400 text-xs ml-1.5">— {item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/frameworks/impact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-sky-600 transition-colors"
            >
              Learn about the IMPACT Framework <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ADAPT */}
          <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-sky-200/50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark">ADAPT</h3>
                <p className="text-xs text-slate-700 font-bold">For individuals & learners</p>
              </div>
            </div>
            <p className="text-sm text-slate-800 font-medium mb-5">
              Personal AI capability — builds lasting competence through systematic skill development, not surface-level familiarity.
            </p>
            <div className="space-y-2 mb-5">
              {adapt.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                    {item.letter}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-brand-dark text-sm">{item.title}</span>
                    <span className="text-slate-400 text-xs ml-1.5">— {item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/frameworks/adapt"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-500 hover:text-brand-primary transition-colors"
            >
              Learn about the ADAPT Framework <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
