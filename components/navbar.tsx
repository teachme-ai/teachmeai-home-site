"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    // Look for a sentinel at the top to toggle scroll state without expensive scroll listeners
    const sentinel = document.getElementById('navbar-sentinel')
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 1.0 }
    )

    if (sentinel) observer.observe(sentinel)
    return () => observer.disconnect()
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
    <>
      <div id="navbar-sentinel" className="h-2 absolute top-0 w-full pointer-events-none" />
      <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-brand-border/50'
        : 'bg-white/80 backdrop-blur border-b border-brand-border'
        }`}>
        <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo-brand.png" alt="teachmeai" width={32} height={32} className="w-8 h-8" priority />
            <span className="text-xl font-extrabold text-brand-primary">teachmeai</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700 font-bold">
            <Link href="/programs" className="hover:text-brand-primary transition-all duration-150">
              Programs
            </Link>
            <Link href="/about" className="hover:text-brand-primary transition-all duration-150">
              About
            </Link>
            <Link href="/blog" className="hover:text-brand-primary transition-all duration-150">
              Blog
            </Link>
            {isHome ? (
              <button onClick={() => scrollToSection('quiz')} className="hover:text-brand-primary transition-all duration-150">
                AI Diagnostic
              </button>
            ) : (
              <Link href="/ai-diagnostic" className="hover:text-brand-primary transition-all duration-150">
                AI Diagnostic
              </Link>
            )}
            {isHome ? (
              <button onClick={() => scrollToSection('faq')} className="hover:text-brand-primary transition-all duration-150">
                FAQ
              </button>
            ) : (
              <Link href="/#faq" className="hover:text-brand-primary transition-all duration-150">
                FAQ
              </Link>
            )}
            <a href="https://topmate.io/khalidirfan/1622786" target="_blank" rel="noopener noreferrer" className="btn-shimmer bg-gradient-to-r from-brand-primary to-sky-700 hover:from-sky-800 hover:to-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-150 shadow-sm">
              Book Call
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-brand-dark"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
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
              <Link href="/programs" onClick={() => setIsOpen(false)} className="block text-sm text-slate-700 font-bold hover:text-brand-primary w-full text-left">
                Programs
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block text-sm text-slate-700 font-bold hover:text-brand-primary w-full text-left">
                About
              </Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-sm text-slate-700 font-bold hover:text-brand-primary w-full text-left">
                Blog
              </Link>
              <Link href="/ai-diagnostic" onClick={() => setIsOpen(false)} className="block text-sm text-slate-700 font-bold hover:text-brand-primary w-full text-left">
                AI Diagnostic
              </Link>
              <Link href="/#faq" onClick={() => setIsOpen(false)} className="block text-sm text-slate-700 font-bold hover:text-brand-primary w-full text-left">
                FAQ
              </Link>
              <a href="https://topmate.io/khalidirfan/1622786" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-brand-primary to-sky-700 hover:from-sky-800 hover:to-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold text-center transition-all duration-150">
                Book Call
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}