"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
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
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Thanks for subscribing!
          </h3>
          <p>You'll receive your first AI tactic on Monday.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Weekly AI Tactics
        </h2>
        <p className="text-xl mb-8 opacity-90">
          One practical AI tactic each week—ready to apply on Monday.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-md text-foreground focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button 
              type="submit"
              variant="secondary"
              disabled={!consent || isSubmitting}
              className="px-8"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          
          <label className="flex items-start space-x-2 text-sm opacity-90 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to receive weekly AI tactics and understand I can unsubscribe at any time.
            </span>
          </label>
        </form>
      </div>
    </section>
  )
}