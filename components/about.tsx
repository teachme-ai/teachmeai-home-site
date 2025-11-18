"use client"

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[auto,1fr] gap-8 items-center">
        <div className="flex justify-center md:justify-start">
          <div className="w-32 h-32 rounded-full bg-brand-light border border-brand-border overflow-hidden flex items-center justify-center text-4xl">
            👨‍💼
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-3">Meet Irfan</h2>
          <p className="text-base text-slate-700 mb-4">
            I'm an Innovation & Agility Facilitator, AI Educator, and Professor of Practice with 19+ years in IT (IBM, Netsurion, more) and 7+ years in academia. I help learners and organizations adopt AI in a way that is practical, ethical, and sustainable.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">Certified ScrumMaster</span>
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">Enterprise Design Thinking Practitioner</span>
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">IBM Recognized Teacher/Educator</span>
          </div>
          <p className="text-sm text-slate-500">
            I've worked with teams at NPCI, IBM, Telstra, O2, Vodafone, Volkswagen, and Indus Trust to design AI-infused learning and transformation programs.
          </p>
        </div>
      </div>
    </section>
  )
}
