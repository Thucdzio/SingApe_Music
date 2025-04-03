import { Stack } from "expo-router/stack";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="general" options={{ headerTitle: "General" }} />
            <Stack.Screen name="privacy" options={{ headerTitle: "Privacy" }} />
            <Stack.Screen name="notifications" options={{ headerTitle: "Notifications" }} />
            <Stack.Screen name="about" options={{ headerTitle: "About" }} />
        </Stack>
    );
}