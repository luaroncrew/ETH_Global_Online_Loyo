import { Text, View } from "react-native";

import LoyoAccountQrCode from "../../components/LoyoAccountQrCode";


const Page = () => {
  return <View className="flex-1 items-center justify-center">
    <LoyoAccountQrCode />
    <Text className="text-xl font-bold">QR Code</Text>
  </View>;
};

export default Page;
