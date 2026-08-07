export const PASSWORD_MIN_LENGTH = 8;

export type Credentials = {
    email: string;
    password: string;
};

export type CredentialsError =
    | "email-required"
    | "email-invalid"
    | "password-required"
    | "password-too-short";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    return EMAIL_PATTERN.test(email.trim());
}

export function isComplete(credentials: Credentials): boolean {
    return credentials.email.trim().length > 0 && credentials.password.length > 0;
}

export function validateCredentials(
    credentials: Credentials,
): CredentialsError | null {
    const email = credentials.email.trim();

    if (email.length === 0) {
        return "email-required";
    }
    if (!isValidEmail(email)) {
        return "email-invalid";
    }
    if (credentials.password.length === 0) {
        return "password-required";
    }
    if (credentials.password.length < PASSWORD_MIN_LENGTH) {
        return "password-too-short";
    }

    return null;
}
