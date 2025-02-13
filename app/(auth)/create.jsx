import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CloseIcon from "@/icons/CloseIcon";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ImageIcon from "@/icons/ImageIcon";
import ImageUploader from "@/components/ImageUploader";
import MultiSelectSearch from "@/components/MultiSelectSearch";
import PersonIcon from "@/icons/PersonIcon";
import useGetUsers from "@/hooks/useGetUsers";
import clsx from "clsx";
import * as SecureStore from "expo-secure-store";
import { HEADERS_KEYS } from "@/network/constants";
import network from "@/network";
import API_PATHS from "@/network/apis";

const Create = () => {
    const navigation = useNavigation();
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);

    const { searchText, users, setSearchText } = useGetUsers();

    console.log(tags, images);

    function handleSubmit() {
        const userId = SecureStore.getItem(HEADERS_KEYS.USER_ID);
        if (!content || !images.length) return null;

        network
            .post(API_PATHS.createPost, {
                userId,
                content: text,
                mediaUrls: images.map((img) => img.publicUrl),
                taggedUserIdList: tags.map((tag) => tag.id),
            })
            .then((res) => {
                console.log(res);
                router.replace("/(auth)/home");
            })
            .catch((err) => console.error(err.message));
    }

    return (
        <View className="flex-1 px-4 bg-[#161616] py-5 gap-4">
            <View className="flex flex-row items-center">
                <TouchableOpacity
                    className="items-center justify-center"
                    onPress={() => router.replace("/(auth)/home")}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <Text className="font-manrope-bold text-16 text-white tracking-wide ml-6 leading-[20px] mr-auto text-center">
                    Create New post
                </Text>
                <Button className="ml-auto mr-3" onPress={handleSubmit}>
                    Post Now
                </Button>
            </View>
            <View className="flex flex-row items-center ml-[2px]">
                <View className="h-6 bg-primary-main w-[2px]" />
                <TextInput
                    mode="flat"
                    placeholder="Post your views, data or charts..."
                    placeholderTextColor="#b1b1b1"
                    textColor="#fff"
                    fontSize={20}
                    underlineStyle={{
                        display: "none",
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        borderBottomWidth: 0,
                        border: "none",
                        color: "#fff",
                        fontFamily: "Manrope",
                        fontSize: 14,
                    }}
                    value={text}
                    onChangeText={setText} // Use onChangeText for TextInput
                />
            </View>
            <ImageUploader images={images} setImages={setImages}>
                <View className="flex flex-row items-center gap-2">
                    <ImageIcon />
                    <Text className="font-manrope text-12 text-[#b1b1b1] leading-1">
                        Add up to 4 Images
                    </Text>
                </View>
            </ImageUploader>
            <MultiSelectSearch
                data={users}
                selectedItems={tags}
                setSelectedItems={setTags}
                searchText={searchText}
                setSearchText={setSearchText}
                placeholder="Use @ to mention a user"
            >
                <View className="flex flex-row items-center gap-2">
                    <PersonIcon color="#b1b1b1" size={18} />
                    <Text
                        className={clsx("font-manrope text-12 leading-1", {
                            "text-[#b1b1b1]": !tags.length,
                            "text-white": !!tags.length,
                        })}
                    >
                        {tags.length
                            ? tags.map((tag) => "@" + tag.nickname).join(", ")
                            : "Use @ to mention a user"}
                    </Text>
                </View>
            </MultiSelectSearch>
        </View>
    );
};

export default Create;
