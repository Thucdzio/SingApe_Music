import { useRouter, Tabs, Redirect, Stack } from "expo-router";
import { useAuth } from "../../../context/auth";
import { FontAwesome } from "@expo/vector-icons";
import { backgroundColor, iconColor, iconSize, textColor } from "@/constants/tokens";
import { useSelector } from "react-redux";
import { Icon } from "@/components/ui/icon";
import { Compass, Library, UserRound } from "lucide-react-native";
import { KeyboardAvoidingComponent } from "@/components/KeyboardAvoiding";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { View } from "react-native";

export default function TabsNavigation() {
  const { session } = useAuth();
  const isDarkMode = useSelector((state: any) => state.isDarkMode);

  if (!session) {
    return <Redirect href="/(auth)" />;
  }
  console.log("TabsNavigation Rendered");
  console.log("Rendering FloatingPlayer");
  return (
    <View style={{ flex: 1}}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          borderTopWidth: 0,
          height: 50,
          backgroundColor: isDarkMode ? backgroundColor.dark : backgroundColor.light,
        },
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: isDarkMode ? iconColor.activeLight :  iconColor.activeDark,
        tabBarInactiveTintColor: isDarkMode ? iconColor.light : iconColor.dark,
      }}
    >
      <Tabs.Screen name="(songs)" options={{ 
        title: "Khám phá", 
        tabBarIcon: ({color}) => <Icon as={Compass} color={color}/>
      }} />
      <Tabs.Screen name="library" options={{ 
        title: "Thư viện",
        tabBarIcon: ({color}) => <Icon as={Library} color={color} />
      }} />
      <Tabs.Screen name="profile" options={{ 
        title: "Cá nhân",
        popToTopOnBlur: true,
        tabBarIcon: ({color}) => <Icon as={UserRound} color={color} />,
      }} />

    </Tabs>
    <FloatingPlayer />
    </View>
  );
}
