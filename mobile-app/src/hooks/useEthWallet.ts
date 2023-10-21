import { useCallback, useEffect, useState } from "react";

import { CryptoDigestAlgorithm, digestStringAsync, getRandomBytes, randomUUID } from "expo-crypto";

import { getItemAsync, setItemAsync } from "expo-secure-store";

const PUBLIC_KEY = "PUBLIC_KEY";
const PRIVATE_KEY = "PRIVATE_KEY";

const useEthWallet = () => {

    const [keyPair, setKeyPair] = useState<{ privateKey: string, publicKey: string }>();

    useEffect(() => {

        const initKeyPair = async () => {

            let publicKey = await getItemAsync(PUBLIC_KEY);
            let privateKey = await getItemAsync(PRIVATE_KEY);

            if (publicKey && privateKey) {

            }
            else {

                const bytes = getRandomBytes(64).toString();

                privateKey = await digestStringAsync(CryptoDigestAlgorithm.SHA256, bytes);
                setItemAsync(PRIVATE_KEY, privateKey);

                publicKey = "public_key"; // TODO: get from backend
                setItemAsync(PUBLIC_KEY, publicKey);
            }

            setKeyPair({
                publicKey,
                privateKey
            });
        };

        initKeyPair();
    }, [])

    return {
        keyPair
    }
};

export default useEthWallet;