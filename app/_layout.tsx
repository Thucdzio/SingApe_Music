import { Tabs } from "expo-router";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "@/components/ui/gluestack-ui-provider/config";

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{ title: "🏠 Home", tabBarIcon: () => <Text>🎵</Text> }}
        />
        <Tabs.Screen
          name="library"
          options={{ title: "📚 Thư viện", tabBarIcon: () => <Text>📁</Text> }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: "👤 Hồ sơ", tabBarIcon: () => <Text>🧑</Text> }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
