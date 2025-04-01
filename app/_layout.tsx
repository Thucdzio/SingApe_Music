import { Slot, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import '@/global.css';
import { AuthProvider } from "../context/auth";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <RootNavigator />
        <StatusBar style="auto"/>
      </AuthProvider>
    </GluestackUIProvider>
  )
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  )
}
