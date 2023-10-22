import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="give/[amount]" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default RootLayout;
