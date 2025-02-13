import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Slot, useRouter, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import network from "@/network";
import * as SecureStore from "expo-secure-store";

// Import your icons
import HomeIcon from "@/icons/HomeIcon";
import SearchIcon from "@/icons/SearchIcon";
import AddIcon from "@/icons/AddIcon";
import BellIcon from "@/icons/BellIcon";
import PersonIcon from "@/icons/PersonIcon";
import API_PATHS from "@/network/apis";
import generateQueryParams from "@/utils/generateQueryParams";
import { HEADERS_KEYS } from "@/network/constants";
import replacePlaceholders from "@/utils/replacePlaceholders";

const CustomBottomNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("home");
    const [animation] = useState(new Animated.Value(1));

    useEffect(() => {
        handleAuthentication();
    }, []);

    useEffect(() => {
        const routeName = pathname.split("/").pop();
        if (
            routeName &&
            ["home", "search", "create", "notifications", "profile"].includes(
                routeName
            )
        ) {
            setActiveTab(routeName);
        }
    }, [pathname]);

    async function handleAuthentication() {
        const userId = await SecureStore.getItemAsync(HEADERS_KEYS.USER_ID);
        const token = await SecureStore.getItemAsync(HEADERS_KEYS.TOKEN);
        const url = await generateQueryParams(API_PATHS.getUsersByParams, {
            id: userId,
        });

        network
            .get(replacePlaceholders(API_PATHS.getUserById, userId))
            .then((res) => {
                console.log(res);
                console.log(token);
            })
            .catch(async () => {
                await SecureStore.deleteItemAsync(HEADERS_KEYS.TOKEN);
                await SecureStore.deleteItemAsync(HEADERS_KEYS.REFRESH_TOKEN);
                await SecureStore.deleteItemAsync(HEADERS_KEYS.USER_ID);
                router.replace("/redirect");
            });
    }

    const handleTabPress = (tabName) => {
        // Start the animation
        Animated.timing(animation, {
            toValue: 0, // Fade out
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setActiveTab(tabName);
            router.replace(`/(auth)/${tabName}`);
            // Fade in after changing the tab
            Animated.timing(animation, {
                toValue: 1, // Fade in
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <SafeAreaProvider>
            <View className="flex-1 bg-[#161616]">
                {/* Render the active screen with animation */}
                <Animated.View
                    style={{
                        opacity: animation, // Bind opacity to the animated value
                    }}
                    className="flex-1"
                >
                    <Slot />
                </Animated.View>

                {/* Bottom Navigation */}
                <View className="flex-row justify-around items-center h-16 bg-[#161616] border-t-2 border-[#1F2023] px-2">
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => handleTabPress("home")}
                    >
                        <HomeIcon
                            color={activeTab === "home" ? "#b4ef02" : "#ffffff"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => handleTabPress("search")}
                    >
                        <SearchIcon
                            color={
                                activeTab === "search" ? "#b4ef02" : "#ffffff"
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => handleTabPress("create")}
                    >
                        <AddIcon
                            color={
                                activeTab === "create" ? "#b4ef02" : "#ffffff"
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => handleTabPress("notifications")}
                    >
                        <BellIcon
                            color={
                                activeTab === "notifications"
                                    ? "#b4ef02"
                                    : "#ffffff"
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => handleTabPress("profile")}
                    >
                        <PersonIcon
                            color={
                                activeTab === "profile" ? "#b4ef02" : "#ffffff"
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaProvider>
    );
};

export default CustomBottomNavigation;
