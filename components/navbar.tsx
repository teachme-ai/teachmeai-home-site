"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
            onClick={() => window.open('https://topmate.io/khalidirfan/1622786', '_blank')}
            size="sm"
            className="bg-gray-900 text-white hover:bg-gray-800 font-semibold shadow-lg"
          >
            Book Call
          </Button>
        </div>
      </div>
    </nav>
  )
}