import { Slot, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Provider, useSelector } from "react-redux";
import { AuthProvider } from "../context/auth";
import { useEffect, useState } from "react";
import { ModeType } from "@/components/ui/gluestack-ui-provider/types";
import store from "@/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GluestackWrapper>
        <AuthProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </AuthProvider>
      </GluestackWrapper>
    </Provider>
  );
}

function GluestackWrapper({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: any) => (
    state.isDarkMode ? "dark" : "light"
  ));

  return (
    <GluestackUIProvider mode={theme as ModeType}>
      {children}
    </GluestackUIProvider>
  );
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(app)/(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
