import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useCallback, useState } from "react";

const PUBLIC_KEY = "PUBLIC_KEY";
const PRIVATE_KEY = "PRIVATE_KEY";

const useEthWallet = () => {

    const [publicKey, setPublicKey] = useState<string>();
    const [privateKey, setPrivateKey] = useState<string>();

    const initEthWallet = useCallback(async () => {

        const _publicKey = await getItemAsync(PUBLIC_KEY);
        const _privateKey = await getItemAsync(PRIVATE_KEY);

        if (_publicKey && _privateKey) {

            setPublicKey(_publicKey);
            setPrivateKey(_privateKey);
        }
        else {

            setItemAsync(PUBLIC_KEY, "public_key");
            setItemAsync(PRIVATE_KEY, "private_key");
        }
    }, []);

    return {
        initEthWallet,
        publicKey,
        privateKey,
    }
};

export default useEthWallet;