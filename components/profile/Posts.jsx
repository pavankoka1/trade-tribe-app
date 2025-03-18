import { View, FlatList, RefreshControl, Animated, Text } from "react-native";
import React, { useRef, useEffect } from "react";
import useUserStore from "@/hooks/useUserStore";
import FeedPost from "../home/FeedPost";
import Header from "./Header";
import Card from "./Card";
import TabButton from "@/components/Tabs/TabButton";

const Posts = ({ handleTabChange }) => {
    const { isFetchingPosts, posts, fetchPosts, resetPosts } = useUserStore();
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchPosts();
    }, []);

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    // const startSpin = () => {
    //     spinValue.setValue(0);
    //     Animated.timing(spinValue, {
    //         toValue: 1,
    //         duration: 1000,
    //         useNativeDriver: true,
    //     }).start(() => startSpin());
    // };

    const onRefresh = async () => {
        await resetPosts();
        await fetchPosts();
    };

    if (!posts.length && !isFetchingPosts)
        return (
            <View className="flex-1 flex-col justify-center items-center bg-[#161616]">
                <Header />
                <Card />
                <View className="flex flex-row">
                    <TabButton title="Portfolio" onPress={handleTabChange} />
                    <TabButton
                        title="Posts"
                        className="border-b-[3px] border-primary-main pb-5"
                        isActive={true}
                    />
                </View>
                <View className="flex-1 flex-col justify-center items-center bg-[#161616]">
                    <Text className="text-[#B1B1B1] font-manrope-bold text-16 mb-1">
                        You haven't posted anything yet!
                    </Text>
                    <Text className="text-white font-manrope text-14">
                        Please try to pull down if you've posted just now!
                    </Text>
                </View>
            </View>
        );

    return (
        <FlatList
            data={isFetchingPosts ? [...posts, ...Array(4).fill(null)] : posts}
            renderItem={({ item }) => <FeedPost item={item} />}
            keyExtractor={(item) =>
                item?.id ? "post-" + item.id : "loader-" + Math.random() * 10000
            }
            ListHeaderComponent={
                <View className="border-b-[2px] border-[#1F2023]">
                    <Header />
                    <Card />
                    <View className="flex flex-row">
                        <TabButton
                            title="Portfolio"
                            onPress={handleTabChange}
                        />
                        <TabButton
                            title="Posts"
                            className="border-b-[3px] border-primary-main pb-5"
                            isActive={true}
                        />
                    </View>
                </View>
            }
            onEndReached={() => fetchPosts()}
            onEndReachedThreshold={0.5}
            initialNumToRender={3}
            windowSize={5}
            contentContainerStyle={{ backgroundColor: "#161616" }}
            refreshControl={
                <RefreshControl
                    // refreshing={isFetchingPosts}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

export default Posts;
