"use client"

import { useState } from "react"
import Link from "next/link"

const programSlugs: Record<string, string> = {
    single: "clarity-call",
    starter: "starter-30-day",
    growth: "growth-90-day",
}

const programPricing: Record<string, string> = {
    single: "Digital Payment",
    starter: "Digital Payment",
    growth: "Digital Payment",
}

export function ProgramsTabbed({ programs }: { programs: any[] }) {
    const [activeTab, setActiveTab] = useState(programs[0].id)
    const [showComparison, setShowComparison] = useState(false)
    
    const activeProgram = programs.find(p => p.id === activeTab)

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {programs.map((program) => (
                    <button
                        key={program.id}
                        onClick={() => setActiveTab(program.id)}
                        className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                            activeTab === program.id 
                            ? 'bg-brand-dark text-white shadow-lg scale-105' 
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        {program.title.split('(')[0].trim()}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 mb-12 border-2 border-slate-100 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-bl-[100%] pointer-events-none"></div>

                {activeProgram && (
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center animate-fade-in visible">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">{activeProgram.title}</h2>
                            <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">{activeProgram.description}</p>
                            
                            <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 w-full shadow-sm">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Investment</span>
                                <span className="text-2xl font-bold text-brand-primary">{programPricing[activeProgram.id]}</span>
                            </div>

                            <Link
                                href={`/programs/${programSlugs[activeProgram.id]}`}
                                className="inline-block bg-brand-dark hover:bg-brand-primary text-white font-bold py-4 px-8 rounded-full transition-colors duration-300 shadow-md"
                            >
                                Learn more & Book →
                            </Link>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">✓</span>
                                What's included
                            </h3>
                            <ul className="space-y-4">
                                {activeProgram.includes.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-start text-slate-700 font-medium">
                                        <span className="text-brand-primary mr-3 mt-1 font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Compare Toggle */}
            <div className="text-center">
                <button 
                    onClick={() => setShowComparison(!showComparison)}
                    className="text-slate-500 hover:text-brand-dark font-bold text-sm uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto"
                >
                    {showComparison ? 'Hide Comparison' : 'Compare All Programs'}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${showComparison ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>

            {/* Comparison Table (Hidden by default) */}
            {showComparison && (
                <div className="mt-8 bg-white rounded-3xl shadow-lg border border-slate-100 p-8 overflow-x-auto animate-fade-in visible">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-slate-100">
                                <th className="text-left py-4 px-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Feature</th>
                                <th className="py-4 px-4 text-brand-dark font-bold">Clarity Call</th>
                                <th className="py-4 px-4 text-brand-dark font-bold">Starter 30-Day</th>
                                <th className="py-4 px-4 text-brand-dark font-bold">Growth 90-Day</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-slate-700 font-medium">
                            <tr className="border-b border-slate-50">
                                <td className="text-left py-4 px-4">Duration</td>
                                <td className="py-4 px-4">70 minutes</td>
                                <td className="py-4 px-4">30 days</td>
                                <td className="py-4 px-4">90 days</td>
                            </tr>
                            <tr className="border-b border-slate-50">
                                <td className="text-left py-4 px-4">Sessions</td>
                                <td className="py-4 px-4">1</td>
                                <td className="py-4 px-4">Weekly check-ins</td>
                                <td className="py-4 px-4">4 mentorship sessions</td>
                            </tr>
                            <tr className="border-b border-slate-50">
                                <td className="text-left py-4 px-4">AI Readiness Assessment</td>
                                <td className="py-4 px-4 text-emerald-500 font-bold">✓</td>
                                <td className="py-4 px-4 text-emerald-500 font-bold">✓</td>
                                <td className="py-4 px-4 text-emerald-500 font-bold">✓</td>
                            </tr>
                            <tr className="border-b border-slate-50">
                                <td className="text-left py-4 px-4">Hands-on Practice</td>
                                <td className="py-4 px-4 text-slate-300">—</td>
                                <td className="py-4 px-4 text-emerald-500 font-bold">✓</td>
                                <td className="py-4 px-4 text-emerald-500 font-bold">✓</td>
                            </tr>
                            <tr>
                                <td className="text-left py-4 px-4">Payment</td>
                                <td className="py-4 px-4 font-bold text-brand-primary">Digital Payment</td>
                                <td className="py-4 px-4 font-bold text-brand-primary">Digital Payment</td>
                                <td className="py-4 px-4 font-bold text-brand-primary">Digital Payment</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
