"use client"

import { useState, useEffect } from "react"
import { track } from '@vercel/analytics'

export function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Use IntersectionObserver instead of scroll listeners to avoid forced reflows
        const observerOptions = {
            root: null,
            threshold: 0,
            rootMargin: '-100px 0px 0px 0px' // Offset slightly from the top
        }

        const handleObserve = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.target.id === 'hero') {
                    // Show CTA if Hero is NOT intersecting (scrolled past it)
                    setIsVisible(!entry.isIntersecting)
                } else if (entry.target.id === 'quiz') {
                    // Hide CTA if Quiz IS intersecting (it's in view)
                    if (entry.isIntersecting) setIsVisible(false)
                }
            })
        }

        const observer = new IntersectionObserver(handleObserve, observerOptions)

        const heroSection = document.getElementById('hero')
        const quizSection = document.getElementById('quiz')

        if (heroSection) observer.observe(heroSection)
        if (quizSection) observer.observe(quizSection)

        return () => observer.disconnect()
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
                <div className="w-full max-w-[96%] mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-brand-dark">Get your free AI roadmap</p>
                        <p className="text-xs text-slate-700 font-bold">2-min chat → personalized report</p>
                    </div>
                    <p className="sm:hidden text-sm font-semibold text-brand-dark">Free AI roadmap →</p>
                    <button
                        onClick={scrollToQuiz}
                        className="btn-shimmer bg-gradient-to-r from-brand-primary to-sky-700 hover:from-sky-800 hover:to-brand-primary text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all duration-150 whitespace-nowrap shadow-md"
                    >
                        Start AI Diagnostic
                    </button>
                </div>
            </div>
        </div>
    )
}
