import { Slot, SplashScreen, Stack, Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Provider, useSelector } from "react-redux";
import { AuthProvider } from "../context/auth";
import { useCallback, useEffect, useState } from "react";
import { ModeType } from "@/components/ui/gluestack-ui-provider/types";
import store from "@/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { playbackService } from "@/constants/playbackService";
import TrackPlayer from "react-native-track-player";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "react-native-url-polyfill/auto";

SplashScreen.preventAutoHideAsync();
TrackPlayer.registerPlaybackService(() => playbackService);

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
          <SafeAreaProvider>
            <AuthProvider>
              <RootNavigator />
              <StatusBar style="auto" />
            </AuthProvider>
          </SafeAreaProvider>
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
      <Stack.Screen
        name="player"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
// function BackButton() {
//   const router = useRouter();
//   return (
//     <Feather
//       name="chevron-down"
//       size={24}
//       color="black"
//       onPress={() => router.back()}
//     />
//   );
// }
