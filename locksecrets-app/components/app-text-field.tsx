import Feather from "@expo/vector-icons/Feather";
import type { ComponentProps, ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";

import { colors, radii, sizes, spacing, typography } from "@/constants/tokens";

type FeatherName = ComponentProps<typeof Feather>["name"];

type AppTextFieldProps = Pick<
    TextInputProps,
    | "autoCapitalize"
    | "autoComplete"
    | "autoCorrect"
    | "keyboardType"
    | "onSubmitEditing"
    | "placeholder"
    | "returnKeyType"
    | "secureTextEntry"
    | "textContentType"
> & {
    label: string;
    icon: FeatherName;
    value: string;
    onChangeText: (value: string) => void;
    trailing?: ReactNode;
};

export function AppTextField({
    label,
    icon,
    value,
    onChangeText,
    trailing,
    ...inputProps
}: Readonly<AppTextFieldProps>) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.control}>
                <Feather
                    name={icon}
                    size={sizes.iconInput}
                    color={colors.textSecondary}
                />

                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    accessibilityLabel={label}
                    placeholderTextColor={typography.placeholder.color}
                    selectionColor={colors.accent}
                    {...inputProps}
                />

                {trailing}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        gap: spacing.sm,
    },
    label: typography.label,
    control: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        height: sizes.control,
        paddingHorizontal: spacing.lg,
        borderRadius: radii.control,
        borderWidth: sizes.borderWidth,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    input: {
        ...typography.input,
        flex: 1,
        padding: 0,
    },
});
