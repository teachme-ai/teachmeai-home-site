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
        <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-brand-dark mb-2">Thanks for subscribing!</h3>
          <p className="text-sm text-slate-600">You'll receive your first AI tactic on Monday.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-brand-dark mb-2">
          Get one practical AI tactic each week.
        </h2>
        <p className="text-sm text-slate-800 font-medium mb-5 leading-relaxed">
          Short, actionable emails on using AI in your work, classroom, or projects. No spam, no hype.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-brand-primary font-bold text-slate-900 placeholder:text-slate-500"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-primary text-white text-sm font-bold py-2.5 px-5 rounded-lg hover:bg-sky-800 transition-all duration-150 disabled:opacity-50 shadow-md"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <p className="text-xs text-slate-600 font-bold mt-3">
          You can unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
