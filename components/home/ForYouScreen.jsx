import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import useFeeds from "@/hooks/useFeeds";
import PostsLoader from "./PostsLoader";
import FeedPost from "./FeedPost"; // Import the new FeedPost component

const ITEMS_PER_PAGE = 10;

const ForYouScreen = () => {
    const { isFetchingForYou, forYouFeeds, loadMoreForYou, loading, error } =
        useFeeds();

    return (
        <View className="flex-1 bg-[#161616]">
            <FlatList
                data={forYouFeeds}
                renderItem={({ item }) => <FeedPost item={item} />} // Use FeedPost component
                keyExtractor={(item) =>
                    "for-you-" + item.postDetails.id.toString()
                }
                onEndReached={() => loadMoreForYou(ITEMS_PER_PAGE)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" /> : null
                }
            />
            {isFetchingForYou &&
                [0, 1].map((item) => <PostsLoader key={item} />)}
            {error && (
                <Text style={{ color: "red" }}>Error: {error.message}</Text>
            )}
        </View>
    );
};

export default ForYouScreen;
