import { PlaylistsList } from "@/components/PlaylistsList";
import { screenPadding } from "@/constants/tokens";
import { playlistNameFilter } from "@/helpers/filter";
import { Playlist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePlaylists } from "@/store/library";
import { Stack, useRouter } from "expo-router";
import { useMemo } from "react";
import { Box, Text } from "@/components/ui";
import { ScrollView, View } from "react-native";
import { StackScreenWithSearchBar } from "@/constants/layout";

const PlaylistsScreen = () => {
  const router = useRouter();

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "",
    },
  });

  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push(`/library/playlist/${encodeURIComponent(playlist.name)}`);
  };

  return (
    <>
      <Box className="flex-1">
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <PlaylistsList
            scrollEnabled={false}
            playlists={filteredPlaylists}
            onPlaylistPress={handlePlaylistPress}
          />
        </ScrollView>
      </Box>
    </>
  );
};

export default PlaylistsScreen;
