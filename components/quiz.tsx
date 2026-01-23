"use client"

import { useState } from "react"
import { track } from '@vercel/analytics'

export function Quiz() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    industry: '',
    goal: '',
    confidence: 1
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      track('quiz_submitted', {
        goal: formData.goal,
        confidence: formData.confidence,
        industry: formData.industry
      })

      const webhookUrl = process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL

      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Quiz submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="quiz" className="py-20 bg-brand-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white border border-brand-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-brand-dark mb-4">
              Thanks! You'll get a short summary in your inbox.
            </h3>
            <p className="text-slate-600 mb-6">Want to fast-track your AI journey?</p>
            <button
              onClick={() => window.open('https://topmate.io/khalidirfan/1622786', '_blank', 'noopener,noreferrer')}
              className="bg-brand-primary text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-sky-600 transition-all duration-150"
            >
              Book a 70-minute Clarity Call
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quiz" className="py-20 bg-brand-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-dark mb-3">
          Not sure where to start? Take the 3-minute AI readiness check.
        </h2>
        <p className="text-base text-slate-600 mb-6">
          Answer a few questions and I'll help you see where you are today and what a realistic 30–90 day plan can look like.
        </p>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Name *</label>
              <input
                type="text"
                required
                placeholder="e.g., John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-brand-primary placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Email *</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-brand-primary placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Role *</label>
              <input
                type="text"
                required
                placeholder="e.g., Software Engineer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-brand-primary placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Industry *</label>
              <input
                type="text"
                required
                placeholder="e.g., Healthcare, Finance, Education"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-brand-primary placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">Your primary goal right now? *</label>
            <div className="grid grid-cols-2 gap-3">
              {['Career shift', 'Upskill in current role', 'Process automation', 'Startup/entrepreneurship'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="goal"
                    value={option}
                    required
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="text-brand-primary focus:ring-brand-primary"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">Current AI tool confidence *</label>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 w-16">Beginner</span>
              <div className="flex gap-4 flex-1 justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} className="flex flex-col items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="confidence"
                      value={num}
                      required
                      onChange={(e) => setFormData({ ...formData, confidence: parseInt(e.target.value) })}
                      className="w-5 h-5 text-brand-primary focus:ring-brand-primary focus:ring-2 cursor-pointer"
                    />
                    <span className="text-xs text-slate-500 mt-1 group-hover:text-brand-primary transition-colors">{num}</span>
                  </label>
                ))}
              </div>
              <span className="text-xs text-slate-500 w-16 text-right">Advanced</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-150 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit & See Next Steps'}
          </button>
          <p className="text-xs text-slate-500">
            I'll keep your responses private and only use them to personalize your recommendations.
          </p>
        </form>
      </div>
    </section>
  )
}
