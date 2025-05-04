import { PlaylistScreen } from "@/components/PlaylistScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, View } from "react-native";



export default function Playlist() {
  const { id, image, title, createdBy } = useLocalSearchParams();

  return (
    // <PlaylistScreen
    //     title={title as string}
    //     description={""}
    //     imageUrl={image as string}
    //     tracks={[]}
    //     onTrackPress={(trackId) => console.log(trackId)}
    //     createdBy={createdBy as string}
    // />
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
