
"use client";

import Image from "next/image";

export function AgenticFlow() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            {/* Image Container */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-12 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60">
                <Image
                    src="/images/agenticflow_teachmeai.png"
                    alt="TeachMeAI Agentic Diagnosis Flow"
                    fill
                    className="object-cover"
                    quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
            </div>

            {/* Text Content */}
            <div className="space-y-6 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
                    How It Works
                </h3>

                <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                    <p>
                        Your journey begins with a quick 30-second AI diagnostic to capture your role and primary goal.
                        From there, you enter a private, guided session powered by our <span className="text-brand-primary font-semibold">sequential multi-agent system</span>.
                    </p>

                    <p>
                        Four specialized agents — <strong className="text-slate-800">The Guide</strong>, <strong className="text-slate-800">The Profiler</strong>, <strong className="text-slate-800">The Strategist</strong>, and <strong className="text-slate-800">The Tactician</strong> — work together to understand how you learn, where you’re headed professionally, and what constraints you operate within.
                    </p>

                    <p>
                        The result is a <strong className="text-brand-dark">personalized AI roadmap</strong> grounded in your psychology, career direction, and real-world schedule. This roadmap becomes the foundation of our 1:1 mentoring conversation — ensuring we begin with clarity, not guesswork, and build momentum from day one.
                    </p>
                </div>
            </div>
        </div>
    );
}
