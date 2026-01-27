
export interface QuizQuestion {
    id: string;
    text: string;
    type: 'text' | 'choice';
    options?: string[]; // Only for 'choice'
    required: boolean;
    field: string; // The field name in the extractedData (e.g., 'role', 'goal')
    placeholder?: string;
}

export interface QuizSpec {
    id: string; // e.g. 'educator_k12'
    displayName: string;
    description: string;
    initialMessage: string;
    systemPromptContext: string; // Specific context for the AI agent
    questions: QuizQuestion[];
    handoffEnabled?: boolean;
    landingPageId?: string;
}

export const QUIZ_CONFIGS: Record<string, QuizSpec> = {
    // Default / General Quiz (No redirect, just email)
    'default': {
        id: 'default',
        displayName: 'General Assessment',
        description: 'Find out how AI can help you specifically.',
        initialMessage: "Hi! I'm your AI Guide. I'm here to help you find the best way to use AI for your specific needs. To start, could you tell me your name?",
        systemPromptContext: "You are a helpful AI Guide for TeachMeAI. Your goal is to understand the user's needs generally.",
        handoffEnabled: true,
        landingPageId: 'general-lead-form',
        questions: [
            { id: 'q_name', text: "Could you tell me your name?", type: 'text', required: true, field: 'name', placeholder: "Your Name" },
            { id: 'q_role', text: "What is your professional role?", type: 'text', required: true, field: 'role', placeholder: "e.g. Marketing Manager" },
            { id: 'q_goal', text: "What is your main goal with AI?", type: 'text', required: true, field: 'learningGoal', placeholder: "e.g. Automate reporting" },
            { id: 'q_email', text: "To send your report, what is your email?", type: 'text', required: true, field: 'email', placeholder: "name@company.com" }
        ]
    },

    // Educator (K-12) Persona (Redirect to Intake)
    'educator_k12': {
        id: 'educator_k12',
        displayName: 'Teacher Assessment',
        description: 'AI tools tailored for the classroom.',
        initialMessage: "Hello! Using AI in education is a game changer. Let's find the best tools for your classroom. What's your name?",
        systemPromptContext: "You are an Education Specialist AI. Focus on K-12 classroom needs, grading, and student engagement.",
        handoffEnabled: true,
        landingPageId: 'educator-k12-lp',
        questions: [
            { id: 'q_name', text: "What is your name?", type: 'text', required: true, field: 'name' },
            { id: 'q_role', text: "What grade level or subject do you teach?", type: 'text', required: true, field: 'role', placeholder: "e.g. 5th Grade Math" },
            { id: 'q_goal', text: "What's your biggest challenge in the classroom right now?", type: 'text', required: true, field: 'learningGoal', placeholder: "e.g. Grading time, differentiated instruction" },
            { id: 'q_email', text: "Where should I send your customized Education AI guide?", type: 'text', required: true, field: 'email' }
        ]
    },

    // Sales (B2B) Persona (Redirect to Intake)
    'sales_b2b': {
        id: 'sales_b2b',
        displayName: 'Sales AI Audit',
        description: 'Accelerate your pipeline with AI.',
        initialMessage: "Hi there. Ready to close more deals with AI? Let's build your profile. First, what's your name?",
        systemPromptContext: "You are a Sales Enablement Expert. Focus on B2B pipeline, CRM automation, and outreach.",
        handoffEnabled: true,
        landingPageId: 'sales-b2b-lp',
        questions: [
            { id: 'q_name', text: "What is your name?", type: 'text', required: true, field: 'name' },
            { id: 'q_role', text: "What is your specific sales role?", type: 'text', required: true, field: 'role', placeholder: "e.g. SDR, AE, VP of Sales" },
            { id: 'q_goal', text: "Where is the biggest bottleneck in your sales process?", type: 'text', required: true, field: 'learningGoal', placeholder: "e.g. Lead qualification, follow-ups" },
            { id: 'q_email', text: "Where should I send your Sales AI Action Plan?", type: 'text', required: true, field: 'email' }
        ]
    }
};
