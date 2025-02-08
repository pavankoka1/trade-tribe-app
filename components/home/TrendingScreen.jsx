import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

const mockData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1, // Ensure this is unique
    title: `Item ${index + 1}`,
}));

const ITEMS_PER_PAGE = 10;

const TrendingScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true); // Track if there's more data to load

    const fetchMockData = (pageNumber) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
                const newData = mockData.slice(
                    startIndex,
                    startIndex + ITEMS_PER_PAGE
                );
                resolve(newData);
            }, 1000); // Simulate a 1 second delay
        });
    };

    const loadData = async (pageNumber) => {
        if (loading || !hasMoreData) return; // Prevent loading if already loading or no more data

        setLoading(true);
        try {
            const newData = await fetchMockData(pageNumber);
            if (newData.length > 0) {
                setData((prevData) => [...prevData, ...newData]);
            } else {
                setHasMoreData(false); // No more data to load
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        loadData(page);
    }, [page]);

    const loadMoreData = () => {
        if (!isLoadingMore && hasMoreData) {
            setIsLoadingMore(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderItem = ({ item }) => (
        <View className="py-8 px-4 border-b border-white">
            <Text
                className="font-manrope-medium text-white text-20"
                style={{ fontSize: 20, color: "white" }}
            >
                {item.title}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#161616]">
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Ensure this returns a unique key
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isLoadingMore ? <ActivityIndicator size="large" /> : null
                }
            />
            {loading && !isLoadingMore && (
                <ActivityIndicator
                    size="large"
                    style={{ position: "absolute", top: "50%", left: "50%" }}
                />
            )}
        </View>
    );
};

export default TrendingScreen;
