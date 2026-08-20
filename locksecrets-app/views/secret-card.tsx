import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, sizes, spacing, typography } from "@/constants/tokens";
import { MASKED_VALUE, type Secret } from "@/models/secret";

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
] as const;

function formatUpdatedAt(updatedAt: number): string {
    const date = new Date(updatedAt);

    return `Updated ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

type SecretCardProps = {
    secret: Secret;
    isRevealed: boolean;
    onToggleReveal: () => void;
    onCopy: () => void;
    onDelete: () => void;
};

export function SecretCard({
    secret,
    isRevealed,
    onToggleReveal,
    onCopy,
    onDelete,
}: Readonly<SecretCardProps>) {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.name} numberOfLines={1}>
                    {secret.name}
                </Text>

                <View style={styles.actions}>
                    <Pressable
                        onPress={onToggleReveal}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel={
                            isRevealed
                                ? `Hide ${secret.name}`
                                : `Show ${secret.name}`
                        }
                    >
                        <Feather
                            name={isRevealed ? "eye-off" : "eye"}
                            size={sizes.iconInput}
                            color={colors.textSecondary}
                        />
                    </Pressable>

                    <Pressable
                        onPress={onCopy}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel={`Copy ${secret.name}`}
                    >
                        <Feather
                            name="copy"
                            size={sizes.iconInput}
                            color={colors.textSecondary}
                        />
                    </Pressable>

                    <Pressable
                        onPress={onDelete}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel={`Delete ${secret.name}`}
                    >
                        <Feather
                            name="trash-2"
                            size={sizes.iconInput}
                            color={colors.textSecondary}
                        />
                    </Pressable>
                </View>
            </View>

            <Text style={styles.value} numberOfLines={1}>
                {isRevealed ? secret.value : MASKED_VALUE}
            </Text>

            <Text style={styles.meta}>{formatUpdatedAt(secret.updatedAt)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: spacing.sm,
        padding: spacing.lg,
        borderWidth: sizes.borderWidth,
        borderColor: colors.border,
        borderRadius: radii.control,
        backgroundColor: colors.surface,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
    },
    name: {
        ...typography.buttonSecondary,
        flexShrink: 1,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.lg,
    },
    value: typography.input,
    meta: typography.caption,
});
