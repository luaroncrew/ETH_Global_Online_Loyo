import { Link, router } from "expo-router";
import { FC, useCallback } from "react";
import { Platform, View } from "react-native";

import QrCode from "../components/QrCode";
import { StatusBar } from "expo-status-bar";

const Page: FC = () => {

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        {router.canGoBack() && <Link href="../">Dismiss</Link>}

        <QrCode />

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>;
};

export default Page;