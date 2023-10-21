import { Stack } from "expo-router";
import useEthWallet from "../hooks/useEthWallet";
import { useEffect } from "react";

export {
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const RootLayout = () => {

  const { initWallet } = useEthWallet();

  useEffect(() => {

    initWallet();
  }, [initWallet]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default RootLayout;
