import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

const Page: FC = () => {

    const local = useLocalSearchParams<{ id: string }>();

    return <View style={{ flex: 1, flexDirection: 'column' }}>
        Spend your fidelity tokens! {local.id}
    </View>;
};

export default Page;