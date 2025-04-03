import { Slot, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerTitle: "Cài đặt" }} />
            <Stack.Screen name="notifications" options={{ headerTitle: "Thông báo" }} />
        </Stack>
    )
}