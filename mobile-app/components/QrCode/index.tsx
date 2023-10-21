import { FC, Suspense, useEffect, useState } from "react";

import { Image } from "expo-image";

import useAccountAbstraction from "../../hooks/useAccountAbstraction";
import { loyoClient } from "../../http";

const QrCode: FC = () => {

    const { keyPair } = useAccountAbstraction();

    const [qrCode, setQrCode] = useState<string>();

    useEffect(() => {

        if (keyPair) {

            console.log({ keyPair });

            loyoClient.accounts.getQr(keyPair.publicKey).then(({ qrCode }) => {

                console.debug("QrCode.effect", "retrieved account QR Code");

                setQrCode(qrCode);
            }).catch((error) => {

                console.debug("QrCode.effect", error);
            });
        }
    }, [keyPair]);

    if (qrCode === undefined) return <></>;

    return <Image source={qrCode} contentFit="fill" />;
};

export default QrCode;
