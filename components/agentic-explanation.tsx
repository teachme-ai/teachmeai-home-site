"use client";

import Image from "next/image";

export function AgenticExplanation() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8 text-left">
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark">
                How it works
            </h3>
            <p className="text-xl text-slate-600 font-medium">Get a personalized AI roadmap grounded in your career direction in just a few minutes.</p>

            <div className="space-y-6 mt-4">
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold shrink-0 mt-1">1</div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-800">Quick Context</h4>
                        <p className="text-slate-600 font-medium leading-relaxed mt-1">Fill out the basic details on the right so the AI understands your professional background and goals.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold shrink-0 mt-1">2</div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-800">Meet Your AI Coach</h4>
                        <p className="text-slate-600 font-medium leading-relaxed mt-1">You'll immediately jump into a 3-minute, highly interactive diagnostic chat with our multi-agent system.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold shrink-0 mt-1">3</div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-800">Get Your Roadmap</h4>
                        <p className="text-slate-600 font-medium leading-relaxed mt-1">Instantly receive a personalized breakdown of your learning DNA and a clear path forward.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
