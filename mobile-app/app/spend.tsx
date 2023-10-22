import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { shopData } from "../constants/data";
import LoyoStatusBar from "../components/LoyoStatusBar";
import { FC } from "react";

const Page: FC = () => {
  const shop = useLocalSearchParams();

  return (
    <View className="flex-1 items-center pt-6">
      <Text className="text-3xl font-bold mb-4">{shop.name}</Text>
      <Text className="text-xl">{shop.balance}</Text>
      <FlatList
        className="flex-1 w-full"
        data={shopData[shop.id as keyof typeof shopData]?.items}
        renderItem={({ item }) => (
          <View className="flex-1 flex flex-row justify-between px-6 py-2">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-lg text-primary">{item.price}</Text>
          </View>
        )}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <LoyoStatusBar />
    </View>
  );
};

export default Page;