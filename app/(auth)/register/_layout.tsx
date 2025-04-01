import { Stack } from "expo-router";

export default function RegisterLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Register",
                    headerTitle: "Register",
                    headerTintColor: "#fff",
                    headerStyle: {
                        backgroundColor: "#000",
                    },
                }}
            />
            <Stack.Screen
                name="account"
                options={{
                    title: "Register",
                    headerTitle: "Register",
                    headerTintColor: "#fff",
                    headerStyle: {
                        backgroundColor: "#000",
                    },
                }}
            />
        </Stack>
    );
}