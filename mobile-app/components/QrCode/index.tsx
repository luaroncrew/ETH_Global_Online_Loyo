import { FC, useEffect, useState } from "react";

import { Image } from "expo-image";
import { Dimensions, StyleSheet } from "react-native";

import useAccountAbstraction from "../../hooks/useAccountAbstraction";
import { loyoClient } from "../../http";

const size = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    image: {
        height: size,
        width: size
    },
});

const QrCode: FC = () => {

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

    return <Image style={styles.image} source={qrCode} />;
};

export default QrCode;
