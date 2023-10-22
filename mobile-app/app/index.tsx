import { FlatList, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { FC, useEffect, useState } from "react";
import loyoClient from "../http";
import { GetBalanceResponse, GetShopsResponse } from "../http/features/LoyoShops";
import useAccountAbstraction from "../hooks/useAccountAbstraction";

const ShopBalance: FC<{ shopAddress: string }> = ({ shopAddress }) => {

  const { keyPair } = useAccountAbstraction();

  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  useEffect(() => {

    if (keyPair) {

      if (shopAddress) {

        loyoClient.shops.getBalance(keyPair.publicKey, shopAddress).then(setShopBalance);
      }
    }

  }, [keyPair, shopAddress]);

  return <View className="flex flex-row items-center gap-5">
    <Text className="text-base text-primary">{shopBalance?.balance}</Text>
    <FontAwesome
      size={20}
      name="credit-card"
      style={{
        opacity: shopBalance?.fidelity?.length ? 1 : 0.2
      }}
    />
  </View>
}

export default function SpendTokensTab() {

  const [shops, setShops] = useState<GetShopsResponse>();

  useEffect(() => {

    loyoClient.shops.getMany().then((shops) => {

      setShops(shops);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Link href={"/receive"}>Receive</Link>
      <FlatList
        data={shops}
        renderItem={({ item: shop }) => (
          <Link href={{ pathname: "/spend/[shopAddress]", params: { shopAddress: shop.address } }} asChild>
            <Pressable
              className="flex-1 flex flex-row justify-between px-6 py-2"
              style={{ borderColor: "rgba(0,0,0,0.5)" }}
            >
              <Text className="text-lg font-semibold">{shop.name}</Text>
              <ShopBalance shopAddress={shop.address} />
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
