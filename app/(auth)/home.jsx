import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import TrendingScreen from "@/components/home/TrendingScreen";
import TrendingIcon from "@/icons/TrendingIcon"; // Import your custom icons
import ForYouIcon from "@/icons/ForYouIcon"; // Import your custom icons

// Screen dimensions
const { width } = Dimensions.get("window");

const ForYouScreen = () => (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#161616",
        }}
    >
        <Text style={{ color: "white", fontSize: 18 }}>For You Content</Text>
        <Text style={{ color: "gray", marginTop: 8 }}>
            This is the personalized section.
        </Text>
    </View>
);

// Map the routes to their respective components
const renderScene = SceneMap({
    trending: TrendingScreen,
    forYou: ForYouScreen,
});

// Modified component with safe view handling
export default function AnimatedTabComponent() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "trending", title: "Trending" },
        { key: "forYou", title: "For You" },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "trending":
                return <TrendingScreen />;
            case "forYou":
                return <ForYouScreen />;
            default:
                return null;
        }
    };

    return (
        <View className="flex-1 bg-[#161616]">
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{
                            backgroundColor: "#b4ef02",
                            height: 3,
                        }}
                        style={{ backgroundColor: "transparent" }}
                        labelStyle={{ color: "white" }}
                        contentContainerStyle={{ elevation: 0 }}
                    />
                )}
                swipeEnabled={true} // Disable swipe until native modules work
            />
        </View>
    );
}
