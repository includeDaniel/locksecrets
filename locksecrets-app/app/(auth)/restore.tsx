import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppScreen } from "@/components/app-screen";
import { spacing, typography } from "@/constants/tokens";

export default function RestoreScreen() {
    const router = useRouter();

    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.title}>Restore Access</Text>
                <Text style={styles.subtitle}>Not built yet</Text>
            </View>

            <View style={styles.actions}>
                <AppButton
                    label="Send restore link"
                    onPress={() => router.replace("/restore-sent")}
                />
                <AppButton
                    label="Back to sign in"
                    variant="secondary"
                    onPress={router.back}
                />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: spacing.xxl,
    },
    title: typography.title,
    subtitle: {
        ...typography.subtitle,
        marginTop: spacing.xs,
    },
    actions: {
        gap: spacing.md,
    },
});
