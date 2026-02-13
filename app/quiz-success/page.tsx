import Link from 'next/link'
import { CheckCircle2, Mail, ArrowRight, Bot, Sparkles } from 'lucide-react'

export default function QuizSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-primary to-blue-600 p-8 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-xl">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Details Received!</h1>
                        <p className="text-white/80 font-medium">Your AI Skills Diagnostic is ready for evaluation.</p>
                    </div>

                    {/* Decorative Patterns */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl" />
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <div className="space-y-6 mb-8">
                        <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col items-center gap-4 text-center">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                <Mail className="w-6 h-6 text-brand-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">Check Your Inbox</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    We've sent an email with a unique link to your <span className="text-brand-primary font-bold">Personalized AI Evaluation</span>.
                                    Please click the link in that email to complete the final agent-driven assessment.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-left p-4 rounded-2xl border border-slate-100 bg-slate-50/30">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
                                <p className="text-sm font-semibold text-slate-700">Agentic evaluation takes ~5 minutes to generate.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 active:scale-[0.98]"
                        >
                            Return to Home <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-2">
                            <Sparkles className="w-3 h-3 inline-block mr-1 mb-0.5" /> teachmeai Precision Diagnostic
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
