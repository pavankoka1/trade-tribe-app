import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import SmallcaseGateway from "react-native-smallcase-gateway";
import jwtDecode from "jwt-decode";

const SmallcaseIntegration = () => {
    const [sdkToken, setSdkToken] = useState(null);
    const [smallcaseAuthId, setSmallcaseAuthId] = useState(
        "TRX_8d97befddb10421d8a09aaa6b66c5c89"
    );
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // const fetchSdkToken = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3000/getSdkToken"); // Replace with your backend URL
    //         const data = await response.json();
    //         setSdkToken(data.token);
    //     } catch (err) {
    //         console.error("Error fetching SDK token:", err);
    //         setError("Failed to fetch SDK token");
    //     }
    // };

    const initGatewaySession = useCallback(() => {
        if (!sdkToken) return;

        SmallcaseGateway.init(sdkToken)
            .then((initResp) => {
                console.log("Gateway session initialized:", initResp);
                setIsInitialized(true);

                // Decode the token to get smallcaseAuthId
                const decodedToken = jwtDecode(sdkToken);
                setSmallcaseAuthId(decodedToken.smallcaseAuthId); // Adjust based on your token structure
            })
            .catch((err) => {
                console.error(
                    "Error initializing gateway session:",
                    err.userInfo
                );
                setError("Failed to initialize gateway session");
            });
    }, [sdkToken]);

    // useEffect(() => {
    //     fetchSdkToken();
    // }, []);

    useEffect(() => {
        initGatewaySession();
    }, [sdkToken]);

    return (
        <View>
            {isInitialized ? (
                <Text>Gateway session initialized successfully!</Text>
            ) : (
                <Text>Initializing gateway session...</Text>
            )}
            {smallcaseAuthId && (
                <Text>Smallcase Auth ID: {smallcaseAuthId}</Text>
            )}
            {error && <Text>{error}</Text>}
        </View>
    );
};

export default SmallcaseIntegration;
