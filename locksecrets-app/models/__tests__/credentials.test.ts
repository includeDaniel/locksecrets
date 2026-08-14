import {
    isComplete,
    isValidEmail,
    validateCredentials,
} from "@/models/credentials";
import type { Credentials } from "@/models/credentials";

function credentials(overrides: Partial<Credentials> = {}): Credentials {
    return { email: "me@example.com", password: "opensesame", ...overrides };
}

describe("isValidEmail", () => {
    it.each(["me@example.com", "a.b+tag@sub.domain.co.uk", "  me@example.com  "])(
        "accepts %p",
        (email) => {
            expect(isValidEmail(email)).toBe(true);
        },
    );

    it.each([
        "",
        "   ",
        "nope",
        "@example.com",
        "me@",
        "me@example",
        "me@@example.com",
        "me @example.com",
        "me@example..com",
    ])("rejects %p", (email) => {
        expect(isValidEmail(email)).toBe(false);
    });
});

describe("isComplete", () => {
    it("is true when both fields have content", () => {
        expect(isComplete(credentials())).toBe(true);
    });

    it("is false when the email is blank", () => {
        expect(isComplete(credentials({ email: "   " }))).toBe(false);
    });

    it("is false when the password is empty", () => {
        expect(isComplete(credentials({ password: "" }))).toBe(false);
    });

    it("does not care whether the values are valid", () => {
        expect(isComplete({ email: "nope", password: "x" })).toBe(true);
    });
});

describe("validateCredentials", () => {
    it("returns null for valid credentials", () => {
        expect(validateCredentials(credentials())).toBeNull();
    });

    it.each([
        ["email-required", credentials({ email: "  " })],
        ["email-invalid", credentials({ email: "nope" })],
        ["password-required", credentials({ password: "" })],
        ["password-too-short", credentials({ password: "abc" })],
    ] as const)("returns %s", (expected, input) => {
        expect(validateCredentials(input)).toBe(expected);
    });

    it("reports the email problem first when both fields are wrong", () => {
        expect(validateCredentials({ email: "nope", password: "abc" })).toBe(
            "email-invalid",
        );
    });
});
