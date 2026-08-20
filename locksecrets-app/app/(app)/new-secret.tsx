import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppScreen } from "@/components/app-screen";
import { spacing, typography } from "@/constants/tokens";

export default function NewSecretScreen() {
    const router = useRouter();

    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.title}>New Secret</Text>
                <Text style={styles.subtitle}>Not built yet</Text>
            </View>

            <AppButton
                label="Cancel"
                variant="secondary"
                onPress={router.back}
            />
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
});
