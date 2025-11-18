"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ProgramCardProps {
  program: {
    id: string
    title: string
    description: string
    cta: string
    includes: string[]
  }
  index: number
}

export function ProgramCard({ program, index }: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`bg-white rounded-2xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
      index === 1 ? 'border-purple-200 ring-2 ring-purple-100' : 'border-gray-100'
    }`}>
      {index === 1 && (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{program.title}</h3>
      <p className="text-gray-600 mb-8 leading-relaxed">{program.description}</p>
      
      <Button 
        className={`w-full mb-6 py-3 font-semibold text-lg transition-all duration-200 ${
          index === 1 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg' 
            : 'shadow-md hover:shadow-lg'
        }`}
        onClick={() => {
          try {
            window.open(program.id === 'growth' ? 'https://topmate.io/khalidirfan/1697252' : 'https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')
          } catch (error) {
            console.error('Error opening program link:', error)
          }
        }}
      >
        {program.cta}
      </Button>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
      >
        What's included?
        {isExpanded ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <ul className="space-y-3 text-sm text-gray-600">
            {program.includes.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1">✓</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}