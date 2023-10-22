import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { BarCodeScannedCallback, BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import LoyoStatusBar from "../../../../components/LoyoStatusBar";
import React, { FC, useCallback, useEffect, useState } from "react";
import loyoClient from "../../../../http";
import { GetShopResponse } from "../../../../http/features/LoyoShops";
import useAccountAbstraction from "../../../../hooks/useAccountAbstraction";

const Page: FC = () => {

  const { shopAddress, amount } = useLocalSearchParams<{ shopAddress: string, amount: string }>();

  const [shop, setShop] = useState<GetShopResponse>();

  const { keyPair } = useAccountAbstraction();

  useEffect(() => {

    if (shopAddress) {

      loyoClient.shops.getOne(shopAddress).then(setShop);
    }
  }, [shopAddress]);


  const [hasPermission, setHasPermission] = useState<boolean>();

  useEffect(() => {

    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasPermission(status === PermissionStatus.GRANTED);
    });
  }, []);

  const onBarCodeScanned: BarCodeScannedCallback = useCallback(async ({ data }) => {

    if (keyPair && shop && amount) {

      try {
        await loyoClient.prebundler.spendLoyalty(keyPair.privateKey, data, shop.address, amount);
      }
      catch (e) {
        // ignore
      }
      finally {
        
        router.back();
      }
    }
  }, [shop, keyPair, amount]);

  return (
    <View className="flex-1 items-center">
      <Stack.Screen options={{ headerTitle: shop?.name }} />

      <Text className="text-xl font-bold my-10">Send {amount} credits</Text>

      {hasPermission ? <BarCodeScanner onBarCodeScanned={onBarCodeScanned} /> : <Text>Permission denied to camera</Text>}

      <LoyoStatusBar />
    </View>
  );
};

export default Page;