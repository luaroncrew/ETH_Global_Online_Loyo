import { Stack } from "expo-router";
import useAccountAbstraction from "../hooks/useAccountAbstraction";
import { useEffect } from "react";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const RootLayout = () => {
  const { initWallet } = useAccountAbstraction();

  useEffect(() => {
    initWallet();
  }, [initWallet]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default RootLayout;
