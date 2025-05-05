import { StackScreenWithSearchBar } from "@/constants/layout";

import { Stack } from "expo-router";
import { View } from "react-native";

const SongsScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Song" }} />
    </Stack>
  );
};

export default SongsScreenLayout;
