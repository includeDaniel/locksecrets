import { act, renderHook, waitFor } from "@testing-library/react-native";

import { signIn } from "@/services/auth-service";
import type { SignInResult } from "@/services/auth-service";
import { useLoginViewModel } from "@/viewmodels/use-login-viewmodel";
import type { LoginViewModelDeps } from "@/viewmodels/use-login-viewmodel";

jest.mock("@/services/auth-service");

const signInMock = jest.mocked(signIn);

const VALID_EMAIL = "me@example.com";
const VALID_PASSWORD = "opensesame";

async function renderLoginViewModel(overrides: Partial<LoginViewModelDeps> = {}) {
    const deps: LoginViewModelDeps = {
        onAuthenticated: jest.fn(),
        onCreateAccount: jest.fn(),
        onRestore: jest.fn(),
        ...overrides,
    };

    const { result } = await renderHook(() => useLoginViewModel(deps));

    return { result, deps };
}

function deferSignIn() {
    let resolve!: (result: SignInResult) => void;
    signInMock.mockReturnValue(
        new Promise<SignInResult>((r) => {
            resolve = r;
        }),
    );

    return resolve;
}

beforeEach(() => {
    jest.clearAllMocks();
    signInMock.mockResolvedValue({ ok: true });
});

describe("initial state", () => {
    it("starts empty, idle and not submittable", async () => {
        const { result } = await renderLoginViewModel();

        expect(result.current).toMatchObject({
            email: "",
            password: "",
            isPasswordVisible: false,
            error: null,
            isSubmitting: false,
            canSubmit: false,
        });
    });
});

describe("editing", () => {
    it("holds what was typed", async () => {
        const { result } = await renderLoginViewModel();

        await act(() => result.current.setEmail(VALID_EMAIL));
        await act(() => result.current.setPassword(VALID_PASSWORD));

        expect(result.current.email).toBe(VALID_EMAIL);
        expect(result.current.password).toBe(VALID_PASSWORD);
    });

    it("enables submit only once both fields have content", async () => {
        const { result } = await renderLoginViewModel();

        await act(() => result.current.setEmail("nope"));
        expect(result.current.canSubmit).toBe(false);

        await act(() => result.current.setPassword("x"));
        expect(result.current.canSubmit).toBe(true);

        await act(() => result.current.setEmail("   "));
        expect(result.current.canSubmit).toBe(false);
    });

    it("clears a visible error as soon as the user edits", async () => {
        const { result } = await renderLoginViewModel();

        await act(() => result.current.setEmail("nope"));
        await act(() => result.current.setPassword(VALID_PASSWORD));
        await act(() => result.current.submit());

        expect(result.current.error).toBe("email-invalid");

        await act(() => result.current.setEmail(VALID_EMAIL));

        expect(result.current.error).toBeNull();
    });

    it("toggles password visibility", async () => {
        const { result } = await renderLoginViewModel();

        await act(() => result.current.togglePasswordVisibility());
        expect(result.current.isPasswordVisible).toBe(true);

        await act(() => result.current.togglePasswordVisibility());
        expect(result.current.isPasswordVisible).toBe(false);
    });
});

describe("submit — validation", () => {
    it.each([
        ["email-invalid", "nope", VALID_PASSWORD],
        ["password-too-short", VALID_EMAIL, "abc"],
    ] as const)(
        "reports %s without calling the service",
        async (expected, email, password) => {
            const { result } = await renderLoginViewModel();

            await act(() => result.current.setEmail(email));
            await act(() => result.current.setPassword(password));
            await act(() => result.current.submit());

            expect(result.current.error).toBe(expected);
            expect(signInMock).not.toHaveBeenCalled();
            expect(result.current.isSubmitting).toBe(false);
        },
    );
});

describe("submit — sign-in", () => {
    async function submitValid(overrides?: Partial<LoginViewModelDeps>) {
        const rendered = await renderLoginViewModel(overrides);

        await act(() => rendered.result.current.setEmail(VALID_EMAIL));
        await act(() => rendered.result.current.setPassword(VALID_PASSWORD));
        await act(() => rendered.result.current.submit());

        return rendered;
    }

    it("hands the typed credentials to the service once", async () => {
        await submitValid();

        expect(signInMock).toHaveBeenCalledTimes(1);
        expect(signInMock).toHaveBeenCalledWith({
            email: VALID_EMAIL,
            password: VALID_PASSWORD,
        });
    });

    it("notifies the composition root on success", async () => {
        const { result, deps } = await submitValid();

        expect(deps.onAuthenticated).toHaveBeenCalledTimes(1);
        expect(result.current.error).toBeNull();
        expect(result.current.isSubmitting).toBe(false);
    });

    it("surfaces a rejection as error state, not navigation", async () => {
        signInMock.mockResolvedValue({
            ok: false,
            reason: "invalid-credentials",
        });

        const { result, deps } = await submitValid();

        expect(result.current.error).toBe("invalid-credentials");
        expect(deps.onAuthenticated).not.toHaveBeenCalled();
    });
});

describe("submit — in flight", () => {
    it("blocks the button until the service answers", async () => {
        const resolveSignIn = deferSignIn();
        const { result } = await renderLoginViewModel();

        await act(() => result.current.setEmail(VALID_EMAIL));
        await act(() => result.current.setPassword(VALID_PASSWORD));

        let submitted!: Promise<void>;
        await act(() => {
            submitted = result.current.submit();
        });

        expect(result.current.isSubmitting).toBe(true);
        expect(result.current.canSubmit).toBe(false);

        await act(async () => {
            resolveSignIn({ ok: true });
            await submitted;
        });

        expect(result.current.isSubmitting).toBe(false);
    });

    it("ignores a second submit while one is already running", async () => {
        const resolveSignIn = deferSignIn();
        const { result } = await renderLoginViewModel();

        await act(() => result.current.setEmail(VALID_EMAIL));
        await act(() => result.current.setPassword(VALID_PASSWORD));

        let submitted!: Promise<void>;
        await act(() => {
            submitted = result.current.submit();
        });
        await waitFor(() => expect(result.current.isSubmitting).toBe(true));

        await act(() => result.current.submit());

        expect(signInMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            resolveSignIn({ ok: true });
            await submitted;
        });
    });
});

describe("navigation", () => {
    it("forwards the injected callbacks untouched", async () => {
        const { result, deps } = await renderLoginViewModel();

        await act(() => result.current.goToCreateAccount());
        await act(() => result.current.goToRestore());

        expect(deps.onCreateAccount).toHaveBeenCalledTimes(1);
        expect(deps.onRestore).toHaveBeenCalledTimes(1);
    });
});
