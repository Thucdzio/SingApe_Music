import { useRouter, Tabs, Redirect, Stack, router } from "expo-router";
import { useAuth } from "../../../context/auth";
import { FontAwesome } from "@expo/vector-icons";
import {
  backgroundColor,
  iconColor,
  iconSize,
  textColor,
} from "@/constants/tokens";
import { useSelector } from "react-redux";
import { Icon } from "@/components/ui/icon";
import {
  ChartNoAxesColumn,
  Compass,
  Library,
  UserRound,
  Settings,
} from "lucide-react-native";
import { KeyboardAvoidingComponent } from "@/components/KeyboardAvoiding";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { View } from "react-native";
import { lazy, useEffect } from "react";
import { useColorScheme } from "nativewind";

export default function TabsNavigation() {
  const { session } = useAuth();
  const {colorScheme} = useColorScheme();
  if (!session) {
    // router.replace("/(auth)");
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          lazy: true,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            borderTopWidth: 0,
            height: 50,
            backgroundColor: colorScheme === "dark"
              ? backgroundColor.dark
              : backgroundColor.light,
          },
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: colorScheme === "dark"
            ? iconColor.activeLight
            : iconColor.activeDark,
          tabBarInactiveTintColor: colorScheme === "dark"
            ? iconColor.light
            : iconColor.dark,
        }}
      >
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Khám phá",
            popToTopOnBlur: true,
            tabBarIcon: ({ color }) => <Icon as={Compass} color={color} />,
          }}
        />
        <Tabs.Screen
          name="(library)"
          options={{
            title: "Thư viện",
            popToTopOnBlur: true,
            tabBarIcon: ({ color }) => <Icon as={Library} color={color} />,
          }}
        />
        <Tabs.Screen
          name="debug"
          options={{
            title: "Debug",
            tabBarIcon: ({ color }) => <Icon as={Settings} color={color} />,
          }}
        />
        <Tabs.Screen
          name="trending"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={ChartNoAxesColumn} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Cá nhân",
            popToTopOnBlur: true,
            tabBarIcon: ({ color }) => <Icon as={UserRound} color={color} />,
          }}
        />
      {/* <Tabs.Screen
          name="search"
          options={{
            href: null,
          }}
        /> */}
    </Tabs>
    <FloatingPlayer />
    </View>
  );
}
