const API_PATHS = {
    getJwtToken: "/api/v1/auth/generate-token",
    getUsersByParams: "/api/v1/search/users",
    getUserById: "/api/v1/search/user/{0}",
    uploadFile: "/api/v1/media/upload",
    createPost: "/api/v1/posts",
    getFeed: "/api/v1/feed/{0}",
    getFollowers: "api/v1/followers/followers/{0}",
    getFollowing: "api/v1/followers/following/{0}",
    unfollow: "/api/v1/followers/{0}/{1}",
    follow: "/api/v1/followers",
};

export default API_PATHS;
