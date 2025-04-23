import { useAuth } from "@/context/auth";
import { Stack, Tabs } from "expo-router";

export default function Layout() {
    const { session } = useAuth();
    if (!session) {
        // router.replace("/(auth)");
    }
    return (
        <Stack>
            <Tabs.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(function)" options={{ headerShown: false }} />
        </Stack>
    );
}