import "react-native-reanimated"; // must stay the first import — Reanimated needs it

import {
    DMMono_400Regular,
    DMMono_500Medium,
    useFonts,
} from "@expo-google-fonts/dm-mono";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { colors } from "@/constants/tokens";
import { SessionProvider, useSession } from "@/hooks/use-session";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
    const [loaded, error] = useFonts({ DMMono_400Regular, DMMono_500Medium });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync().catch(() => {});
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <SessionProvider>
            <RootNavigator />
            <StatusBar style="light" />
        </SessionProvider>
    );
}

function RootNavigator() {
    const { isSignedIn } = useSession();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Protected guard={isSignedIn}>
                <Stack.Screen name="(app)" />
            </Stack.Protected>

            <Stack.Protected guard={!isSignedIn}>
                <Stack.Screen name="(auth)" />
            </Stack.Protected>
        </Stack>
    );
}
