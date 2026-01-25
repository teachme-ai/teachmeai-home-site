"use client"

import { useState, useRef, useEffect } from 'react'
import { track } from '@vercel/analytics'

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
}

export function ChatQuiz({ onComplete }: ChatQuizProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi there! 👋 I'm TeachMeAI's AI assistant. I'll ask you a few quick questions to understand your AI learning goals.\n\nThis should take about 2-3 minutes. Ready to start?",
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [collectedData, setCollectedData] = useState<CollectedData>({})
    const [isComplete, setIsComplete] = useState(false)
    const [showQuickReplies, setShowQuickReplies] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        track('chatquiz_started')
    }, [])

    const generateId = () => Math.random().toString(36).substring(7)

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim() || isComplete) return

        setShowQuickReplies(false)

        // Add user message to UI
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
            // Call API route for AI response
            const response = await fetch('/api/chat-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationHistory: messages,
                    userMessage,
                    collectedData
                })
            })

            if (!response.ok) throw new Error('Failed to get AI response')

            const data = await response.json()

            // Add AI message to UI
            setMessages(prev => [...prev, {
                id: generateId(),
                role: 'assistant',
                content: data.message,
                timestamp: new Date()
            }])

            // Update collected data
            if (data.dataCollected) {
                setCollectedData(data.dataCollected)
            }

            // Check if complete
            if (data.isComplete) {
                setIsComplete(true)
                track('chatquiz_completed', data.dataCollected)
                onComplete?.(data.dataCollected)
            }

        } catch (error) {
            console.error('Chat error:', error)
            setMessages(prev => [...prev, {
                id: generateId(),
                role: 'assistant',
                content: "Sorry, I encountered an error. Please try again or refresh the page.",
                timestamp: new Date()
            }])
            track('chatquiz_error', {
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickReply = (reply: string) => {
        sendMessage(reply)
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary to-sky-500 p-4">
                <h3 className="text-white font-semibold text-lg">AI Learning Assistant</h3>
                <p className="text-sky-100 text-sm">Quick chat to understand your goals</p>
            </div>

            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                                }`}
                        >
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                            <span className={`text-xs mt-1 block ${msg.role === 'user' ? 'text-sky-100' : 'text-slate-400'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-slate-800 border border-slate-200 shadow-sm rounded-2xl px-4 py-3">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Replies (shown on first message only) */}
                {showQuickReplies && messages.length === 1 && !isLoading && (
                    <div className="flex justify-start">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleQuickReply("Yes, let's go!")}
                                className="bg-white hover:bg-slate-50 text-brand-primary border-2 border-brand-primary font-medium px-4 py-2 rounded-full text-sm transition-all duration-150"
                            >
                                Yes, let's go! 🚀
                            </button>
                            <button
                                onClick={() => handleQuickReply("I have questions first")}
                                className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 px-4 py-2 rounded-full text-sm transition-all duration-150"
                            >
                                I have questions first
                            </button>
                        </div>
                    </div>
                )}

                {/* Completion State */}
                {isComplete && (
                    <div className="flex justify-center">
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-6 py-4 text-center max-w-md">
                            <div className="text-4xl mb-2">✅</div>
                            <p className="text-green-800 font-semibold mb-2">Perfect! Check your email</p>
                            <p className="text-green-700 text-sm">
                                I've just sent you a personalized link to complete your AI learning profile.
                                <br />
                                <span className="text-xs text-green-600 mt-2 block">
                                    (Check your spam folder if you don't see it in a minute)
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                sendMessage(input)
                            }
                        }}
                        placeholder={isComplete ? "Conversation complete ✅" : "Type your message..."}
                        disabled={isComplete || isLoading}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isComplete || isLoading}
                        className="bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold px-6 py-3 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="inline-block animate-spin">⏳</span>
                        ) : (
                            <span>Send</span>
                        )}
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                    Press Enter to send • Your data is secure and never shared
                </p>
            </div>
        </div>
    )
}
