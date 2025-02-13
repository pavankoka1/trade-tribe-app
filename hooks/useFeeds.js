import { useEffect, useState } from "react";
import useFeedStore from "./useFeedStore";

const useFeeds = () => {
    const {
        isFetchingForYou,
        forYouFeeds,
        fetchForYouFeeds,
        loading,
        error,
        resetFeeds,
    } = useFeedStore();

    const [refreshing, setRefreshing] = useState(false);

    const loadMoreForYou = async (limit) => {
        await fetchForYouFeeds(limit);
    };

    // Initial fetch for 'For You' feeds
    useEffect(() => {
        loadMoreForYou(10); // Fetch initial feeds
    }, []);

    return {
        isFetchingForYou,
        forYouFeeds,
        loadMoreForYou,
        loading,
        error,
        refreshing,
        setRefreshing,
        resetFeeds,
    };
};

export default useFeeds;
