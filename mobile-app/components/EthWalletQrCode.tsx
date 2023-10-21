import { FC } from "react";

import { Image } from "expo-image";

import useEthWalletQr from "../hooks/useEthWalletQr";

const EthWalletQrCode: FC = () => {

    const { qrCode } = useEthWalletQr();

    return <Image source={qrCode} />;
};

export default EthWalletQrCode;
