import React, { useEffect, useState, useCallback } from "react";
import {
    Button,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    View,
    Dimensions,
    Modal,
    TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useSignIn, useAuth, useOAuth } from "@clerk/clerk-expo";

const { height, width } = Dimensions.get("window");

export const useWarmUpBrowser = () => {
    useEffect(() => {
        const warmUpBrowser = async () => {
            if (Platform.OS !== "web") {
                await WebBrowser.warmUpAsync();
            }
        };

        warmUpBrowser();

        return () => {
            if (Platform.OS !== "web") {
                void WebBrowser.coolDownAsync();
            }
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

const App = () => {
    useWarmUpBrowser();
    const [isLoading, setIsLoading] = useState(false);

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const { signIn } = useSignIn();
    const { isSignedIn } = useAuth();

    const onSocialLoginPress = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/redirect",
                redirectUrlComplete: "/",
            });

            const user = response.user;
            console.log("OAuth response:", response);
        } catch (err) {
            console.error("Error during OAuth flow:", err.message || err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: "#231F20", padding: 20 }}
            >
                <ScrollView scrollEventThrottle={16}>
                    <StatusBar
                        backgroundColor="#231F20"
                        barStyle="light-content"
                    />
                    <Text
                        style={{
                            color: "white",
                            fontSize: 24,
                            marginBottom: 20,
                        }}
                    >
                        Landing Page
                    </Text>
                    {isSignedIn ? (
                        <Button title="Logout" onPress={() => signOut()} />
                    ) : (
                        <Button title="Log in" onPress={onSocialLoginPress} />
                    )}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
