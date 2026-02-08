"use client"

import { useState, useRef, useEffect } from 'react'
import { track } from '@vercel/analytics'
import { Send, User, Bot, Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import { QuizSpec, QUIZ_CONFIGS } from '../config/quiz-configs'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

interface CollectedData {
    name?: string
    email?: string
    role?: string
    goal?: string
    challenge?: string
}

interface ChatQuizProps {
    onComplete?: (data: CollectedData) => void
    quizConfig?: QuizSpec
}

export function ChatQuiz({ onComplete, quizConfig = QUIZ_CONFIGS.default }: ChatQuizProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: quizConfig.initialMessage,
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [collectedData, setCollectedData] = useState<CollectedData>({})
    const [isComplete, setIsComplete] = useState(false)
    const [showQuickReplies, setShowQuickReplies] = useState(true)
    const [hasMounted, setHasMounted] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        setHasMounted(true)
        if (messages.length > 1) {
            scrollToBottom()
        }
    }, [messages, isLoading])

    useEffect(() => {
        track('chatquiz_started')
    }, [])

    const generateId = () => Math.random().toString(36).substring(7)

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim() || isComplete || isLoading) return

        setShowQuickReplies(false)

        const userMsg: Message = {
            id: generateId(),
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        track('chatquiz_message_sent', {
            messageCount: messages.length + 1
        })

        try {
            const response = await fetch('/api/chat-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationHistory: [...messages, userMsg],
                    userMessage,
                    collectedData
                })
            })

            if (!response.ok) throw new Error('Failed to get AI response')

            const data = await response.json()

            setMessages(prev => [...prev, {
                id: generateId(),
                role: 'assistant',
                content: data.message,
                timestamp: new Date()
            }])

            if (data.dataCollected) {
                setCollectedData(prev => ({ ...prev, ...data.dataCollected }))
            }

            if (data.isComplete) {
                setIsComplete(true)
                track('chatquiz_completed', data.dataCollected)
                onComplete?.(data.dataCollected)

                // Handoff Logic
                if (quizConfig.handoffEnabled) {
                    setIsLoading(true); // Show loader while redirecting
                    try {
                        // Prepare generic transcript
                        const answers_raw = messages.map(m => ({ role: m.role, content: m.content }));
                        answers_raw.push({ role: 'user', content: userMessage }); // Add last message

                        // Hybrid Redirect - Direct to Intake App
                        if (data.token) {
                            // DEV OVERRIDE: Use localhost:3001 for testing
                            // window.location.href = `http://localhost:3001?token=${data.token}`;
                            window.location.href = `https://intake.teachmeai.in?token=${data.token}`;
                            return; // Stop further execution
                        }

                        // Fallback Handoff Proxy (Legacy)
                        const handoffPayload = {
                            persona_id: quizConfig.id,
                            landing_page_id: quizConfig.landingPageId || 'unknown',
                            quiz_version: '1.0.0',
                            answers_raw,
                            contact_info: {
                                name: data.dataCollected.name || 'Unknown',
                                email: data.dataCollected.email || 'unknown'
                            },
                            attribution: {
                                referrer: document.referrer
                            }
                        };

                        const handoffRes = await fetch('/api/handoff-proxy', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(handoffPayload)
                        });

                        const handoffData = await handoffRes.json();
                        if (handoffData.redirect_url) {
                            window.location.href = handoffData.redirect_url;
                        } else {
                            console.error('Handoff failed, no redirect URL');
                            setIsLoading(false);
                        }

                    } catch (e) {
                        console.error('Handoff error:', e);
                        setIsLoading(false);
                    }
                }
            }

        } catch (error) {
            console.error('Chat error:', error)
            setMessages(prev => [...prev, {
                id: generateId(),
                role: 'assistant',
                content: "I'm having a bit of trouble connecting to my brain! Could you try again or refresh the page?",
                timestamp: new Date()
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickReply = (reply: string) => {
        sendMessage(reply)
    }

    return (
        <div className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col h-[650px]">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary via-blue-600 to-brand-primary p-6 flex items-center justify-between shadow-md relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-xl tracking-tight">AI Skills Diagnostic</h3>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Online Assistant</p>
                        </div>
                    </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-xl" />
            </div>

            {/* Messages Container */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
            >
                {messages.map((msg, idx) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 w-full animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both ${msg.role === 'user' ? 'flex-row-reverse' : 'justify-start'}`}
                        style={{ animationDelay: `${(idx % 5) * 100}ms` }}
                    >
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user'
                            ? 'bg-brand-primary/10 border border-brand-primary/20'
                            : 'bg-white border border-slate-200'
                            }`}>
                            {msg.role === 'user' ? (
                                <User className="w-4 h-4 text-brand-primary" />
                            ) : (
                                <Bot className="w-4 h-4 text-slate-600" />
                            )}
                        </div>

                        {/* Message Bubble */}
                        <div
                            className={`relative group max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm transition-all duration-200 ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-brand-primary to-blue-600 text-white rounded-tr-none'
                                : 'bg-white text-slate-700 border border-slate-200/80 rounded-tl-none hover:shadow-md'
                                }`}
                        >
                            <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{msg.content}</p>
                            {hasMounted && (
                                <div className={`flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <span className={`text-[10px] uppercase font-bold tracking-tighter ${msg.role === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            )}

                            {/* Speech Bubble Tail - Visual only, modern UI often skips this but we'll add a subtle hint */}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                    <div className="flex justify-start items-center gap-3 animate-in fade-in duration-300">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-sm">
                            <Bot className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-2xl rounded-tl-none px-5 py-3.5">
                            <div className="flex space-x-1.5 items-center">
                                <div className="w-1.5 h-1.5 bg-brand-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1.5 h-1.5 bg-brand-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1.5 h-1.5 bg-brand-primary/60 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Replies */}
                {showQuickReplies && messages.length === 1 && !isLoading && (
                    <div className="flex flex-col items-center gap-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
                        <div className="h-px w-24 bg-slate-200" />
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => handleQuickReply("Yes, let's go!")}
                                className="group relative bg-brand-primary hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl text-base shadow-lg shadow-brand-primary/20 transition-all duration-300 active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Yes, let's go! <Sparkles className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            </button>
                            <button
                                onClick={() => handleQuickReply("I have questions first")}
                                className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-300/80 font-bold px-8 py-3.5 rounded-2xl text-base shadow-sm transition-all duration-300 active:scale-95"
                            >
                                Not yet
                            </button>
                        </div>
                    </div>
                )}

                {/* Completion State */}
                {isComplete && (
                    <div className="py-8 px-4 animate-in zoom-in-95 fade-in duration-700">
                        <div className="bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-200/60 rounded-3xl p-8 text-center shadow-xl shadow-emerald-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <CheckCircle2 className="w-24 h-24 text-emerald-500" />
                            </div>

                            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-emerald-50">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                            </div>

                            <h4 className="text-2xl font-bold text-slate-800 mb-3">Excellent, you're all set!</h4>
                            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                                I've sent your personalized intake link to <span className="text-brand-primary font-bold underline decoration-brand-primary/30 underline-offset-4">{collectedData.email}</span>.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                                <div className="bg-white/60 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-left">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
                                        <p className="text-sm font-bold text-slate-700">Check Inbox</p>
                                    </div>
                                </div>
                                <div className="bg-white/60 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-left">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rewards</p>
                                        <p className="text-sm font-bold text-slate-700">AI Readiness Report</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
                <div className="flex gap-3 relative max-w-screen-md mx-auto">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            value={input}
                            maxLength={500}
                            onChange={(e) => setInput(e.target.value.slice(0, 500))}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    sendMessage(input)
                                }
                            }}
                            placeholder={isComplete ? "Diagnostic complete ✅" : "Type your message here..."}
                            disabled={isComplete || isLoading}
                            className="w-full pl-5 pr-20 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 disabled:bg-slate-100/50 disabled:cursor-not-allowed font-medium text-slate-700 placeholder:text-slate-400"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                            <span className={`text-[10px] font-bold ${input.length >= 450 ? 'text-red-500' : 'text-slate-300'}`}>
                                {input.length}/500
                            </span>
                            <div className={`w-1.5 h-1.5 rounded-full ${input.trim() ? "bg-brand-primary" : "bg-slate-300"} transition-colors`} />
                        </div>
                    </div>
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isComplete || isLoading}
                        className="p-4 bg-brand-primary hover:bg-blue-600 disabled:bg-slate-200 text-white rounded-2xl transition-all duration-300 active:scale-90 shadow-lg shadow-brand-primary/10 disabled:shadow-none group"
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send className={`w-6 h-6 ${input.trim() ? "scale-110 translate-x-0.5 -translate-y-0.5" : ""} transition-transform`} />
                        )}
                    </button>
                </div>
                {!isComplete && (
                    <p className="text-[10px] text-slate-400 mt-3 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Powered by Gemini 2.5 Flash
                    </p>
                )}
            </div>
        </div>
    )
}

