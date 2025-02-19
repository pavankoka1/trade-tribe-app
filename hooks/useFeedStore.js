import { create } from "zustand";
import axios from "axios";
import network from "@/network";
import API_PATHS from "@/network/apis";
import replacePlaceholders from "@/utils/replacePlaceholders";
import * as SecureStore from "expo-secure-store";
import { HEADERS_KEYS } from "@/network/constants";
import generateQueryParams from "@/utils/generateQueryParams";

const useFeedStore = create((set, get) => ({
    trendingFeeds: [],
    forYouFeeds: [],
    trendingOffset: 0,
    forYouOffset: 0,
    loadingTrending: false,
    loadingForYou: false,
    error: null,
    seenPostIds: new Set(),
    forYouPostIds: [],
    isFetchingTrending: false,
    isFetchingForYou: false,
    hasMoreTrending: true,
    hasMoreForYou: true,

    fetchTrendingFeeds: async (limit) => {
        if (get().isFetchingTrending || !get().hasMoreTrending) {
            return; // Prevent concurrent calls and stop if no more feeds
        }

        set({ loadingTrending: true, isFetchingTrending: true });
        try {
            const response = await axios.get(
                `https://api.example.com/trending`,
                {
                    params: { limit, page: get().trendingOffset },
                }
            );

            const newPosts = response.data.filter(
                (item) => !get().seenPostIds.has(item.postDetails.id)
            );

            if (newPosts.length > 0) {
                set((state) => ({
                    trendingFeeds: [...state.trendingFeeds, ...newPosts],
                    trendingOffset: state.trendingOffset + 1,
                    seenPostIds: new Set([
                        ...state.seenPostIds,
                        ...newPosts.map((item) => item.postDetails.id),
                    ]),
                }));
            } else {
                set({ hasMoreTrending: false }); // No more trending feeds available
            }
        } catch (err) {
            set({ error: err });
        } finally {
            set({ loadingTrending: false, isFetchingTrending: false });
        }
    },

    // Fetch 'For You' feeds
    fetchForYouFeeds: async (limit) => {
        if (get().isFetchingForYou || !get().hasMoreForYou) {
            return; // Prevent concurrent calls and stop if no more feeds
        }

        set({ loadingForYou: true, isFetchingForYou: true, error: null });
        try {
            const userId = await SecureStore.getItemAsync(HEADERS_KEYS.USER_ID);
            const response = await network.get(
                generateQueryParams(
                    replacePlaceholders(API_PATHS.getFeed, userId),
                    {
                        limit,
                        offset: get().forYouOffset,
                    }
                )
            );

            const newPosts = response.filter(
                (item) => !get().forYouPostIds.includes(item.postDetails.id)
            );

            if (newPosts.length > 0) {
                set((state) => ({
                    forYouFeeds: [...state.forYouFeeds, ...newPosts],
                    forYouOffset: state.forYouOffset + limit,
                    seenPostIds: new Set([
                        ...state.seenPostIds,
                        ...newPosts.map((item) => item.postDetails.id),
                    ]),
                    forYouPostIds: [
                        ...state.forYouPostIds,
                        ...newPosts.map((item) => item.postDetails.id),
                    ],
                }));
            } else {
                set({ hasMoreForYou: false }); // No more 'for you' feeds available
            }
        } catch (err) {
            set({ error: err });
        } finally {
            set({ loadingForYou: false, isFetchingForYou: false });
        }
    },

    // Reset feeds to initial state
    resetFeeds: () =>
        set({
            trendingFeeds: [],
            forYouFeeds: [],
            trendingOffset: 0,
            forYouOffset: 0,
            seenPostIds: new Set(),
            forYouPostIds: [],
            hasMoreTrending: true, // Reset the flag
            hasMoreForYou: true, // Reset the flag
            error: null, // Reset the error state
        }),
}));

export default useFeedStore;
