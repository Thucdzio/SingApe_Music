import { Stack } from 'expo-router';

export default function SongsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Song List' }} />
        </Stack>
    )
}