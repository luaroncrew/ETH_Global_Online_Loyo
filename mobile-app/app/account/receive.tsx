import { FC } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QrCode from "../../components/QrCode";
import LoyoStatusBar from "../../components/LoyoStatusBar";

const Page: FC = () => {
  return (
    <SafeAreaView className="flex-1 flex-grow ">
      <LinearGradient
        colors={["#0099F8", "#fff"]}
        className="flex-1 items-center"
      >
        <Text className="mt-14 mb-8 text-3xl font-bold">
          Receive loyalties !
        </Text>

        <QrCode className="w-48 h-48" />
        <Text className="mt-4 text-lg text-center px-6">
          Scan this QR Code to give your address and receive fidelity tokens
        </Text>
        <LoyoStatusBar />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Page;
