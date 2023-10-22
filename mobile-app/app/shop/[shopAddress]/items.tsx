import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import LoyoStatusBar from "../../../components/LoyoStatusBar";
import React, { FC, useEffect, useMemo, useState } from "react";
import loyoClient from "../../../http";
import { GetBalanceResponse, GetShopResponse } from "../../../http/features/LoyoShops";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useAccountAbstraction from "../../../hooks/useAccountAbstraction";
import { SafeAreaView } from "react-native-safe-area-context";

const Page: FC = () => {

  const { shopAddress } = useLocalSearchParams<{ shopAddress: string }>();

  const [shop, setShop] = useState<GetShopResponse>();
  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  const [giveTokenQuantity, setGiveTokenQuantity] = useState<string>();
  const [clickedShopItemIndex, setClickedShopItemIndex] = useState<number>();

  const clickedShopItem = useMemo(() => {

    if (clickedShopItemIndex === undefined) return undefined;

    return shop?.items[clickedShopItemIndex];
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
    <SafeAreaView className="flex-1 items-center justify-center">

      <Stack.Screen options={{ headerTitle: shop?.name }} />

      <View className="my-10">
        <Text className="text-xl font-bold ">{shopBalance?.balance} Credits</Text>
      </View>

      <View className="flex flex-row items-center gap-4">

        <TextInput keyboardType="numeric" onChangeText={setGiveTokenQuantity} placeholder="Quantity" />

        <Button disabled={Boolean(giveTokenQuantity) === false} title="Give" onPress={() => {
          router.push({ pathname: "/shop/[shopAddress]/send/[amount]", params: { shopAddress, amount: giveTokenQuantity } })
        }} />
      </View>

      <FlatList
        className="w-full"
        data={shop?.items}
        renderItem={({ item, index }) => (
          <TouchableOpacity className="flex flex-row justify-between px-6 py-2" onPress={async () => {
            setClickedShopItemIndex(index);
          }}>

            <Text className="text-lg font-semibold">{item.name}</Text>

            <View className="flex flex-row gap-5 items-center">

              <Text className="text-primary">{item.price} credits</Text>

              <FontAwesome size={20} name="shopping-cart" />
            </View>
          </TouchableOpacity>
        )}
      />

      <View className="flex flex-row justify-center items-center">

        <Modal animationType="fade" visible={clickedShopItemIndex !== undefined} onRequestClose={() => {
          setClickedShopItemIndex(undefined);
        }}>

          {clickedShopItem && <>

            <View className="flex">

              <View className="">
                <Text className="block text-3xl">You want to buy {clickedShopItem?.name}</Text>
                <Text className="text-lg">{clickedShopItem?.price} credits will be deducted from your balance.</Text>
              </View>

              <View className="flex flex-row">

                <Button title="Spend" onPress={async () => {

                  if (keyPair && shopAddress) {

                    try {

                      await loyoClient.prebundler.spendLoyalty(keyPair.privateKey, shopAddress, shopAddress, clickedShopItem.price.toString());

                      const balance = await loyoClient.shops.getBalance(keyPair.publicKey, shopAddress);

                      setShopBalance(balance);
                    }
                    catch (e) {
                      // ignore
                    }
                    finally {
                      setClickedShopItemIndex(undefined);
                    }
                  }
                }} />

                <Button
                  title="Cancel"
                  onPress={() => {

                    setClickedShopItemIndex(undefined);
                  }} />
              </View>
            </View>
          </>}

        </Modal>

      </View>
      <LoyoStatusBar />
    </SafeAreaView>
  );
};

export default Page;