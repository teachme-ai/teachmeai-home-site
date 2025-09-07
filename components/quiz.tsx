"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { track } from '@vercel/analytics'

export function Quiz() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    industry: '',
    roleDescription: '',
    goal: '',
    workImpact: '',
    careerImpact: '',
    confidenceImpact: '',
    confidence: 1
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      track('quiz_submitted', { 
        goal: formData.goal,
        confidence: formData.confidence,
        industry: formData.industry
      })
      
      const webhookUrl = process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL
      
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString()
          })
        })
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Quiz submission error:', error)
      setIsSubmitted(true) // Still show success to user
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="quiz" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">
              Thanks! You'll get a short summary in your inbox.
            </h3>
            <p className="text-green-700 mb-6">
              Want to fast-track your AI journey?
            </p>
            <Button 
              onClick={() => window.open('https://topmate.io/khalidirfan/1622786', '_blank')}
              size="lg"
            >
              Book a 70-minute Clarity Call
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quiz" className="py-12 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          AI Readiness Quiz
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          3 quick questions to assess your AI journey
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g. Product Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Industry *</label>
              <input
                type="text"
                required
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g. Technology"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Describe your role and responsibilities *</label>
            <textarea
              required
              value={formData.roleDescription}
              onChange={(e) => setFormData({...formData, roleDescription: e.target.value})}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-24 resize-none"
              placeholder="What do you do day-to-day? What are your main responsibilities?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">1. Your primary goal right now? *</label>
            <div className="grid grid-cols-2 gap-3">
              {['Career shift', 'Upskill in current role', 'Process automation', 'Startup/entrepreneurship'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="goal"
                    value={option}
                    required
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">2. Expected Impact on:</label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Work</label>
                <input
                  type="text"
                  value={formData.workImpact}
                  onChange={(e) => setFormData({...formData, workImpact: e.target.value})}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How will AI impact your work?"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Career</label>
                <input
                  type="text"
                  value={formData.careerImpact}
                  onChange={(e) => setFormData({...formData, careerImpact: e.target.value})}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How will AI impact your career?"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Confidence</label>
                <input
                  type="text"
                  value={formData.confidenceImpact}
                  onChange={(e) => setFormData({...formData, confidenceImpact: e.target.value})}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How will AI impact your confidence?"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">3. Current AI tool confidence (1 = new, 5 = advanced) *</label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="confidence"
                    value={num}
                    required
                    onChange={(e) => setFormData({...formData, confidence: parseInt(e.target.value)})}
                    className="text-primary focus:ring-primary"
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </Button>
        </form>
      </div>
    </section>
  )
}