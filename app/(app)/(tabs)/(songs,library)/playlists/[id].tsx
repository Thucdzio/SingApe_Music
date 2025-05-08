import { MyBottomSheet } from "@/components/bottomSheet/MyBottomSheet";
import { PlaylistScreen } from "@/components/PlaylistScreen";
import { useAuth } from "@/context/auth";
import { convertZingToTrack } from "@/helpers/convert";
import { likeSong } from "@/lib/api";
import { fetchPlaylist } from "@/lib/spotify";
import { createPlaylist, getPlaylist, listPlaylists } from "@/services/fileService";
import { generateTracksListId, playPlaylist } from "@/services/playbackService";
import { MyTrack, Playlist } from "@/types/zing.types";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, usePathname, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Playlists() {
  const item = useLocalSearchParams<MyTrack>();
  const [data, setData] = useState<MyTrack[]>([]);
  const { user } = useAuth();
  const variant = useSegments().find((segment) => segment === "(songs)") ? "songs" : "library";
  

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);

  const handleOnOptionsPress = () => {
    if (user && item.id) {
    }
  }

  const handleAddToPlaylistPress = async () => {
    const playlists = await listPlaylists()
    createPlaylist(
      user?.user_metadata.name ?? "Unknown User",
      item.title ?? "Danh sách phát " + playlists.length,
      item.artwork ?? "",
      "Danh sách phát của " + (user?.user_metadata.name ?? "Unknown User")
    )
  }

  const handleOnPlayPress = () => {
    playPlaylist(data, generateTracksListId(item.title || "Unknown", item.id));    
  }

  const handleOnShufflePress = () => {
    playPlaylist(data.sort(() => Math.random() - 0.5), generateTracksListId(item.title || "Unknown", item.id));    
  }

  useEffect(() => {
    const fetchAlbum = async () => {
      if (item.id.length === 8) {
        const response: Playlist = await fetchPlaylist(item.id);
        setData(await Promise.all(response.song.items.map(async (track) => {
          return convertZingToTrack(track)
        })));
      } else {
        const response = await getPlaylist(item.id);
        setData(response.tracks);
      } 
    }
    fetchAlbum();
  }, []);

  

  return (
    <View className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PlaylistScreen
        id={item.id}
        imageUrl={item.artwork}
        title={item.title}
        createdBy={item.createdBy}
        userImage={user?.user_metadata.avatar_url}
        tracks={data}
        variant={variant}
        onTrackPress={(trackId) => console.log(trackId)}
        onPlayPress={handleOnPlayPress}
        onShufflePress={handleOnShufflePress}
        onAddToPlaylistPress={handleAddToPlaylistPress}
      />
    </View>
  );
}