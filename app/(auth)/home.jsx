import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import TrendingScreen from "@/components/home/TrendingScreen";
import ForYouScreen from "@/components/home/ForYouScreen";
import TrendingIcon from "@/icons/TrendingIcon";
import ForYouIcon from "@/icons/ForYouIcon";

const Tab = createMaterialTopTabNavigator();

export default function AnimatedTabComponent() {
    return (
        <View className="flex-1 bg-[#161616]">
            <Tab.Navigator
                screenOptions={{
                    // Styling for tab bar
                    tabBarStyle: {
                        backgroundColor: "#161616",
                        elevation: 0,
                        borderBottomWidth: 0,
                        paddingTop: 12,
                        paddingBottom: 12,
                    },
                    // Indicator styling
                    tabBarIndicatorStyle: {
                        backgroundColor: "#b4ef02",
                        height: 3,
                    },
                    // Icon colors
                    tabBarActiveTintColor: "#b4ef02",
                    tabBarInactiveTintColor: "#666666",
                    // Hide labels
                    tabBarShowLabel: false,
                    // Disable swipe
                    swipeEnabled: false,
                    // Icon container styling
                    tabBarIconStyle: {
                        width: 24,
                        height: 24,
                    },
                }}
            >
                <Tab.Screen
                    name="trending"
                    component={TrendingScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Text
                                className="text-14 font-manrope-bold"
                                style={{ color: color }}
                            >
                                Trending
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="for-you"
                    component={ForYouScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Text
                                className="text-14 font-manrope-bold"
                                style={{ color: color }}
                            >
                                For You
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
