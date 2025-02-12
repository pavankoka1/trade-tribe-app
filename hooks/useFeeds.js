import { useEffect } from "react";
import useFeedStore from "./useFeedStore";

const useFeeds = () => {
    const {
        isFetchingForYou,
        trendingFeeds,
        forYouFeeds,
        fetchTrendingFeeds,
        fetchForYouFeeds,
        loading,
        error,
        resetFeeds,
    } = useFeedStore();

    const loadMoreTrending = (limit) => {
        fetchTrendingFeeds(limit);
    };

    const loadMoreForYou = (limit) => {
        fetchForYouFeeds(limit);
    };

    // Initial fetch for both feeds
    useEffect(() => {
        // fetchTrendingFeeds(10);
        fetchForYouFeeds(10);
    }, []);

    return {
        isFetchingForYou,
        trendingFeeds,
        forYouFeeds,
        loadMoreTrending,
        loadMoreForYou,
        loading,
        error,
        resetFeeds,
    };
};

export default useFeeds;
