import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppScreen } from "@/components/app-screen";
import { colors, sizes, spacing, typography } from "@/constants/tokens";
import { useSession } from "@/hooks/use-session";

export default function HomeScreen() {
    const router = useRouter();
    const { signOut } = useSession();

    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.title}>Your vault</Text>
                <Text style={styles.subtitle}>Unlocked</Text>
            </View>

            <View style={styles.empty}>
                <Feather
                    name="shield"
                    size={sizes.iconLogo}
                    color={colors.textMuted}
                />
                <Text style={styles.caption}>No secrets yet</Text>
            </View>

            <View style={styles.actions}>
                <AppButton
                    label="New secret"
                    onPress={() => router.push("/new-secret")}
                />
                <AppButton
                    label="Lock vault"
                    variant="secondary"
                    onPress={signOut}
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
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
    },
    caption: typography.caption,
    actions: {
        gap: spacing.md,
    },
});
