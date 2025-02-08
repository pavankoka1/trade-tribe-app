import React, { useEffect, useState } from "react";
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    Animated,
    Pressable,
} from "react-native";
import PropTypes from "prop-types";
import CloseIcon from "@/icons/CloseIcon"; // Adjust the import path as necessary
import { Easing } from "react-native"; // Import Easing

const BottomSheet = ({
    isOpen,
    className,
    onClose,
    children,
    closeOnOverlayClick = true,
}) => {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [translateY] = useState(new Animated.Value(300)); // Start off-screen

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 400, // Duration for opening
                easing: Easing.out(Easing.cubic), // Easing function for smoother opening
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: 300,
                duration: 300, // Duration for closing
                easing: Easing.in(Easing.quad), // Easing function for smoother closing
                useNativeDriver: true,
            }).start(() => setIsVisible(false));
        }
    }, [isOpen]);

    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose();
        }
    };

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={handleOverlayClick}>
                <View className="flex-1 justify-end bg-[#161616] bg-opacity-50">
                    <Animated.View
                        style={[{ transform: [{ translateY }] }]}
                        className={`bg-[#161616] w-full rounded-t-lg pt-5 px-4 shadow-lg ${className}`}
                    >
                        <Pressable
                            onPress={onClose}
                            className="absolute top-4 right-4"
                        >
                            <CloseIcon />
                        </Pressable>
                        {children}
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

BottomSheet.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    closeOnOverlayClick: PropTypes.bool,
};

export default BottomSheet;
