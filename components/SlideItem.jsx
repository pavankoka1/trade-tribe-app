import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export const SlideItem = (props) => {
    const {
        style,
        index = 0,
        rounded = false,
        testID,
        ...animatedViewProps
    } = props;

    const source = useMemo(() => props.source, [index, props.source]);

    return (
        <Animated.View
            testID={testID}
            style={{ flex: 1 }}
            {...animatedViewProps}
        >
            <Animated.Image
                style={[
                    style,
                    styles.container,
                    rounded && { borderRadius: 15 },
                ]}
                source={{
                    uri: source,
                }}
                resizeMode="cover"
            />
            {/* <View style={styles.overlay}>
                <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>{index}</Text>
                </View>
            </View> */}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    overlayTextContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 10,
        minWidth: 40,
        minHeight: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});
