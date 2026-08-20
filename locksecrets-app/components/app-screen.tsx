import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/constants/tokens";

export function AppScreen({ children }: Readonly<PropsWithChildren>) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + spacing.xxxl,
                    paddingBottom: insets.bottom + spacing.xxxl,
                },
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        backgroundColor: colors.background,
    },
});
