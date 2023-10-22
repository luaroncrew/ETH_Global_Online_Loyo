import { useLocalSearchParams } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";
import LoyoStatusBar from "../../components/LoyoStatusBar";
import { FC, useEffect, useState } from "react";
import loyoClient from "../../http";
import { GetBalanceResponse, GetShopResponse } from "../../http/features/LoyoShops";

const Page: FC = () => {

  const { shopAddress } = useLocalSearchParams<{ shopAddress: string }>();

  const [shop, setShop] = useState<GetShopResponse>();
  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  useEffect(() => {

    if (shopAddress) {

      loyoClient.shops.getOne(shopAddress).then(setShop);
      loyoClient.shops.getBalance(shopAddress).then(setShopBalance);
    }
  }, [shopAddress]);

  return (
    <View className="flex-1 items-center pt-6">
      <Text className="text-3xl font-bold mb-4">{shop?.name}</Text>
      <Text className="text-xl">{shopBalance?.balance}</Text>
      <FlatList
        className="flex-1 w-full"
        data={shop?.items}
        renderItem={({ item }) => (
          <View className="flex-1 flex flex-row justify-between px-6 py-2">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-lg text-primary">{item.price}</Text>
          </View>
        )}
      />
      <LoyoStatusBar />
    </View>
  );
};

export default Page;