"use client"

import { Button } from "@/components/ui/button"
import programs from "@/content/programs.json"

export function Programs() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": programs.map((program, index) => ({
      "@type": "Course",
      "position": index + 1,
      "name": program.title,
      "description": program.description,
      "provider": {
        "@type": "Organization",
        "name": "TeachMeAI",
        "url": "https://teachmeai.in"
      },
      "courseMode": "online",
      "educationalLevel": "Professional",
      "teaches": "Artificial Intelligence Skills",
      "audience": {
        "@type": "Audience",
        "audienceType": "Working Professionals"
      }
    }))
  }

  return (
    <section id="programs" className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white scroll-mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Choose Your AI Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Structured pathways designed for measurable results
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {programs.map((program, index) => (
            <div key={program.id} className={`bg-white rounded-2xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
              index === 1 ? 'border-emerald-200 ring-2 ring-emerald-100' : 'border-gray-100'
            }`}>
              {index === 1 && (
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{program.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{program.description}</p>
              
              <Button 
                className={`w-full mb-6 py-3 font-semibold text-lg transition-all duration-200 ${
                  index === 1 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg' 
                    : 'shadow-md hover:shadow-lg'
                }`}
                onClick={() => window.open(program.id === 'growth' ? 'https://topmate.io/khalidirfan/1697252' : 'https://topmate.io/khalidirfan/1622786', '_blank')}
              >
                {program.cta}
              </Button>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {program.includes.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-emerald-500 mr-3 mt-0.5 text-xs">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}