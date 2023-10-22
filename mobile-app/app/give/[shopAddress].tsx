import { Stack, useLocalSearchParams } from "expo-router";
import { Button, FlatList, Pressable, Text, View } from "react-native";
import { BarCodeScannedCallback, BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import LoyoStatusBar from "../../components/LoyoStatusBar";
import React, { FC, useCallback, useEffect, useState } from "react";
import loyoClient from "../../http";
import { GetBalanceResponse, GetShopResponse } from "../../http/features/LoyoShops";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useAccountAbstraction from "../../hooks/useAccountAbstraction";

const Page: FC = () => {

  const { shopAddress } = useLocalSearchParams<{ shopAddress: string }>();

  const [shop, setShop] = useState<GetShopResponse>();
  const [shopBalance, setShopBalance] = useState<GetBalanceResponse>();

  const [clickedShopItem, setClickedShopItem] = useState<number>();

  const { keyPair } = useAccountAbstraction();

  useEffect(() => {

    if (keyPair) {

      if (shopAddress) {

        loyoClient.shops.getOne(shopAddress).then(setShop);
        loyoClient.shops.getBalance(keyPair.publicKey, shopAddress).then(setShopBalance);
      }
    }

  }, [keyPair, shopAddress]);

  
  const [hasPermission, setHasPermission] = useState<boolean>();

  useEffect(() => {

    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasPermission(status === PermissionStatus.GRANTED);
    });
  }, []);

  const onBarCodeScanned: BarCodeScannedCallback = useCallback(({ data }) => {
    
  }, []);


  return (
    <View className="flex-1 items-center">
      <Stack.Screen options={{ headerTitle: shop?.name }} />

      {hasPermission ? <BarCodeScanner onBarCodeScanned={onBarCodeScanned} /> : <Text>Permission denied to camera</Text>}

      <LoyoStatusBar />
    </View>
  );
};

export default Page;