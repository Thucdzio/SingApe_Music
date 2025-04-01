import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Tabs } from "expo-router";
import { useAuth } from "../../../context/auth";
import { Text } from "@react-navigation/elements";

export default function TabsNavigation() {
  const { session } = useAuth();

  if (!session) {
    return (
      <HStack>
        <Text>Not logged in</Text>
      </HStack>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#673ab7",
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tabs.Screen name="(songs)" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="library" options={{ title: "Library" }} />
    </Tabs>
  );
}