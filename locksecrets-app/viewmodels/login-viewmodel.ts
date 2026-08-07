import type { CredentialsError } from "@/models/credentials";

export type LoginViewModel = {
    email: string;
    password: string;
    isPasswordVisible: boolean;
    error: CredentialsError | null;
    isSubmitting: boolean;
    canSubmit: boolean;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    togglePasswordVisibility: () => void;
    submit: () => Promise<void>;
    goToCreateAccount: () => void;
    goToRestore: () => void;
};
