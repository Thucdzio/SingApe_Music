import { Slot, SplashScreen, Stack, Tabs, useRouter } from "expo-router";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider } from "../context/auth";
import { useCallback, useEffect, useState } from "react";
import { ModeType } from "@/components/ui/gluestack-ui-provider/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { playbackService } from "@/services/playbackService";
import TrackPlayer from "react-native-track-player";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useDoubleBackExit } from "@/hooks/useDoubleBackExit";
import { useTrackHistoryLogger } from "@/hooks/useTrackHistoryLogger";
import { ThemeProvider, useTheme } from "@/components/ui/ThemeProvider";
import { AlertModalProvider } from "@/context/modal";
import { AlertProvider } from "@/context/alert";

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

  useTrackHistoryLogger();

  const navigation = useNavigation() as NavigationProp<any>;
  useDoubleBackExit(navigation);

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <GluestackWrapper>
          <AlertModalProvider>
            <AlertProvider>
              <SafeAreaProvider>
                <AuthProvider>
                  <BottomSheetModalProvider>
                    <RootNavigator />
                  </BottomSheetModalProvider>
                  <StatusBar style="auto" />
                </AuthProvider>
              </SafeAreaProvider>
            </AlertProvider>
          </AlertModalProvider>
        </GluestackWrapper>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function GluestackWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return <GluestackUIProvider mode={theme}>{children}</GluestackUIProvider>;
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
        name="(app)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
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
      <Stack.Screen
        name="voice"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
