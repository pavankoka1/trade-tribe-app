import { View, Text } from "react-native";
import React from "react";
import useUserStore from "@/hooks/useUserStore";

const Card = () => {
    const { details } = useUserStore();

    console.log(details);

    return (
        <View>
            <Text>Card</Text>
        </View>
    );
};

export default Card;
