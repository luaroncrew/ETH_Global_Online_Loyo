import { FC } from "react";

import { Image } from "expo-image";

import useEthWalletQr from "../hooks/useEthWalletQr";

const QrCode: FC = () => {

    const { qrCode } = useEthWalletQr();

    return <Image source={qrCode} />;
};

export default QrCode;
