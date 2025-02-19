import { create } from "zustand";

const useUserStore = create((set) => ({
    followers: [],
    following: [],
    details: {},
    setUserDetails: (details) => set({ details }),
    setFollowers: (followers) => {
        const followersUserIds = followers.map(
            (follower) => follower.followerId
        );
        set({ followers: followersUserIds });
    },
    addFollower: (userId) =>
        set((state) => ({
            following: [...state.following, userId],
        })),
    removeFollower: (userId) =>
        set((state) => ({
            following: state.following.filter((id) => id !== userId),
        })),
    setFollowing: (following) => {
        const followingUserIds = following.map(
            (following) => following.followeeId
        );
        set({ following: followingUserIds });
    },
}));

export default useUserStore;
