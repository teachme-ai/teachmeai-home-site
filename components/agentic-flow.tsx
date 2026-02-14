
"use client";

import Image from "next/image";

export function AgenticFlow() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            {/* Image Container */}
            <div className="relative w-full h-[500px] mb-0 rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 bg-slate-50">
                <Image
                    src="/images/agenticflow_teachmeai.png"
                    alt="TeachMeAI Agentic Diagnosis Flow"
                    fill
                    className="object-contain p-2"
                    quality={95}
                />
            </div>
        </div>
    );
}
