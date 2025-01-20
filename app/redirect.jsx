import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const RedirectURL = () => {
    return <Redirect href={"/"} />;
};

export default RedirectURL;
