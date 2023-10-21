import { View } from "react-native";

import QrCode from "../../src/components/QrCode";

const Page = () => {

    return <View>
        <QrCode address="test" />
    </View>;
}

export default Page;