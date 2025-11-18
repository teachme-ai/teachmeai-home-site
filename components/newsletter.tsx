"use client"

import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-brand-dark mb-2">Thanks for subscribing!</h3>
          <p className="text-sm text-slate-600">You'll receive your first AI tactic on Monday.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-brand-dark mb-2">
          Get one practical AI tactic each week.
        </h2>
        <p className="text-sm text-slate-600 mb-5">
          Short, actionable emails on using AI in your work, classroom, or projects. No spam, no hype.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-brand-primary"
            placeholder="Enter your email"
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-primary text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:bg-sky-600 transition-all duration-150 disabled:opacity-50"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-2">
          You can unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
