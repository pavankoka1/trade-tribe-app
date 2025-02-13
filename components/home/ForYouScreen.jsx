import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Animated,
    RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useCallback } from "react";
import useFeeds from "@/hooks/useFeeds";
import FeedPost from "./FeedPost";

const ITEMS_PER_PAGE = 10;

const ForYouScreen = () => {
    const {
        isFetchingForYou,
        forYouFeeds,
        loadMoreForYou,
        loading,
        error,
        refreshing,
        setRefreshing,
        resetFeeds,
    } = useFeeds();
    const spinValue = useRef(new Animated.Value(0)).current;

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const startSpin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => startSpin());
    };

    useEffect(() => {
        if (refreshing) {
            startSpin();
        }
    }, [refreshing]);

    const onRefresh = async () => {
        setRefreshing(true);
        await resetFeeds();
        await loadMoreForYou(ITEMS_PER_PAGE);
        setRefreshing(false);
    };

    const renderItem = useCallback(({ item }) => {
        return <FeedPost item={item} />;
    }, []);

    return (
        <View className="flex-1 bg-[#161616]">
            <FlatList
                data={
                    isFetchingForYou
                        ? [...forYouFeeds, ...Array(4).fill(null)]
                        : forYouFeeds
                }
                renderItem={renderItem}
                keyExtractor={(item) =>
                    item?.feedId
                        ? "for-you-" + item.feedId
                        : "loader-" + Math.random() * 10000
                }
                onEndReached={() => loadMoreForYou(ITEMS_PER_PAGE)}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" /> : null
                }
                initialNumToRender={10} // Render 10 items initially
                windowSize={5} // Number of items to render outside the viewport
            />
            {error && (
                <Text className="text-red-500">Error: {error.message}</Text>
            )}
        </View>
    );
};

export default ForYouScreen;
