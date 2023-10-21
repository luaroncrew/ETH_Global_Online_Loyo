import { FC, useEffect, useMemo, useRef } from "react";

import { Image } from "expo-image";
import { QRCodeRenderersOptions, toCanvas } from "qrcode";

interface IQrCode {
    address: string
}

const QrCode: FC<IQrCode> = ({ address }) => {

    const imageRef = useRef<Image>(null);

    const payload = useMemo(() => JSON.stringify({ address }), [address]);

    useEffect(() => {

        const options: QRCodeRenderersOptions = {
            margin: 1,
            color: {
                dark: "#010599FF",
                light: "#FFBF60FF"
            },
        };

        toCanvas(imageRef.current, payload, options);

    }, [imageRef, payload]);

    return <Image ref={imageRef} />;
};

export default QrCode;
