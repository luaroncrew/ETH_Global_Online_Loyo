import { Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, }} />

      <Stack.Screen name="account/receive" options={{ presentation: "modal" }} />

      <Stack.Screen name="shop/[shopAddress]/items" options={{ presentation: "modal" }} />
      <Stack.Screen name="shop/[shopAddress]/send/[amount]" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default RootLayout;
