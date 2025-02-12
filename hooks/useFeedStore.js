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
    loadingTrending: false, // Separate loading states
    loadingForYou: false,
    error: null,
    seenPostIds: new Set(), // Track seen post IDs
    forYouPostIds: [],
    isFetchingTrending: false,
    isFetchingForYou: false,

    fetchTrendingFeeds: async (limit) => {
        if (get().isFetchingTrending) {
            return; // Prevent concurrent calls
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
            }
        } catch (err) {
            set({ error: err });
        } finally {
            set({ loadingTrending: false, isFetchingTrending: false });
        }
    },

    fetchForYouFeeds: async (limit) => {
        if (get().isFetchingForYou) {
            return; // Prevent concurrent calls
        }

        set({ loadingForYou: true, isFetchingForYou: true });
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
            }
        } catch (err) {
            set({ error: err });
        } finally {
            set({ loadingForYou: false, isFetchingForYou: false });
        }
    },

    resetFeeds: () =>
        set({
            trendingFeeds: [],
            forYouFeeds: [],
            trendingOffset: 0,
            forYouOffset: 0,
            seenPostIds: new Set(), // Clear seen IDs on reset
        }),
}));

export default useFeedStore;
