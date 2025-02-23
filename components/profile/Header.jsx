import { View, Text } from "react-native";
import React from "react";
import ArrowIcon from "@/icons/ArrowIcon";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import SettingsIcon from "@/icons/SettingsIcon";

const Header = () => {
    const router = useRouter();

    return (
        <View className="flex flex-row items-center my-3 py-5 pl-2 pr-4">
            <Button
                onPress={() => {
                    router.replace("/(auth)/home");
                }}
                className="m-0 p-0"
                style={{ minWidth: 0 }}
            >
                <ArrowIcon />
            </Button>
            <Text className="ml-2 font-manrope-bold text-14 text-white leading-[20px] mr-auto">
                Profile
            </Text>
            <SettingsIcon />
        </View>
    );
};

export default Header;
