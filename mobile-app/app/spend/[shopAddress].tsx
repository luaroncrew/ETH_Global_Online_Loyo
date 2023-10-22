import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import LoyoStatusBar from "../../components/LoyoStatusBar";
import React, { FC, useEffect, useMemo, useState } from "react";
import loyoClient from "../../http";
import { GetBalanceResponse, GetShopResponse } from "../../http/features/LoyoShops";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useAccountAbstraction from "../../hooks/useAccountAbstraction";

const Page: FC = () => {

  const { shopAddress } = useLocalSearchParams<{ shopAddress: string }>();

  const [shop, setShop] = useState<GetShopResponse>();
  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  const [giveQuantity, setGiveQuantity] = useState<string>();
  const [clickedShopItemIndex, setClickedShopItemIndex] = useState<number>();

  const clickedShopItem = useMemo(() => {

    if (clickedShopItemIndex)
      return shop?.items[clickedShopItemIndex];

    return undefined;
  }, [shop, clickedShopItemIndex]);

  const { keyPair } = useAccountAbstraction();

  useEffect(() => {

    if (keyPair) {

      if (shopAddress) {

        loyoClient.shops.getOne(shopAddress).then(setShop);
        loyoClient.shops.getBalance(keyPair.publicKey, shopAddress).then(setShopBalance);
      }
    }

  }, [keyPair, shopAddress]);

  return (
    <View className="flex-1 items-center">
      <Stack.Screen options={{ headerTitle: shop?.name }} />
      <Text className="text-xl font-bold my-10">{shopBalance?.balance} Credits</Text>
      <View className="flex flex-col">
        <TextInput onChangeText={setGiveQuantity} placeholder="Quantity" />
        <Link href={{ pathname: "give/[amount]", params: { amount: giveQuantity } }} />
      </View>
      <FlatList
        className="w-full"
        data={shop?.items}
        renderItem={({ item, index }) => (
          <Pressable className="flex-1 flex flex-row justify-between px-6 py-2" onPress={async () => {
            setClickedShopItemIndex(index);
          }}>
            <Text className="text-lg font-semibold">{item.name}</Text>
            <View className="flex flex-row gap-5 items-center">
              <Text className="text-primary">{item.price} credits</Text>
              <FontAwesome size={20} name="shopping-cart" />
            </View>
          </Pressable>
        )}
      />
      {clickedShopItem &&
        <View className="flex flex-row mx-auto">

          <Pressable onPress={async () => {

            if (keyPair && shopAddress) {

              await loyoClient.prebundler.spendLoyalty(keyPair.privateKey, shopAddress, shopAddress, clickedShopItem.price.toString());

              const balance = await loyoClient.shops.getBalance(keyPair.publicKey, shopAddress);

              setShopBalance(balance);

              setClickedShopItemIndex(undefined);
            }
          }}>
            <Text>Buy ${clickedShopItem.name} for ${clickedShopItem.price} credits</Text>
          </Pressable>
        </View>
      }
      <LoyoStatusBar />
    </View>
  );
};

export default Page;