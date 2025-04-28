import { PlaylistTracksList } from "@/components/PlaylistTracksList";
import { Text } from "@/components/ui";
import { screenPadding } from "@/constants/tokens";
import { usePlaylists } from "@/store/library";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaylistHeader = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {},
        headerBackground: () => <View className="color-background-500" />,
      }}
    />
  );
};
const PlaylistScreen = () => {
  const { name: playlistName } = useLocalSearchParams<{ name: string }>();

  console.log("🧭 Playlist name route param:", playlistName);
  const { playlists } = usePlaylists();

  const playlist = playlists.find((playlist) => playlist.name === playlistName);

  if (!playlist) {
    console.warn(`Playlist ${playlistName} was not found!`);

    return <Redirect href={"/library/playlist"} />;
  }
  console.log(playlist);
  return (
    <View
      className="flex-1"
      style={{
        paddingHorizontal: screenPadding.horizontal,
        paddingVertical: 8,
      }}
    >
      {PlaylistHeader()}
      <PlaylistTracksList playlist={playlist} />
    </View>
  );
};

export default PlaylistScreen;
