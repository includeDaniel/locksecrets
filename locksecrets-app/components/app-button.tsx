import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, sizes, typography } from "@/constants/tokens";

type AppButtonProps = {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    loading?: boolean;
};

export function AppButton({
    label,
    onPress,
    variant = "primary",
    disabled = false,
    loading = false,
}: Readonly<AppButtonProps>) {
    const isSecondary = variant === "secondary";
    const isInteractive = !disabled && !loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={!isInteractive}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ disabled: !isInteractive, busy: loading }}
            style={({ pressed }) => [
                styles.base,
                styles[variant],
                !isInteractive && styles.inactive,
                pressed && styles.pressed,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color={isSecondary ? colors.textPrimary : colors.onAccent}
                />
            ) : (
                <Text
                    style={
                        isSecondary
                            ? styles.secondaryLabel
                            : styles.primaryLabel
                    }
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        height: sizes.control,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.control,
    },
    primary: {
        backgroundColor: colors.accent,
    },
    secondary: {
        borderWidth: sizes.borderWidth,
        borderColor: colors.borderStrong,
    },
    danger: {
        backgroundColor: colors.danger,
    },
    inactive: {
        opacity: 0.4,
    },
    pressed: {
        opacity: 0.8,
    },
    primaryLabel: typography.buttonPrimary,
    secondaryLabel: typography.buttonSecondary,
});
