
import { ChatQuiz } from "@/components/chat-quiz"
import { QUIZ_CONFIGS } from "@/config/quiz-configs"

export default function TestHandoffPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Test Handoff Flow (Educator Persona)</h1>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
                    <p className="font-bold">Test Mode</p>
                    <p>This quiz uses the <strong>educator_k12</strong> config. Completing it should redirect you to the Intake App.</p>
                </div>
                <ChatQuiz quizConfig={QUIZ_CONFIGS.educator_k12} />
            </div>
        </main>
    )
}
