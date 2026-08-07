import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, sizes, typography } from "@/constants/tokens";

type AppButtonProps = {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
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
    const isPrimary = variant === "primary";
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
                isPrimary ? styles.primary : styles.secondary,
                !isInteractive && styles.inactive,
                pressed && styles.pressed,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color={isPrimary ? colors.onAccent : colors.textPrimary}
                />
            ) : (
                <Text
                    style={
                        isPrimary ? styles.primaryLabel : styles.secondaryLabel
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
    inactive: {
        opacity: 0.4,
    },
    pressed: {
        opacity: 0.8,
    },
    primaryLabel: typography.buttonPrimary,
    secondaryLabel: typography.buttonSecondary,
});
