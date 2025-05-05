import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Thư viện",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="playlist"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
