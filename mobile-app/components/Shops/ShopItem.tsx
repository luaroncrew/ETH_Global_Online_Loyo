import { FC } from "react";

import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

interface IShop {
    name: string,
    hasFidelityCard: boolean,
    balance: string
}

const ShopItem: FC<{ shop: IShop }> = ({ shop }) => {
    return <Link
        href={{
            pathname: "spend",
            params: { ...shop, id: shop.name.toUpperCase() },
        }}
        asChild
    >
        <Pressable
            className="flex flex-row justify-between py-4 px-6 items-baseline"
            style={{ borderColor: "rgba(0,0,0,0.5)" }}
        >
            <Text className="text-lg font-semibold">{shop.name}</Text>

            <View className="flex flex-row items-center">
                <FontAwesome
                    size={20}
                    name="credit-card"
                    style={{
                        marginRight: 16,
                        opacity: shop.hasFidelityCard ? 1 : 0.1,
                    }}
                />
                <Text className="text-base text-primary">{shop.balance}</Text>
            </View>
        </Pressable>
    </Link>
};

export default ShopItem;