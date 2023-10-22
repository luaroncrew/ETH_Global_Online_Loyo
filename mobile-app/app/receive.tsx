import { FC } from "react";
import { View, Text } from "react-native";

import QrCode from "../components/QrCode";
import LoyoStatusBar from "../components/LoyoStatusBar";

const Page: FC = () => {
  return (
    <View className="flex flex-grow items-center">
      <Text className="mt-14 mb-8 text-3xl font-bold text-primary">
        Receive loyalties !
      </Text>

      <QrCode className="w-48 h-48" />
      <Text className="mt-4 text-lg text-center px-6">
        Scan this QR Code to give your address and receive fidelity tokens
      </Text>
      <LoyoStatusBar />
    </View>
  );
};

export default Page;
