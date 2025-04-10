import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000000" },
        }}
    >
        <Stack.Screen name="index" />
        <Stack.Screen name="register"  />
        <Stack.Screen name="login" />
    </Stack>
  );
}