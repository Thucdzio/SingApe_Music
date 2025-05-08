import { MyBottomSheet } from "@/components/bottomSheet/MyBottomSheet";
import { PlaylistScreen } from "@/components/PlaylistScreen";
import { useAuth } from "@/context/auth";
import { convertZingToTrack } from "@/helpers/convert";
import { likeSong } from "@/lib/api";
import { fetchPlaylist } from "@/lib/spotify";
import { createPlaylist, getPlaylist, listPlaylists } from "@/services/fileService";
import { MyTrack, Playlist } from "@/types/zing.types";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Playlists() {
  const item = useLocalSearchParams<MyTrack>();
  const [data, setData] = useState<MyTrack[]>([]);
  const { user } = useAuth();
  console.log("item", item);

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

  useEffect(() => {
    const fetchAlbum = async () => {
      // const response = await getAlbumById(item.id);
      // const response: Playlist = await fetchPlaylist(item.id);
      // setData(await Promise.all(response.song.items.map(async (track) => {
      //   return convertZingToTrack(track)
      // })));
      if (item.id.length !== 8) {
        const response = await getPlaylist(item.id);
        setData(response.tracks);
      } else {
        const response: Playlist = await fetchPlaylist(item.id);
        setData(await Promise.all(response.song.items.map(async (track) => {
          return convertZingToTrack(track)
        })));
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
        tracks={[]}
        onTrackPress={(trackId) => console.log(trackId)}
        onPlayPress={() => {}}
        onShufflePress={() => {}}
        onAddToPlaylistPress={() => handleAddToPlaylistPress()}
      />
    </View>
  );
}