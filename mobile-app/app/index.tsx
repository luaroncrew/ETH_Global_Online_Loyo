import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const data = [
  { name: "Kfet", balance: "14.34572456", hasFidelityCard: false },
  { name: "Flams", balance: "134.986754", hasFidelityCard: true },
  { name: "Plouf", balance: "4.8635", hasFidelityCard: false },
];

export default function SpendTokensTab() {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={data}
        renderItem={({ item: shop }) => (
          <Link
            href={{
              pathname: "/modal",
              params: shop,
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
        )}
      />
    </SafeAreaView>
  );
}
