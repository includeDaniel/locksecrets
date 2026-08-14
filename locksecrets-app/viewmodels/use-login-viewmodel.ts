import { useState } from "react";

import { isComplete, validateCredentials } from "@/models/credentials";
import type { Credentials } from "@/models/credentials";
import { signIn } from "@/services/auth-service";
import type { LoginError, LoginViewModel } from "@/viewmodels/login-viewmodel";

export type LoginViewModelDeps = {
    onAuthenticated: () => void;
    onCreateAccount: () => void;
    onRestore: () => void;
};

export function useLoginViewModel({
    onAuthenticated,
    onCreateAccount,
    onRestore,
}: LoginViewModelDeps): LoginViewModel {
    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState<LoginError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const credentials: Credentials = { email, password };

    function setEmail(value: string) {
        setEmailValue(value);
        setError(null);
    }

    function setPassword(value: string) {
        setPasswordValue(value);
        setError(null);
    }

    function togglePasswordVisibility() {
        setIsPasswordVisible((visible) => !visible);
    }

    async function submit() {
        if (isSubmitting) {
            return;
        }

        const invalid = validateCredentials(credentials);

        if (invalid !== null) {
            setError(invalid);
            return;
        }

        setError(null);
        setIsSubmitting(true);

        const result = await signIn(credentials);

        setIsSubmitting(false);

        if (result.ok) {
            onAuthenticated();
            return;
        }

        setError(result.reason);
    }

    return {
        email,
        password,
        isPasswordVisible,
        error,
        isSubmitting,
        canSubmit: isComplete(credentials) && !isSubmitting,
        setEmail,
        setPassword,
        togglePasswordVisibility,
        submit,
        goToCreateAccount: onCreateAccount,
        goToRestore: onRestore,
    };
}
