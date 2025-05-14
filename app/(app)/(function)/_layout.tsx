import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="editProfile" options={{ headerShown: false }} />
        </Stack>
    );
}