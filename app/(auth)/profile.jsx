import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Header from "@/components/profile/Header";
import Card from "@/components/profile/Card";

const Profile = () => {
    return (
        <View className="flex-1 bg-[#161616]">
            <Header />
            <Card />
        </View>
    );
};

export default Profile;
