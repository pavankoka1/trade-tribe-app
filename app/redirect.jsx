// app/redirect.jsx
import { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import network from "@/network";
import API_PATHS from "@/network/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HEADERS_KEYS } from "@/network/constants";
import * as SecureStore from "expo-secure-store";

export default function Redirect() {
    const { code } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        handleAuthentication();
    }, [code]);

    async function handleAuthentication() {
        const token = await SecureStore.getItemAsync(HEADERS_KEYS.TOKEN);

        if (code) {
            console.log("code", code);
            network
                .post(API_PATHS.getJwtToken, {
                    authorizationCode: code,
                    redirectUrl: process.env.EXPO_PUBLIC_API_REDIRECT,
                })
                .then(async (res) => {
                    const token = res.token;
                    const refreshToken = res.refreshToken;
                    const userId = res.id.toString();

                    console.log(res.token);

                    await SecureStore.setItemAsync(HEADERS_KEYS.TOKEN, token);
                    await SecureStore.setItemAsync(
                        HEADERS_KEYS.REFRESH_TOKEN,
                        refreshToken
                    );
                    await SecureStore.setItemAsync(
                        HEADERS_KEYS.USER_ID,
                        userId
                    );
                    router.replace("/(auth)/home");
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                    console.error(err);
                    router.replace("/");
                });
        } else if (token) {
            router.replace("/(auth)/home");
        } else {
            router.replace("/");
        }
    }

    return <Loader />;
}
