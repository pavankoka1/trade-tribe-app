import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import loadFonts from "@/styles/fonts";
import { tokenCache } from "@/utils/cache";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import "@/global.css";
import "@/styles/index.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
    useEffect(() => {
        const load = async () => {
            await loadFonts();
        };
        load();
    }, []);

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <ClerkLoaded>
                <ThemeProvider>
                    <SafeAreaProvider>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="index"
                                options={{ title: "Koka Portfolio" }}
                            />
                            <Stack.Screen
                                name="redirect"
                                options={{ title: "Koka Portfolio" }}
                            />
                        </Stack>
                    </SafeAreaProvider>
                </ThemeProvider>
            </ClerkLoaded>
        </ClerkProvider>
    );
}
