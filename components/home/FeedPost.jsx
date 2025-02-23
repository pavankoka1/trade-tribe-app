import { View, Text, Image, Dimensions } from "react-native";
import React, { useRef } from "react";
import VerifiedIcon from "@/icons/VerifiedIcon";
import moment from "moment";
import ThumbIcon from "@/icons/ThumbIcon";
import MessageIcon from "@/icons/MessageIcon";
import SendIcon from "@/icons/SendIcon";
import BookmarkIcon from "@/icons/BookmarkIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import PostsLoader from "./PostsLoader";
import { renderItem } from "@/utils/rendeItem";
import { useAdvancedSettings } from "@/hooks/useSettings";
import { SlideItem } from "../SlideItem";
import useUserStore from "@/hooks/useUserStore";

const FeedPost = ({ item }) => {
    if (!item) return <PostsLoader />;

    const carouselRef = useRef(null);
    const progress = useSharedValue(0);
    const images = item.postDetails.mediaUrls;
    const screenWidth = Dimensions.get("window").width;

    const { followers } = useUserStore();

    const { advancedSettings, onAdvancedSettingsChange } = useAdvancedSettings({
        // These values will be passed in the Carousel Component as default props
        defaultSettings: {
            autoPlay: false,
            autoPlayInterval: 2000,
            autoPlayReverse: false,
            data: images,
            height: 258,
            loop: true,
            pagingEnabled: true,
            snapEnabled: true,
            vertical: false,
            width: screenWidth - 32,
        },
    });

    return (
        <View className="py-6 px-4 border-b border-[2px] border-[#1F2023]">
            <View className="flex flex-row items-center mr-2 mb-4">
                <Image
                    width={40}
                    height={40}
                    source={{ uri: item.postAuthorDetails.profilePictureUrl }}
                    className="rounded-full mr-2"
                />
                <View className="flex flex-col gap-1 mr-auto">
                    <View className="flex flex-row items-center">
                        <Text className="font-manrope-bold text-14 text-white leading-none h-[14px]">
                            {item.postAuthorDetails.name}
                        </Text>
                        <VerifiedIcon />
                        <View className="mx-2 h-1 w-1 rounded-full bg-[#b1b1b1]" />
                        {!followers.includes(item.postAuthorDetails.id) ? (
                            <Text className="text-primary-main font-manrope-bold text-14 leading-none h-[14px]">
                                Follow
                            </Text>
                        ) : null}
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className="font-manrope text-10 text-[#26F037]">
                            Portfolio - ₹8.6L
                        </Text>
                        <View className="mx-2 h-1 w-1 mt-1 rounded-full bg-[#b1b1b1]" />
                        <Text className="text-[#b1b1b1] font-manrope-medium text-10">
                            {moment(item.postDetails.createdAt).format(
                                "h:mm a"
                            )}
                        </Text>
                    </View>
                </View>
                <ThreeDotsIcon />
            </View>
            {item.postDetails.content && (
                <Text
                    className="font-manrope text-white text-14"
                    style={{ fontSize: 20, color: "white" }}
                >
                    {item.postDetails.content}
                </Text>
            )}

            {images?.length ? (
                <View className="w-full mt-4">
                    <Carousel
                        ref={carouselRef}
                        autoPlayInterval={2000}
                        data={images}
                        height={220}
                        loop={images.length > 1}
                        pagingEnabled={true}
                        snapEnabled={true}
                        width={screenWidth - 32}
                        style={{ width: screenWidth - 32 }}
                        onProgressChange={progress}
                        renderItem={({ item, index }) => (
                            <SlideItem
                                source={item}
                                key={index}
                                index={index}
                                rounded={true}
                            />
                        )}
                    />

                    {images.length > 1 && (
                        <Pagination.Basic
                            progress={progress}
                            length={images.length}
                            data={images}
                            containerStyle={{
                                position: "relative",
                                alignSelf: "center",
                                marginBottom: 10,
                                marginTop: 16,
                            }}
                            dotStyle={{
                                width: 25,
                                height: 4,
                                backgroundColor: "#b1b1b1",
                                marginHorizontal: 4,
                            }}
                            activeDotStyle={{
                                width: 25,
                                height: 4,
                                backgroundColor: "#b4ef02",
                            }}
                        />
                    )}
                </View>
            ) : null}
            <View className="flex flex-row items-center mt-3 gap-4">
                <View className="flex flex-row items-center">
                    <ThumbIcon />
                    <Text className="font-manrope-medium text-12 text-white ml-1">
                        {item.postDetails.likesCount}
                    </Text>
                </View>
                <View className="flex flex-row items-center mr-auto">
                    <MessageIcon />
                    <Text className="font-manrope-medium text-12 text-white ml-1 mr-auto">
                        {item.postDetails.commentsCount}
                    </Text>
                </View>
                <SendIcon />
                <BookmarkIcon />
            </View>
        </View>
    );
};

export default FeedPost;
