import { Text, View } from "react-native";
// import QrCode from "../src/components/QrCode";

export default function QrCodeTab() {
  return (
    <View className="flex-1 items-center justify-center">
      {/* <QrCode address="test" /> */}
      <Text className="text-xl font-bold">QR Code</Text>
    </View>
  );
}