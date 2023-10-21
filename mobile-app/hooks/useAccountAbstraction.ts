import { useCallback, useEffect, useState } from "react";

import {
  CryptoDigestAlgorithm,
  digestStringAsync,
  getRandomBytes,
} from "expo-crypto";

import { getItemAsync, setItemAsync } from "expo-secure-store";
import { loyoClient } from "../http";

const PUBLIC_KEY = "PUBLIC_KEY";
const PRIVATE_KEY = "PRIVATE_KEY";

const useAccountAbstraction = () => {

  const [keyPair, setKeyPair] = useState<{
    privateKey: string;
    publicKey: string;
  }>();

  // Recover public en private keys
  const initWallet = useCallback(async () => {

    const publicKey = await getItemAsync(PUBLIC_KEY);

    if (publicKey) {

      const privateKey = await getItemAsync(PRIVATE_KEY);

      if (privateKey) {

        setKeyPair({
          privateKey,
          publicKey,
        });
      }
      else {
        // Should never happen
      }
    }
    else {

      const privateKey = await digestStringAsync(CryptoDigestAlgorithm.SHA256, getRandomBytes(64).toString());

      const { publicKey } = await loyoClient.accounts.setupWallet(privateKey);

      setKeyPair({
        privateKey,
        publicKey,
      });
    }
  }, []);

  // Store public en private keys
  useEffect(() => {

    if (keyPair) {

      setItemAsync(PUBLIC_KEY, keyPair.publicKey);
      setItemAsync(PRIVATE_KEY, keyPair.privateKey);
    }
  }, [keyPair]);

  return {
    keyPair,
    initWallet,
  };
};

export default useAccountAbstraction;
