import {
    View,
    TextInput,
    FlatList,
    Text,
    Dimensions,
    Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import ArrowIcon from "@/icons/ArrowIcon";
import * as Animatable from "react-native-animatable";
import SearchIcon from "@/icons/SearchIcon";
import network from "@/network";
import { TabBar, TabView } from "react-native-tab-view";
import UserList from "@/components/search/UserList";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Search = () => {
    const router = useRouter();
    const timerRef = useRef();

    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [list, setList] = useState([]);

    const [routes] = useState([
        { key: "people", title: "People" },
        { key: "stocks", title: "Stocks" },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "people":
            case "stocks":
                return <UserList query={query} />;
            default:
                return null;
        }
    };

    const handleSearch = (text) => {
        setQuery(text);

        // Clear the previous timeout if it exists
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set a new timeout
        timerRef.current = setTimeout(async () => {
            if (text.trim()) {
                try {
                    const response = await network.get(
                        `https://query2.finance.yahoo.com/v1/finance/search?q=${text.trim()}*`
                    );
                    console.log(response);
                    setList(response.quotes || []); // Adjust based on the structure of the response
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } else {
                setList([]); // Clear the list if the query is empty
            }
        }, 300); // Adjust the debounce delay as needed
    };

    return (
        <View className="flex-1 py-0 px-4">
            <View className="flex flex-row gap-4 items-center my-3 px-4">
                <Pressable
                    onPress={() => {
                        router.replace("/(auth)/home");
                    }}
                >
                    <ArrowIcon />
                </Pressable>
                <View className="flex gap-3 flex-row border border-[#1F2023] bg-[#1F1F1F] rounded-3xl flex-1 items-center py-3 px-4">
                    <SearchIcon />
                    <TextInput
                        className="flex-1 h-5 text-white"
                        placeholder="Search"
                        placeholderTextColor="#B1B1B1"
                        value={query}
                        onChangeText={handleSearch}
                        cursorColor="#B4EF02"
                    />
                </View>
            </View>

            <View className="flex-1 bg-[#161616]">
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={{
                                backgroundColor: "#b4ef02",
                                height: 3,
                            }}
                            style={{
                                backgroundColor: "transparent",
                                paddingVertical: 8,
                            }}
                            labelStyle={{ color: "white" }}
                            contentContainerStyle={{ elevation: 0 }}
                            className="font-manrope-bold text-14"
                        />
                    )}
                    swipeEnabled={true}
                    lazy
                />
            </View>
        </View>
    );
};

export default Search;
