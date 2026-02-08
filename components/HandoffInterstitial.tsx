'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, Mail, ArrowRight } from 'lucide-react';

interface HandoffInterstitialProps {
    userName: string;
    userEmail: string;
    onContinue: () => void;
}

export default function HandoffInterstitial({ userName, userEmail, onContinue }: HandoffInterstitialProps) {
    const [countdown, setCountdown] = useState(10);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onContinue();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Progress bar animation
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - (100 / 100); // 10 seconds = 100 intervals of 100ms
                return newProgress < 0 ? 0 : newProgress;
            });
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        };
    }, [onContinue]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-100 relative overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-12">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        Great! Let's Build Your AI Learning Profile
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-center text-gray-600 mb-8 leading-relaxed">
                        You'll now chat with our AI agents to understand your learning style and preferences.
                        At the end, you'll receive a rich analysis of your unique AI learning profile.
                    </p>

                    {/* Email Confirmation Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-blue-900 mb-1">Email Sent!</h3>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                We've sent a custom link to <span className="font-bold">{userEmail}</span> so you can
                                continue this diagnostic later if needed.
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onContinue}
                        className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg px-8 py-5 rounded-2xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group mb-4"
                    >
                        <Sparkles className="w-6 h-6" />
                        Continue Chat with AI Agents
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Auto-redirect notice */}
                    <p className="text-center text-sm text-gray-500">
                        Automatically redirecting in <span className="font-bold text-indigo-600">{countdown}</span> seconds...
                    </p>
                </div>
            </div>
        </div>
    );
}
