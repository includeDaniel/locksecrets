import type { TextStyle } from "react-native";

export const colors = {
    background: "#0a0a0a",
    surface: "#1e1e1e",
    accent: "#00e676",
    textPrimary: "#f0f0f0",
    textSecondary: "#6b6b6b",
    textMuted: "#3a3a3a",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(82, 45, 45, 0.1)",
    onAccent: "#000000",
} as const;

export const spacing = {
    xs: 4,
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 40,
} as const;

export const radii = {
    control: 14,
    badge: 16,
} as const;

export const sizes = {
    control: 48,
    badge: 56,
    iconLogo: 28,
    iconInput: 16,
    iconFooter: 12,
    borderWidth: 1,
} as const;

export const fonts = {
    regular: "DMMono_400Regular",
    medium: "DMMono_500Medium",
} as const;

export const typography = {
    title: {
        fontFamily: fonts.medium,
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: -0.6,
        color: colors.textPrimary,
    },

    subtitle: {
        fontFamily: fonts.regular,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: colors.textSecondary,
    },

    label: {
        fontFamily: fonts.medium,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: colors.textSecondary,
    },

    input: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.textPrimary,
    },

    placeholder: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.textMuted,
    },

    buttonPrimary: {
        fontFamily: fonts.medium,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.7,
        textTransform: "uppercase",
        color: colors.onAccent,
    },

    buttonSecondary: {
        fontFamily: fonts.medium,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.7,
        color: colors.textPrimary,
    },

    link: {
        fontFamily: fonts.medium,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.3,
        color: colors.textSecondary,
    },

    caption: {
        fontFamily: fonts.regular,
        fontSize: 12,
        lineHeight: 16,
        color: colors.textMuted,
    },
} satisfies Record<string, TextStyle>;
