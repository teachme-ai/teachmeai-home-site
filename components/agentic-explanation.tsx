"use client";

import Image from "next/image";

export function AgenticExplanation() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6 text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
                How It Works
            </h3>

            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                    Your journey begins with a quick 30-second AI diagnostic to capture your role and primary goal. From there, you enter a private, guided session powered by our <span className="text-brand-primary font-semibold">sequential multi-agent system</span>.
                </p>

                <p>
                    This agentic chat will take 3-5 minutes of your time but will deliver a brilliant, agentic-driven analysis revealing your learning DNA.
                </p>

                <p>
                    The result is a <strong className="text-brand-dark">personalized AI roadmap</strong> grounded in your psychology, career direction, and real-world schedule. This roadmap becomes the foundation of our 1:1 mentoring conversation — ensuring we begin with clarity, not guesswork, and build momentum from day one.
                </p>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                    src="/images/flows_teachmeai.jpg"
                    alt="TeachMeAI Coaching Flow"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
}
