import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppScreen } from "@/components/app-screen";
import { colors, radii, sizes, spacing, typography } from "@/constants/tokens";

export default function RestoreSentScreen() {
    const router = useRouter();

    return (
        <AppScreen>
            <View style={styles.header}>
                <View style={styles.badge}>
                    <Feather
                        name="mail"
                        size={sizes.iconLogo}
                        color={colors.onAccent}
                    />
                </View>
                <Text style={styles.title}>Check your inbox</Text>
                <Text style={styles.subtitle}>Restore link sent</Text>
            </View>

            <AppButton
                label="Back to sign in"
                onPress={() => router.replace("/login")}
            />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingBottom: spacing.xxl,
    },
    badge: {
        width: sizes.badge,
        height: sizes.badge,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderRadius: radii.badge,
        backgroundColor: colors.accent,
    },
    title: typography.title,
    subtitle: {
        ...typography.subtitle,
        marginTop: spacing.xs,
    },
});
