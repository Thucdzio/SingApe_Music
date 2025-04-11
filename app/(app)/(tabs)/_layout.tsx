import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { useRouter, Tabs, Redirect } from "expo-router";
import { useAuth } from "../../../context/auth";
import { Text } from "@react-navigation/elements";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import store from "@/store/store";
import Feather from "@expo/vector-icons/Feather";
import { iconSize } from "@/constants/token";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function TabsNavigation() {
  const { session } = useAuth();
  const isDarkMode = useSelector((state: any) => state.isDarkMode);

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          height: 50,
          backgroundColor: isDarkMode ? "#000000" : "#ffffff",
        },
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
        tabBarInactiveTintColor: isDarkMode ? "#bababa" : "#333333"
      }}
    >
      <Tabs.Screen name="(songs)" options={{ 
        title: "Khám phá", 
        tabBarIcon: ({color}) => <FontAwesome name="home" size={iconSize.base} color={color}/>
      }} />
      <Tabs.Screen name="profile" options={{ 
        title: "Cá nhân",
        popToTopOnBlur: true,
        tabBarIcon: ({color}) => <FontAwesome name="user" size={iconSize.base} color={color} />,
      }} />
      <Tabs.Screen name="library" options={{ 
        title: "Thư viện",
        tabBarIcon: ({color}) => <FontAwesome name="music" size={iconSize.base} color={color} />
      }} />
      <Tabs.Screen
        name="Cài đặt"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={iconSize.base} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
