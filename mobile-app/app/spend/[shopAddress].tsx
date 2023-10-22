import { useLocalSearchParams } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";
import LoyoStatusBar from "../../components/LoyoStatusBar";
import React, { FC, useEffect, useState } from "react";
import loyoClient from "../../http";
import { GetBalanceResponse, GetShopResponse } from "../../http/features/LoyoShops";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useAccountAbstraction from "../../hooks/useAccountAbstraction";

const Page: FC = () => {

  const { shopAddress } = useLocalSearchParams<{ shopAddress: string }>();

  const [shop, setShop] = useState<GetShopResponse>();
  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  const { keyPair } = useAccountAbstraction();

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
            <TouchableOpacity onPress={async () => {

              if (shopAddress) {

                if (keyPair) {

                  await loyoClient.prebundler.spendLoyalty(keyPair.privateKey, shopAddress, shopAddress, item.price.toString());

                  const balance = await loyoClient.shops.getBalance(shopAddress);

                  setShopBalance(balance);
                }
              }
            }}>
              <View className="flex flex-row gap-5 items-center">
                <Text className="text-lg text-primary">{item.price}</Text>
                <FontAwesome size={20} name="shopping-cart" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <LoyoStatusBar />
    </View>
  );
};

export default Page;