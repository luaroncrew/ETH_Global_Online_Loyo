import { FC, useEffect, useState } from "react";

import { Image } from "expo-image";

import useAccountAbstraction from "../../hooks/useAccountAbstraction";
import { loyoClient } from "../../http";

const QrCode: FC = () => {

    const { keyPair } = useAccountAbstraction();

    const [qrCode, setQrCode] = useState<string>();

    useEffect(() => {

        if (keyPair) {

            loyoClient.accounts.getQr(keyPair.publicKey).then(({ qrCode }) => {
                setQrCode(qrCode);
            });
        }
    }, [keyPair]);

    return <Image source={qrCode} />;
};

export default QrCode;
