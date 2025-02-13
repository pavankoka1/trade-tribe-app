import generateRandomString from "@/utils/generateRandomString";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_DOMAIN,
    timeout: 30000, // Increased timeout
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized: Please log in again.");
                    break;
                case 403:
                    console.error(
                        "Forbidden: You do not have permission to access this resource."
                    );
                    break;
                case 404:
                    console.error(
                        "Not Found: The requested resource does not exist."
                    );
                    break;
                case 500:
                    console.error(
                        "Server Error: Something went wrong on the server."
                    );
                    break;
                default:
                    console.error("An error occurred:", error.message);
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

const network = {
    get: async (url, params = {}) => {
        try {
            const response = await axiosInstance.get(url, { params });
            return response;
        } catch (error) {
            throw error;
        }
    },
    post: async (url, data) => {
        try {
            const response = await axiosInstance.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    put: async (url, data) => {
        try {
            const response = await axiosInstance.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    delete: async (url) => {
        try {
            const response = await axiosInstance.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    uploadFile: async (url, file, userId) => {
        const formData = new FormData();
        formData.append("userId", userId); // Add userId to form data
        formData.append("media", {
            uri: file.uri,
            type: file.type || "image/jpeg", // Default to jpeg if type not provided
            name: generateRandomString(16), // Default filename
        });
        try {
            const response = await axiosInstance.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default network;
