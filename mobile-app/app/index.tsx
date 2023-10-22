import { FlatList, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { FC, useEffect, useState } from "react";
import useAccountAbstraction from "../hooks/useAccountAbstraction";
import loyoClient from "../http";
import { GetBalanceResponse, GetShopsResponse } from "../http/features/LoyoShops";

const ShopBalance: FC<{ shopAddress: string }> = ({ shopAddress }) => {
  const { keyPair } = useAccountAbstraction();

  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  useEffect(() => {
    if (keyPair) {
      if (shopAddress) {
        loyoClient.shops
          .getBalance(keyPair.publicKey, shopAddress)
          .then(setShopBalance);
      }
    }
  }, [keyPair, shopAddress]);

  return (
    <View className="flex flex-row items-center gap-5">
      <Text className="text-lg text-primary">{shopBalance?.balance}</Text>
      <FontAwesome
        size={20}
        name="credit-card"
        style={{
          opacity: shopBalance?.fidelity?.length ? 1 : 0.2,
        }}
      />
    </View>
  );
};

export default function SpendTokensTab() {
  const [shops, setShops] = useState<GetShopsResponse>();

  useEffect(() => {
    loyoClient.shops.getMany().then((shops) => {
      setShops(shops);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 relative">
      <Text className="text-3xl text-center font-bold mt-4 mb-8">
        Welcome on Loyo
      </Text>
      <Link href={"/account/receive"} className="z-10 absolute bottom-5 right-5">
        <View className="h-20 w-20 bg-white rounded-full shadow-md flex items-center justify-center">
          <FontAwesome size={48} name="qrcode" />
        </View>
      </Link>
      <FlatList
        data={shops}
        renderItem={({ item: shop }) => (
          <Link
            href={{
              pathname: "/shop/[shopAddress]/items",
              params: { shopAddress: shop.address },
            }}
            asChild
          >
            <Pressable
              className="flex-1 flex flex-row justify-between px-6 py-2"
              style={{ borderColor: "rgba(0,0,0,0.5)" }}
            >
              <Text className="text-xl font-semibold">{shop.name}</Text>
              <ShopBalance shopAddress={shop.address} />
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
