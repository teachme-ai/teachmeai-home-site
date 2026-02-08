export function validateEnv() {
    if (typeof window !== "undefined") return; // Skip on client side

    const required = [
        { key: "JWT_SECRET", minLength: 32 },
        { key: "RESEND_API_KEY", minLength: 10 },
    ];

    const missing: string[] = [];

    for (const item of required) {
        const value = process.env[item.key];
        if (!value) {
            missing.push(`${item.key} is missing`);
            continue;
        }
        if (value.length < item.minLength) {
            missing.push(`${item.key} is too short (min ${item.minLength} chars)`);
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `CRITICAL: Environment validation failed.\n${missing.join("\n")}`
        );
    }
}
