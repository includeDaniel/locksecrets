import type { Credentials } from "@/models/credentials";

export type SignInResult = { ok: true } | { ok: false; reason: "invalid-credentials" };

// Placeholder until Module 8 replaces this with a real SecureStore-backed vault.
const DEMO_EMAIL = "me@example.com";
const DEMO_PASSWORD = "opensesame";
const NETWORK_DELAY_MS = 700;

export async function signIn(credentials: Credentials): Promise<SignInResult> {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));

    const matches =
        credentials.email.trim().toLowerCase() === DEMO_EMAIL &&
        credentials.password === DEMO_PASSWORD;

    return matches ? { ok: true } : { ok: false, reason: "invalid-credentials" };
}
