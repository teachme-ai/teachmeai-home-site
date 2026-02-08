"use client"

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Send, User, Bot, Sparkles, CheckCircle2, Loader2, Mail, UserCircle, Briefcase, Target } from 'lucide-react'
import { QuizSpec, QUIZ_CONFIGS } from '../config/quiz-configs'
import HandoffInterstitial from './HandoffInterstitial'

interface CollectedData {
    name: string
    email: string
    role: string
    goal: string
    [key: string]: string
}

interface LeadFormProps {
    quizConfig?: QuizSpec
}

export function LeadForm({ quizConfig = QUIZ_CONFIGS.default }: LeadFormProps) {
    const [formData, setFormData] = useState<CollectedData>({
        name: '',
        email: '',
        role: '',
        goal: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showHandoffScreen, setShowHandoffScreen] = useState(false)
    const [redirectToken, setRedirectToken] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isLoading) return
        setError(null)

        // Validation
        if (!formData.name || !formData.email || !formData.role || !formData.goal) {
            setError('Please fill in all fields')
            return
        }

        setIsLoading(true)
        track('lead_form_submitted', formData)

        try {
            // 1. Trigger the email and handoff logic via the existing API
            // We simulate a "complete" chat turn to reuse existing stable logic
            const response = await fetch('/api/chat-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationHistory: [],
                    userMessage: "Form submission",
                    collectedData: formData
                })
            })

            if (!response.ok) throw new Error('Failed to submit form')
            const data = await response.json()

            if (data.isComplete) {
                setIsComplete(true)

                // Redirect to dedicated handoff page (v2.10 flow)
                if (data.token) {
                    const userEmail = String(formData.get('email') || '');
                    window.location.href = `/handoff?email=${encodeURIComponent(userEmail)}&token=${encodeURIComponent(data.token)}`;
                } else {
                    // Fallback: no token - something went wrong
                    throw new Error('No authentication token received');
                }
            } else {
                throw new Error('Data validation failed on server')
            }

        } catch (err: any) {
            console.error('Form error:', err)
            setError('Something went wrong. Please try again.')
            setIsLoading(false)
        }
    }

    const handleContinueToIntake = () => {
        if (redirectToken) {
            window.location.href = `https://intake.teachmeai.in?token=${redirectToken}`;
        }
    }

    // Show handoff interstitial if form is complete and handoff screen is active
    if (showHandoffScreen && redirectToken) {
        return (
            <HandoffInterstitial
                userName={formData.name || 'there'}
                userEmail={formData.email || ''}
                onContinue={handleContinueToIntake}
            />
        );
    }

    if (isComplete) {
        return (
            <div className="w-full max-w-2xl mx-auto animate-in zoom-in-95 fade-in duration-700">
                <div className="bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-200/60 rounded-3xl p-12 text-center shadow-xl shadow-emerald-500/5 relative overflow-hidden">
                    <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-emerald-50">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h4 className="text-3xl font-bold text-slate-800 mb-4">Excellent, you're all set!</h4>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Redirecting you to your personalized AI Diagnostic...
                    </p>
                    <div className="flex justify-center">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/90 rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-primary to-blue-600 p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" /> Start Your AI Analysis
                    </h3>
                    <p className="text-white/80 font-medium">Get a personalized AI roadmap in 30 seconds.</p>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <UserCircle className="w-4 h-4 text-brand-primary" /> Full Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none font-medium"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-brand-primary" /> Email Address
                        </label>
                        <input
                            required
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none font-medium"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* Role */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-brand-primary" /> Professional Role
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. Marketing Manager, Educator, Founder"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none font-medium"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                    />
                </div>

                {/* Goal */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Target className="w-4 h-4 text-brand-primary" /> Primary AI Goal
                    </label>
                    <textarea
                        required
                        placeholder="What do you want to achieve with AI?"
                        rows={3}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none font-medium resize-none"
                        value={formData.goal}
                        onChange={e => setFormData({ ...formData, goal: e.target.value })}
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-bold animate-pulse">{error}</p>
                )}

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-slate-300"
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <>
                            Get My Free Analysis <Send className="w-5 h-5" />
                        </>
                    )}
                </button>

                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                    Your privacy matters. No spam, just value.
                </p>
            </form>
        </div>
    )
}
