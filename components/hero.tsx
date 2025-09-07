"use client"

import { Button } from "@/components/ui/button"
import { track } from '@vercel/analytics'
import Image from "next/image"

export function Hero() {
  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-20 pb-6 md:pb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white">
              Build real AI capability in 
              <span className="block text-yellow-300">30–90 days</span>
              <span className="text-3xl md:text-4xl font-normal block mt-2 text-white/90">without the hype</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 leading-relaxed">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-semibold text-white shadow-lg border border-white/30">1-to-1 Personalised Coaching</span>, Personalized roadmaps, hands-on practice, and measurable outcomes for working professionals and learners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-2 md:mb-4">
              <button
                onClick={() => {
                  track('cta_book_clicked', { location: 'hero' })
                  window.open('https://topmate.io/khalidirfan/1622786', '_blank')
                }}
                className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-md h-12 sm:h-14 inline-flex items-center justify-center text-center"
              >
                Book a 70-minute Clarity Call
              </button>
              <button
                onClick={() => {
                  track('quiz_cta_clicked', { location: 'hero' })
                  scrollToQuiz()
                }}
                className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm font-semibold transform hover:scale-105 transition-all duration-200 rounded-md h-12 sm:h-14 inline-flex items-center justify-center text-center"
              >
                Check your AI readiness (3 minutes)
              </button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end mt-0 lg:mt-0">
            <div className="animate-float w-full lg:w-auto">
              <Image 
                src="/images/logo.png" 
                alt="TeachMeAI Logo" 
                width={250} 
                height={250}
                className="rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm p-6 w-full h-auto max-w-none sm:max-w-[300px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px] lg:p-12 mx-auto lg:mx-0"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}