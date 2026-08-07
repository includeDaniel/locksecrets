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

SplashScreen.preventAutoHideAsync().catch(() => {});

const BACKGROUND = "#0a0a0a";

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
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: BACKGROUND },
                }}
            />
            <StatusBar style="light" />
        </>
    );
}
