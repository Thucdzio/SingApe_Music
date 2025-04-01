import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000000" },
        }}
    >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ 
          headerShown: true, 
          headerTitle: "",
          headerTransparent: true,
          }} />
        <Stack.Screen name="login" options={{ 
          headerShown: true, 
          headerTitle: "",
          headerTransparent: true,
          }} />
    </Stack>
  );
}