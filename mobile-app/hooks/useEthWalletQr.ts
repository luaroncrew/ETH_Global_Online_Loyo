import { useEffect, useState } from "react";

import useEthWallet from "./useEthWallet";
import { loyoClient } from "../axios";

const useEthWalletQr = () => {

    const { keyPair } = useEthWallet();

    const [qrCode, setQrCode] = useState<string>();

    useEffect(() => {

        if (keyPair) {

            loyoClient.accounts.getQr(keyPair.publicKey).then(({ qrCode }) => {
                setQrCode(qrCode);
            });
        }
    }, [keyPair]);

    return {
        qrCode
    };
};

export default useEthWalletQr;