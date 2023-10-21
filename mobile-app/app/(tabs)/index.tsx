import { Text, View } from "react-native";

import EthWalletQrCode from "../../components/EthWalletQrCode";


const Page = () => {
  return <View className="flex-1 items-center justify-center">
    <EthWalletQrCode />
    <Text className="text-xl font-bold">QR Code</Text>
  </View>;
};

export default Page;
