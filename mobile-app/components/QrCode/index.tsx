import { FC, useEffect, useState } from "react";

import { Image, ImageProps } from "expo-image";
import { Dimensions, StyleSheet } from "react-native";

import useAccountAbstraction from "../../hooks/useAccountAbstraction";
import { loyoClient } from "../../http";

const size = Dimensions.get("screen").width;

type IQrCode = Omit<ImageProps, "source">;

const QrCode: FC<IQrCode> = (props) => {

    const { keyPair } = useAccountAbstraction();

    const [qrCode, setQrCode] = useState<string>();

    useEffect(() => {

        if (keyPair) {

            loyoClient.accounts.getQr(keyPair.publicKey).then(({ qrCode }) => {

                console.debug("QrCode.effect", "retrieved account QR Code");

                setQrCode(qrCode);

            }).catch((error) => {

                console.debug("QrCode.effect", error);
            });
        }
    }, [keyPair]);

    return <Image {...props} source={qrCode} />;
};

export default QrCode;
