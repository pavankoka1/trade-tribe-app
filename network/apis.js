const API_PATHS = {
    getJwtToken: "/api/v1/auth/generate-token",
    getUsersByParams: "/api/v1/search/users",
    getUserById: "/api/v1/search/user/{0}",
    uploadFile: "/api/v1/media/upload",
    createPost: "/api/v1/posts",
    getFeed: "/api/v1/feed/{0}",
};

export default API_PATHS;
