import { z } from 'zod';

export const PsychographicProfileSchema = z.object({
    decision_style: z.enum(['intuitive', 'analytical', 'hybrid'])
        .describe("Does the user decide based on gut feeling/FOMO or data/optimization?"),

    uncertainty_handling: z.enum(['paralyzed', 'cautious', 'experimenter'])
        .describe("How do they act when tools/paths are unclear?"),

    change_preference: z.number().min(1).max(10)
        .describe("1 = Safety/Stability (optimize current role), 10 = Radical Change (career pivot)"),

    social_entanglement: z.enum(['solitary', 'socially_driven'])
        .describe("Do they mention team, boss, peers, or community in their challenge?"),

    cognitive_load_tolerance: z.enum(['low', 'medium', 'high'])
        .describe(" inferred from time_available vs tech_confidence. Low = needs simple steps."),

    analysis_reasoning: z.string()
        .describe("Brief explanation of why these scores were assigned based on user text.")
});

export type PsychographicProfile = z.infer<typeof PsychographicProfileSchema>;