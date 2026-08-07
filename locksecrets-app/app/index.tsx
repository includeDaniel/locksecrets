import { LoginView } from "@/views/login-view";
import type { LoginViewModel } from "@/viewmodels/login-viewmodel";

const noop = () => {};

const FAKE_VIEW_MODEL: LoginViewModel = {
    email: "me@example.com",
    password: "hunter2",
    isPasswordVisible: false,
    error: null,
    isSubmitting: false,
    canSubmit: true,
    setEmail: noop,
    setPassword: noop,
    togglePasswordVisibility: noop,
    submit: async () => {},
    goToCreateAccount: noop,
    goToRestore: noop,
};

export default function Index() {
    return <LoginView {...FAKE_VIEW_MODEL} />;
}
