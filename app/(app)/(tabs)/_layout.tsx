import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { useRouter, Tabs } from "expo-router";
import { useAuth } from "../../../context/auth";
import { Text } from "@react-navigation/elements";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import store from "@/store/store";
import Feather from "@expo/vector-icons/Feather";
import { FloatingPlayer } from "@/app/components/FloatingPlayer";
import { View } from "react-native";

export default function TabsNavigation() {
  const { session } = useAuth();

  if (!session) {
    return (
      <HStack>
        <Text>Not logged in</Text>
      </HStack>
    );
  }
  console.log("TabsNavigation Rendered");
  console.log("Rendering FloatingPlayer");
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            height: 50,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: store.getState().isDarkMode
              ? "#000000"
              : "#ffffff",
          },
          tabBarActiveTintColor: store.getState().isDarkMode
            ? "#fdfdfd"
            : "#0d0d0d",
          tabBarInactiveTintColor: store.getState().isDarkMode
            ? "#bababa"
            : "#333333",
        }}
      >
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            popToTopOnBlur: true,
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="music" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Setting",
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </View>
  );
}
