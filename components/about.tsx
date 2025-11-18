"use client"

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[auto,1fr] gap-8 items-center">
        <div className="flex justify-center md:justify-start">
          <div className="w-32 h-32 rounded-full bg-brand-light border border-brand-border overflow-hidden">
            <img src="/images/irfanpic.jpeg" alt="Irfan Khalid" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-3">Meet Irfan</h2>
          <p className="text-base text-slate-700 mb-4">
            I'm Khalid Irfan, founder of TeachMeAI.in and Ai4Education.in. With 19+ years in IT and 7+ years in academia, I help professionals, educators, and entrepreneurs adopt AI with clarity, confidence, and measurable impact.
          </p>
          <p className="text-base text-slate-700 mb-6">
            Struggling to make sense of AI? You're not alone. Many feel overwhelmed by the hype yet uncertain about how to use AI meaningfully in their work. I help you cut through the AI noise — and grow your career with confidence.
          </p>
          <a 
            href="https://www.linkedin.com/in/irfankhalid/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-150 font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
