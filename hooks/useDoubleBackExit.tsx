import { useCallback, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

const EXIT_INTERVAL = 2000; // milliseconds

/**
 * Hook that keeps normal navigation.goBack(), 
 * but on the root screen requires double‑press to exit.
 */
export function useDoubleBackExit(navigation: NavigationProp<any>) {
  const lastPress = useRef(0);

  // Register when this screen is focused
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // 1. If there is a screen to go back to, do so:
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;  // handled, prevents default exit
        }
        // 2. Otherwise, handle double‑press to exit:
        const now = Date.now();
        if (now - lastPress.current < EXIT_INTERVAL) {
          BackHandler.exitApp();  // second press: exit
        } else {
          ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
          lastPress.current = now;  // record first press time
        }
        return true;  // always handled
      };

      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();  // cleanup on blur
    }, [navigation])
  );
}
