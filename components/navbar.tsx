"use client"

import { useState, useEffect } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    try {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    } catch (error) {
      console.error('Error scrolling to section:', id, error)
    }
  }

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-brand-border/50'
        : 'bg-white/80 backdrop-blur border-b border-brand-border'
      }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="TeachMeAI" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-extrabold text-brand-primary">TeachMeAI</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <button onClick={() => scrollToSection('programs')} className="hover:text-brand-primary transition-all duration-150">
            Programs
          </button>
          <button onClick={() => scrollToSection('about')} className="hover:text-brand-primary transition-all duration-150">
            About
          </button>
          <button onClick={() => scrollToSection('quiz')} className="hover:text-brand-primary transition-all duration-150">
            AI Readiness
          </button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-brand-primary transition-all duration-150">
            FAQ
          </button>
          <a href="https://topmate.io/khalidirfan/1622786" target="_blank" rel="noopener noreferrer" className="btn-shimmer bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150">
            Book Call
          </a>
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 hover:text-brand-dark">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-border">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('programs')} className="block text-sm text-slate-600 hover:text-brand-primary w-full text-left">
              Programs
            </button>
            <button onClick={() => scrollToSection('about')} className="block text-sm text-slate-600 hover:text-brand-primary w-full text-left">
              About
            </button>
            <button onClick={() => scrollToSection('quiz')} className="block text-sm text-slate-600 hover:text-brand-primary w-full text-left">
              AI Readiness
            </button>
            <button onClick={() => scrollToSection('faq')} className="block text-sm text-slate-600 hover:text-brand-primary w-full text-left">
              FAQ
            </button>
            <a href="https://topmate.io/khalidirfan/1622786" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white px-4 py-2 rounded-lg text-sm font-semibold text-center transition-all duration-150">
              Book Call
            </a>
          </div>
        </div>
      )}
    </header>
  )
}