import { fireEvent, render, screen } from "@testing-library/react-native";

import type { LoginViewModel } from "@/viewmodels/login-viewmodel";
import { LoginView } from "@/views/login-view";

function stubViewModel(overrides: Partial<LoginViewModel> = {}): LoginViewModel {
    return {
        email: "",
        password: "",
        isPasswordVisible: false,
        error: null,
        isSubmitting: false,
        canSubmit: false,
        setEmail: jest.fn(),
        setPassword: jest.fn(),
        togglePasswordVisibility: jest.fn(),
        submit: jest.fn(async () => {}),
        goToCreateAccount: jest.fn(),
        goToRestore: jest.fn(),
        ...overrides,
    };
}

async function renderLogin(overrides: Partial<LoginViewModel> = {}) {
    const vm = stubViewModel(overrides);
    await render(<LoginView {...vm} />);

    return vm;
}

describe("LoginView", () => {
    it("renders the values it was given", async () => {
        await renderLogin({ email: "me@example.com", password: "hunter2" });

        expect(screen.getByLabelText("Email")).toHaveDisplayValue(
            "me@example.com",
        );
        expect(screen.getByLabelText("Password")).toHaveDisplayValue("hunter2");
    });

    it("translates an error code into copy", async () => {
        await renderLogin({ error: "invalid-credentials" });

        expect(
            screen.getByText("Email or password is incorrect."),
        ).toBeOnTheScreen();
    });

    it("renders no error row when there is no error", async () => {
        await renderLogin();

        expect(
            screen.queryByText("Email or password is incorrect."),
        ).not.toBeOnTheScreen();
    });

    it("reports typing through the ViewModel's setters", async () => {
        const vm = await renderLogin();

        await fireEvent.changeText(screen.getByLabelText("Email"), "a@b.co");
        await fireEvent.changeText(
            screen.getByLabelText("Password"),
            "hunter2",
        );

        expect(vm.setEmail).toHaveBeenCalledWith("a@b.co");
        expect(vm.setPassword).toHaveBeenCalledWith("hunter2");
    });

    it("masks the password and only asks the ViewModel to reveal it", async () => {
        const vm = await renderLogin();

        expect(screen.getByLabelText("Password")).toHaveProp(
            "secureTextEntry",
            true,
        );

        await fireEvent.press(screen.getByLabelText("Show password"));

        expect(vm.togglePasswordVisibility).toHaveBeenCalledTimes(1);
        expect(screen.getByLabelText("Password")).toHaveProp(
            "secureTextEntry",
            true,
        );
    });

    it("unmasks only when the ViewModel says so", async () => {
        await renderLogin({ isPasswordVisible: true });

        expect(screen.getByLabelText("Password")).toHaveProp(
            "secureTextEntry",
            false,
        );
        expect(screen.getByLabelText("Hide password")).toBeOnTheScreen();
    });

    it("does not submit while canSubmit is false", async () => {
        const vm = await renderLogin({ canSubmit: false });

        expect(screen.getByLabelText("Unlock vault")).toBeDisabled();

        await fireEvent.press(screen.getByLabelText("Unlock vault"));

        expect(vm.submit).not.toHaveBeenCalled();
    });

    it("submits when canSubmit is true", async () => {
        const vm = await renderLogin({ canSubmit: true });

        await fireEvent.press(screen.getByLabelText("Unlock vault"));

        expect(vm.submit).toHaveBeenCalledTimes(1);
    });

    it("marks the button busy while submitting", async () => {
        await renderLogin({ canSubmit: false, isSubmitting: true });

        expect(screen.getByLabelText("Unlock vault")).toBeBusy();
        expect(screen.getByLabelText("Unlock vault")).toBeDisabled();
    });

    it("routes the secondary actions", async () => {
        const vm = await renderLogin();

        await fireEvent.press(screen.getByLabelText("Create Account"));
        await fireEvent.press(
            screen.getByText("Forgot password? Restore by email"),
        );

        expect(vm.goToCreateAccount).toHaveBeenCalledTimes(1);
        expect(vm.goToRestore).toHaveBeenCalledTimes(1);
    });
});
