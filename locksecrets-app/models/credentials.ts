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

export function isValidEmail(email: string): boolean {
    const trimmed = email.trim();

    if (trimmed.length === 0 || /\s/.test(trimmed)) {
        return false;
    }

    const at = trimmed.indexOf("@");

    if (at <= 0 || at !== trimmed.lastIndexOf("@")) {
        return false;
    }

    const labels = trimmed.slice(at + 1).split(".");

    return labels.length >= 2 && labels.every((label) => label.length > 0);
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
