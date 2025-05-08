import { PlaylistScreen } from "@/components/PlaylistScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, View } from "react-native";



export default function Playlist() {
  const { id, image, title, createdBy } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PlaylistScreen />
    </View>
  );
}
