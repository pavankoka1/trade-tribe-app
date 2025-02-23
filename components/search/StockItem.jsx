import {
    View,
    Text,
    TouchableNativeFeedback,
    Image,
    Pressable,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import VerifiedIcon from "@/icons/VerifiedIcon";
import clsx from "clsx";
import replacePlaceholders from "@/utils/replacePlaceholders";
import useUserStore from "@/hooks/useUserStore";
import network from "@/network";
import API_PATHS from "@/network/apis";
import StockDetailsBottomSheet from "./StockDetailsBottomSheet";

function StockItem({ stock }) {
    const [openStockDetailsSheet, setOpenStockDetailsSheet] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setOpenStockDetailsSheet(true)}>
                <View className="border-b border-[#1F2023] py-2 flex flex-row items-center">
                    <Image
                        source={{
                            uri:
                                "https://picsum.photos/40/40?random=" +
                                Math.floor(Math.random() * 10000),
                        }}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                    />
                    <View className="flex flex-col">
                        <View className="flex flex-row gap-1 items-center mb-[2px]">
                            <Text className="font-manrope-bold text-12 text-white">
                                {stock.instrument_name}
                            </Text>
                            <VerifiedIcon />
                        </View>
                        <Text className="text-[#b4ef02] font-manrope-medium text-10">
                            {stock.symbol} - {stock.country}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <StockDetailsBottomSheet
                isOpen={openStockDetailsSheet}
                onClose={() => setOpenStockDetailsSheet(false)}
                symbol={stock.symbol}
            />
        </View>
    );
}

export default StockItem;
