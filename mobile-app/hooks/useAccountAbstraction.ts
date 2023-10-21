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
  useEffect(() => {
    const init = async () => {

      const publicKey = await getItemAsync(PUBLIC_KEY);

      if (publicKey) {

        const privateKey = await getItemAsync(PRIVATE_KEY);

        if (privateKey) {

          setKeyPair({
            privateKey,
            publicKey,
          });

          console.debug("useAccountAbstraction.ensureWallet", "publicKey and privateKey recovered from secured store")
        }
        else {
          console.debug("useAccountAbstraction.ensureWallet", "publicKey found but not privateKey")
        }
      }
      else {

        const privateKey = await digestStringAsync(CryptoDigestAlgorithm.SHA256, getRandomBytes(64).toString());

        const { publicKey } = await loyoClient.prebundler.setupWallet(privateKey);

        setKeyPair({
          privateKey,
          publicKey,
        });

        console.debug("useAccountAbstraction.ensureWallet", "publicKey and privateKey generated");
      }
    };

    init();
  }, []);

  // Store public en private keys
  useEffect(() => {

    if (keyPair) {

      setItemAsync(PUBLIC_KEY, keyPair.publicKey);
      setItemAsync(PRIVATE_KEY, keyPair.privateKey);
    }

    console.log("useAccountAbstract.effect", { keyPair });
  }, [keyPair]);

  return {
    keyPair,
  };
};

export default useAccountAbstraction;
