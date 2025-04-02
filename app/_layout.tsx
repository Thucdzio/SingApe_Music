import { Slot, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import '@/global.css';
import { AuthProvider } from "../context/auth";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { ModeType } from "@/components/ui/gluestack-ui-provider/types";

export default function RootLayout() {
  const [mode, setMode] = useState<ModeType>("light");
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    if (mode === "dark") {
      colorScheme.colorScheme = "dark";
    } else {
      colorScheme.colorScheme = "light";
    }
  }
  , [mode]);

  return (
    <GluestackUIProvider mode={mode}>
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
