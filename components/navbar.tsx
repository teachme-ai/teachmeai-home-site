"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
  const scrollToSection = (id: string) => {
    try {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    } catch (error) {
      console.error('Error scrolling to section:', id, error)
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image 
            src="/images/logo.png" 
            alt="TeachMeAI Logo" 
            width={40} 
            height={40}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold text-gray-900">TeachMeAI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('programs')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Programs
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </button>
          <Button 
            onClick={() => {
              try {
                window.open('https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')
              } catch (error) {
                console.error('Error opening booking link:', error)
              }
            }}
            size="sm"
            className="bg-gray-900 text-white hover:bg-gray-800 font-semibold shadow-lg"
          >
            Book Call
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
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
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('programs')}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Programs
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </button>
            <Button 
              onClick={() => {
                try {
                  window.open('https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')
                } catch (error) {
                  console.error('Error opening booking link:', error)
                }
              }}
              size="sm"
              className="bg-gray-900 text-white hover:bg-gray-800 font-semibold shadow-lg w-full"
            >
              Book Call
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}