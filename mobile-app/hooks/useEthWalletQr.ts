import { useEffect, useState } from "react";

import useEthWallet from "./useEthWallet";
import { LoyoClient } from "../axios";

const useEthWalletQr = () => {

    const { keyPair } = useEthWallet();

    const [qrCode, setQrCode] = useState<string>();

    useEffect(() => {

        if (keyPair) {

            LoyoClient.post<string>("/qr", {
                address: keyPair.publicKey
            }).then((response) => {
                setQrCode(response.data);
            });
        }
    }, [keyPair]);

    return {
        qrCode
    };
};

export default useEthWalletQr;