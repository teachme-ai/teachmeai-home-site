"use client"

import { useState, useEffect } from "react"
import { track } from '@vercel/analytics'

export function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const quizSection = document.getElementById('quiz')
            if (quizSection) {
                const rect = quizSection.getBoundingClientRect()
                // Show when scrolled past hero, hide when quiz section is in view
                setIsVisible(window.scrollY > 400 && rect.top > window.innerHeight)
            } else {
                setIsVisible(window.scrollY > 400)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToQuiz = () => {
        track('sticky_cta_clicked')
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="bg-white/95 backdrop-blur-lg border-t border-brand-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-brand-dark">Get your free AI roadmap</p>
                        <p className="text-xs text-slate-500">2-min chat → personalized report</p>
                    </div>
                    <p className="sm:hidden text-sm font-semibold text-brand-dark">Free AI roadmap →</p>
                    <button
                        onClick={scrollToQuiz}
                        className="btn-shimmer bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all duration-150 whitespace-nowrap shadow-md"
                    >
                        Start AI Diagnostic
                    </button>
                </div>
            </div>
        </div>
    )
}
