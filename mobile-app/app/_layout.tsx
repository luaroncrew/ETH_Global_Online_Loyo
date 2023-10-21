import { View } from "react-native"

import { FC } from "react"

import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";

const Layout: FC = ({ }) => {
    return <View>
        <Slot />
        <StatusBar style="auto" />
    </View>;
};

export default Layout;