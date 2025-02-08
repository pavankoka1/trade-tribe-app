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

const Create = () => {
    const navigation = useNavigation();
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);

    const { searchText, users, setSearchText } = useGetUsers();

    return (
        <View className="flex-1 px-4 bg-[#161616] py-5 gap-4">
            <View className="flex flex-row items-center">
                <TouchableOpacity
                    className="items-center justify-center"
                    onPress={() => {
                        console.log("pressed");
                        router.replace("/(auth)/home");
                    }}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <Text className="font-manrope-bold text-16 text-white tracking-wide ml-6 leading-[20px] mr-auto text-center">
                    Create New post
                </Text>
                <Button
                    className="ml-auto mr-3"
                    onPress={() => {
                        console.log("pressed");
                        router.replace("/");
                    }}
                >
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
            <ImageUploader>
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
                    <Text className="font-manrope text-12 text-[#b1b1b1] leading-1">
                        Use @ to mention a user
                    </Text>
                </View>
            </MultiSelectSearch>
        </View>
    );
};

export default Create;
