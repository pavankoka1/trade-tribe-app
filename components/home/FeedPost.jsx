import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import VerifiedIcon from "@/icons/VerifiedIcon";
import moment from "moment";
import ThumbIcon from "@/icons/ThumbIcon";
import MessageIcon from "@/icons/MessageIcon";
import SendIcon from "@/icons/SendIcon";
import BookmarkIcon from "@/icons/BookmarkIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";
import Carousel from "react-native-reanimated-carousel";
import PostsLoader from "./PostsLoader";

const FeedPost = ({ item }) => {
    if (!item) return <PostsLoader />;

    const images = item.postDetails.mediaUrls;
    const screenWidth = Dimensions.get("window").width;

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
                        <Text className="text-primary-main font-manrope-bold text-14 leading-none h-[14px]">
                            Follow
                        </Text>
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
                <View className="overflow-hidden w-full mt-4">
                    <Carousel
                        loop
                        width={screenWidth - 32} // Set the width of the carousel based on screen width
                        height={250} // Adjust height as needed
                        autoPlay={false} // Whether to auto scroll
                        data={images} // Array of image URLs
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                resizeMode="cover" // Adjust to your needs
                                className="rounded-2xl"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    // borderRadius: 20,
                                    overflow: "hidden",
                                }} // Ensure the image fills the carousel
                            />
                        )}
                        style={{
                            borderRadius: "100px",
                        }}
                        pagingEnabled={false}
                        animationType="slide"
                    />
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
                        {item.postDetails.commentsCount}{" "}
                        {/* Assuming you want to show comments count */}
                    </Text>
                </View>
                <SendIcon />
                <BookmarkIcon />
            </View>
        </View>
    );
};

export default FeedPost;
