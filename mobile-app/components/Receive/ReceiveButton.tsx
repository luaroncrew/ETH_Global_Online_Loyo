import { router } from "expo-router";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ReceiveButton: FC = () => {

    return <TouchableOpacity onPress={() => {
        router.push("/receive")
    }}>
        <FontAwesome size={20} name="qrcode" />
    </TouchableOpacity>
};

export default ReceiveButton;