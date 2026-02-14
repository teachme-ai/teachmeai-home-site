"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Quote } from "lucide-react"

const testimonials = [
    {
        quote: "Khalid's coaching transformed how I think about AI. In just 30 days, I went from feeling overwhelmed to confidently using AI tools in my daily workflow. The personalized roadmap made all the difference.",
        name: "Priya S.",
        role: "Marketing Manager",
        highlight: "overwhelmed to confidently using AI"
    },
    {
        quote: "The IMPACT framework gave me a structured approach to AI adoption that I could actually follow. No more random tutorials — just clear, measurable progress toward real skills.",
        name: "Rajesh K.",
        role: "Senior Developer",
        highlight: "structured approach to AI adoption"
    },
    {
        quote: "As an educator, I was skeptical about AI in teaching. Khalid showed me practical ways to integrate AI that actually enhanced my students' learning experience. Game-changer.",
        name: "Dr. Anita M.",
        role: "University Professor",
        highlight: "practical ways to integrate AI"
    },
    {
        quote: "The 90-day growth program exceeded expectations. I built an AI-powered workflow that saved our team 15+ hours per week. The ROI was clear within the first month.",
        name: "Vikram T.",
        role: "Product Lead",
        highlight: "saved our team 15+ hours per week"
    }
]

export function Testimonials() {
    const { ref, isVisible } = useScrollAnimation()

    return (
        <section className="py-20 bg-gradient-to-br from-brand-primary/5 via-white to-sky-50">
            <div ref={ref} className={`w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in ${isVisible ? 'visible' : ''}`}>
                <div className="text-center mb-12">
                    <p className="text-xs font-bold tracking-wide uppercase text-slate-600 mb-3">
                        Real Results
                    </p>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-sky-700 bg-clip-text text-transparent mb-3">
                        What learners are saying
                    </h2>
                    <p className="text-base text-slate-700 font-medium max-w-2xl mx-auto">
                        From AI-curious to AI-confident — hear from professionals who've made the leap.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-2xl border border-brand-primary/15 shadow-sm p-6 hover:shadow-lg hover:border-brand-primary/30 transition-all duration-200"
                        >
                            <Quote className="w-8 h-8 text-brand-primary/20 mb-3" />
                            <p className="text-sm text-slate-800 leading-relaxed font-medium mb-4">
                                "{testimonial.quote.split(testimonial.highlight).map((part, i, arr) =>
                                    i < arr.length - 1 ? (
                                        <span key={i}>
                                            {part}
                                            <strong className="text-brand-primary font-bold">{testimonial.highlight}</strong>
                                        </span>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                )}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-sky-700 flex items-center justify-center text-white font-bold text-sm">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark">{testimonial.name}</p>
                                    <p className="text-xs text-slate-600 font-bold">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
