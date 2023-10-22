import { FC } from "react";
import { View, Text } from "react-native";

import QrCode from "../components/QrCode";
import LoyoStatusBar from "../components/LoyoStatusBar";

const Page: FC = () => {

    return <View className="flex flex-grow align-middle justify-center">

        <View className="mb-8">
            <Text className="text-3xl font-bold mb-4">
                Receive loyalties !
            </Text>
        </View>

        <View className="block m-auto">
            <QrCode className="w-48 h-48" />
        </View>

        <LoyoStatusBar />
    </View>;
};

export default Page;