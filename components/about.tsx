"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import Image from "next/image"

export function About() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-12">
      <div ref={ref} className={`w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Visuals */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-brand-light border-4 border-brand-primary/30 overflow-hidden mb-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image src="/images/irfanpic.jpeg" alt="Irfan Khalid" width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 max-w-sm">
              <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-xs font-bold rounded-lg border border-brand-primary/20">IBM Certified Design Thinking Practitioner</span>
              <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-xs font-bold rounded-lg border border-brand-primary/20">Agile Certified Coach</span>
              <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-xs font-bold rounded-lg border border-brand-primary/20">Google Certified Teacher</span>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">Meet Your Facilitator — <span className="text-brand-primary">Khalid Irfan</span></h2>

            <div className="text-lg text-slate-700 space-y-4 mb-8 leading-relaxed font-medium">
              <p>
                I'm Khalid Irfan, founder of teachmeai.in and Ai4Education.in. With <span className="font-bold text-slate-900">19+ years</span> in IT and <span className="font-bold text-slate-900">7+ years</span> in academia, I help professionals, educators, and entrepreneurs adopt AI with clarity, confidence, and measurable impact.
              </p>
              <p>
                Struggling to make sense of AI? You're not alone. I help you cut through the noise and build real capability — skipping the hype to focus on what actually works for your career.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/irfankhalid/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006396] text-white px-8 py-4 rounded-xl transition-all duration-150 font-bold shadow-lg hover:shadow-xl mb-10"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>

            {/* Experience Trust Strip */}
            <div className="pt-8 border-t border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Trusted expertise across</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {[
                  { name: 'RBI', color: 'bg-blue-900' },
                  { name: 'NPCI', color: 'bg-orange-800' },
                  { name: 'TCS', color: 'bg-slate-900' },
                  { name: 'Vodafone', color: 'bg-red-800' },
                  { name: 'Volkswagen', color: 'bg-blue-800' },
                  { name: 'Flipkart', color: 'bg-yellow-700' },
                  { name: 'Target', color: 'bg-red-700' },
                  { name: 'Lowes', color: 'bg-blue-850' },
                  { name: 'O2', color: 'bg-indigo-800' },
                ].map((company) => (
                  <span
                    key={company.name}
                    className={`${company.color} text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-sm`}
                  >
                    {company.name}
                  </span>
                ))}
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-3 py-1.5 rounded-md border border-slate-200">+8 more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
