import { Slot, SplashScreen, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Provider, useSelector } from "react-redux";
import { AuthProvider } from "../context/auth";
import { useCallback, useEffect, useState } from "react";
import { ModeType } from "@/components/ui/gluestack-ui-provider/types";
import store from "@/app/store/store";
import { useSetupTrackPlayer } from "./hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "./hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
SplashScreen.preventAutoHideAsync();

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
export default function RootLayout() {
  const handelTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handelTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <GluestackWrapper>
          <AuthProvider>
            <RootNavigator />
            <StatusBar style="auto" />
          </AuthProvider>
        </GluestackWrapper>
      </Provider>
    </GestureHandlerRootView>
  );
}

function GluestackWrapper({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: any) =>
    state.isDarkMode ? "dark" : "light"
  );
  return (
    <GluestackUIProvider mode={theme as ModeType}>
      {children}
    </GluestackUIProvider>
  );
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
