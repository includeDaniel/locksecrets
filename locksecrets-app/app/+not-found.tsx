import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppScreen } from "@/components/app-screen";
import { spacing, typography } from "@/constants/tokens";
import { useSession } from "@/hooks/use-session";

export default function NotFoundScreen() {
    const router = useRouter();
    const { isSignedIn } = useSession();

    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.title}>Page not found</Text>
                <Text style={styles.subtitle}>That route does not exist</Text>
            </View>

            <AppButton
                label={isSignedIn ? "Back to vault" : "Back to sign in"}
                onPress={() => router.replace(isSignedIn ? "/" : "/login")}
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
