import { StatusBar } from "expo-status-bar"
import { FC } from "react"
import { Platform } from "react-native"

const LoyoStatusBar: FC = () => {

    return <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
};

export default LoyoStatusBar;