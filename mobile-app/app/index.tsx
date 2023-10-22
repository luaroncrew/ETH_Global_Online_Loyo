import { FlatList, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { FC, useEffect, useState } from "react";
import loyoClient from "../http";
import { GetBalanceResponse, GetShopsResponse } from "../http/features/LoyoShops";

const ShopBalance: FC<{ shopAddress: string }> = ({ shopAddress }) => {

  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  useEffect(() => {

    if (shopAddress) {

      loyoClient.shops.getBalance(shopAddress).then(setShopBalance);
    }
  }, [shopAddress]);

  return <View className="flex flex-row items-center">
    <FontAwesome
      size={20}
      name="credit-card"
      style={{
        marginRight: 16,
        opacity: shopBalance?.fidelity?.length ? 1 : 0.1,
      }}
    />
    <Text className="text-base text-primary">{shopBalance?.balance}</Text>
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
              className="flex flex-row justify-between py-4 px-6 items-baseline"
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
