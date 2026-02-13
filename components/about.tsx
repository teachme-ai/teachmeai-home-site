"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import Image from "next/image"

export function About() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-20">
      <div ref={ref} className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-brand-light border-4 border-brand-primary/30 overflow-hidden mb-4">
            <Image src="/images/irfanpic.jpeg" alt="Irfan Khalid" width={400} height={400} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Meet Your Facilitator — Khalid Irfan</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-sky-100 text-brand-primary text-xs font-semibold rounded-full border border-brand-primary/30">IBM Certified Design Thinking Practitioner</span>
            <span className="px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-sky-100 text-brand-primary text-xs font-semibold rounded-full border border-brand-primary/30">Agile Certified Coach</span>
            <span className="px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-sky-100 text-brand-primary text-xs font-semibold rounded-full border border-brand-primary/30">Google Certified Teacher</span>
            <span className="px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-sky-100 text-brand-primary text-xs font-semibold rounded-full border border-brand-primary/30">IBM Recognised Educator</span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base text-slate-700 mb-4 leading-relaxed">
            I'm Khalid Irfan, founder of TeachMeAI.in and Ai4Education.in. With 19+ years in IT and 7+ years in academia, I help professionals, educators, and entrepreneurs adopt AI with clarity, confidence, and measurable impact.
          </p>
          <p className="text-base text-slate-700 mb-6 leading-relaxed">
            Struggling to make sense of AI? You're not alone. Many feel overwhelmed by the hype yet uncertain about how to use AI meaningfully in their work. I help you cut through the AI noise — and grow your career with confidence.
          </p>
          <a
            href="https://www.linkedin.com/in/irfankhalid/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-150 font-semibold shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>

          {/* Experience Trust Strip */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600 font-medium mb-4">Experience across leading organizations:</p>
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
              {[
                { name: 'RBI', color: 'bg-blue-800' },
                { name: 'NPCI', color: 'bg-orange-500' },
                { name: 'TCS', color: 'bg-slate-800' },
                { name: 'Vodafone', color: 'bg-red-600' },
                { name: 'Volkswagen', color: 'bg-blue-600' },
                { name: 'Flipkart', color: 'bg-yellow-500' },
                { name: 'Target', color: 'bg-red-500' },
                { name: 'Telstra', color: 'bg-orange-600' },
                { name: 'Lowes', color: 'bg-blue-700' },
                { name: 'O2', color: 'bg-indigo-600' },
              ].map((company) => (
                <span
                  key={company.name}
                  className={`${company.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}
                >
                  {company.name}
                </span>
              ))}
              <span className="text-xs text-slate-500 font-medium">+8 more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
