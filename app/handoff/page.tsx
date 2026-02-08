'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, Sparkles, Mail, ArrowRight, MessageCircle, Target, Lightbulb } from 'lucide-react';

export default function HandoffPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || '';

    const [countdown, setCountdown] = useState(15);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleContinue();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - (100 / 150);
                return newProgress < 0 ? 0 : newProgress;
            });
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContinue = () => {
        if (token) {
            window.location.href = `https://intake.teachmeai.in?token=${token}`;
        } else {
            window.location.href = 'https://intake.teachmeai.in';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="h-1.5 bg-gray-100 relative overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-10">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/logo.png"
                            alt="TeachMeAI"
                            width={180}
                            height={60}
                            className="h-16 w-auto"
                            priority
                        />
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2.5 rounded-full text-sm font-bold">
                            <CheckCircle className="w-5 h-5" />
                            Quiz Complete!
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
                        Great Work! Ready for the Next Step
                    </h1>

                    <p className="text-center text-gray-600 mb-6 leading-relaxed">
                        You&apos;ll now enter our <span className="font-bold text-indigo-600">1:1 AI Consulting Mode</span> where our intelligent agents will have a personalized conversation with you.
                    </p>

                    {email && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 mb-1">Email Sent!</h3>
                                <p className="text-sm text-blue-800">
                                    We&apos;ve sent a custom link to <span className="font-bold">{email}</span> so you can continue this diagnostic later if needed.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-indigo-600" />
                            What Happens Next
                        </h2>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MessageCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Conversational AI Chat</p>
                                    <p className="text-sm text-gray-600">Our agents will ask targeted questions to understand your unique situation</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Deep Personalization</p>
                                    <p className="text-sm text-gray-600">We&apos;ll analyze your learning goals, current skills, constraints, and preferred style</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Comprehensive AI Profile</p>
                                    <p className="text-sm text-gray-600">Receive a rich analysis with strategic insights, opportunities, and a custom IMPACT plan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleContinue}
                        className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group mb-3"
                    >
                        <Sparkles className="w-6 h-6" />
                        Continue to AI Chat
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Automatically redirecting in <span className="font-bold text-indigo-600">{countdown}</span> seconds...
                    </p>
                </div>
            </div>
        </div>
    );
}
