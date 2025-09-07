"use client"

import Image from "next/image"
import { track } from '@vercel/analytics'

export function About() {
  return (
    <section id="about" className="py-12 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">🌟 About Me</h2>
        
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 text-left">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            I'm Khalid Irfan, founder of TeachMeAI.in and Ai4Education.in. With 19+ years in IT and 7+ years in academia, I help professionals, educators, and entrepreneurs adopt AI with clarity, confidence, and measurable impact.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
            <p className="text-xl font-medium leading-relaxed text-gray-700">
              Struggling to make sense of AI? - You're not alone. Many feel overwhelmed by the hype yet uncertain about how to use AI meaningfully in their work.
              <br /><br />
              I help you cut through the AI noise — and grow your career with confidence.
            </p>
          </div>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            That's where I step in. In a personalized one-on-one mentorship session, I'll help you:
          </p>
          
          <ul className="text-muted-foreground mb-6 space-y-2 list-disc list-inside">
            <li>Identify where AI can actually create value in your role or business</li>
            <li>Build hands-on confidence with tools relevant to your goals</li>
            <li>Leave with a clear, actionable roadmap to start applying AI immediately</li>
          </ul>
          
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  track('cta_book_clicked', { location: 'about' })
                  window.open('https://topmate.io/khalidirfan/1622786', '_blank')
                }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Start Your AI Journey Today
              </button>
              
              <a 
                href="https://www.linkedin.com/in/irfankhalid/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => track('linkedin_clicked', { location: 'about' })}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <Image 
                src="/images/irfanpic.jpeg" 
                alt="Khalid Irfan" 
                width={300} 
                height={400}
                className="rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}