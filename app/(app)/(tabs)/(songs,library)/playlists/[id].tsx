import ButtonBottomSheet from "@/components/bottomSheet/ButtonBottomSheet";
import { MyBottomSheet } from "@/components/bottomSheet/MyBottomSheet";
import { PlaylistScreen } from "@/components/screens/PlaylistScreen";
import { VStack } from "@/components/ui";
import { useModal } from "@/context/modal";
import { useAuth } from "@/context/auth";
import { convertZingToTrack } from "@/helpers/convert";
import { likeSong } from "@/lib/api";
import { fetchPlaylist } from "@/lib/spotify";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  listPlaylists,
} from "@/services/fileService";
import { generateTracksListId, playPlaylist } from "@/services/playbackService";
import { usePlaylists } from "@/store/library";
import { useLibraryStore } from "@/store/mylib";
import { MyTrack, Playlist } from "@/types/zing.types";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { CircleX } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Playlists() {
  const item = useLocalSearchParams<MyTrack>();
  const [data, setData] = useState<MyTrack[]>([]);
  const { show } = useModal();
  const playlists = useLibraryStore((state) => state.playlists);
  const deleteStorePlaylist = useLibraryStore((state) => state.deletePlaylist);
  const { user } = useAuth();
  const variant = useSegments().find((segment) => segment === "(songs)")
    ? "songs"
    : "library";

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleDismisseModalPress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleOnOptionsPress = () => {
    handlePresentModalPress();
  };

  const handleOnPlusPress = () => {
    router.navigate({
      pathname: "/searchSong",
      params: {
        id: item.id,
      },
    });
  };

  const handleAddToPlaylistPress = async () => {
    const playlists = await listPlaylists();
    createPlaylist(
      user?.user_metadata.name ?? "Unknown User",
      item.id ?? "Unknown Playlist",
      item.title ?? "Danh sách phát " + playlists.length,
      item.artwork ?? "",
      "Danh sách phát của " + (user?.user_metadata.name ?? "Unknown User")
    );
  };

  const handleOnPlayPress = () => {
    playPlaylist(data, generateTracksListId(item.title || "Unknown", item.id));
  };

  const handleOnShufflePress = () => {
    playPlaylist(
      data.sort(() => Math.random() - 0.5),
      generateTracksListId(item.title || "Unknown", item.id)
    );
  };

  const confirmDelete = async () => {
    try {
      handleDismisseModalPress();
      await deletePlaylist(item.id);
      deleteStorePlaylist(item.id);
      router.back();
    } catch (error) {
      console.log("Error deleting playlist:", error);
    }
  };

  const handleDeletePlaylist = () => {
    show({
      title: "Xóa danh sách phát",
      message: `Bạn có chắc chắn muốn xóa danh sách phát '${item.title}' không?`,
      type: "normal",
      confirmText: "Xóa",
      cancelText: "Hủy",
      onConfirm: confirmDelete,
    });
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        if (item.id.length === 8) {
          try {
            const response: Playlist = await fetchPlaylist(item.id);
            const convertedData = await Promise.all(
              response.song.items.map(async (track) => {
                return convertZingToTrack(track);
              })
            );
            console.log("Converted Data:", convertedData.map((item) => item.title));
            setData(convertedData);
          } catch (error) {
            console.error("Error playlist:", error);
            const response = playlists.find(
              (playlist) => playlist.id === item.id
            );
            setData(response?.tracks || []);
          }
        } else {
          // const response = await getPlaylist(item.id);
          const response = playlists.find(
            (playlist) => playlist.id === item.id
          );
          console.log("Response:", response?.tracks.map((item) => item.title));
          setData(response?.tracks || []);
        }
      };
      fetchData();

      return () => {
        isActive = false;
      };
    }, [playlists])
  );

  useEffect(() => {
    console.log("Data:", data.map((item) => item.title));
  }, [data]);

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
        onPlusPress={handleOnPlusPress}
        onOptionPress={handleOnOptionsPress}
        onEditPress={() =>
          router.push({
            pathname: "/editPlaylist",
            params: {
              id: item.id,
            },
          })
        }
      />
      <MyBottomSheet bottomSheetRef={bottomSheetRef}>
        <VStack space="md" className="w-full">
          <ButtonBottomSheet
            onPress={handleDeletePlaylist}
            buttonIcon={CircleX}
            buttonText="Xóa danh sách phát"
          />
        </VStack>
      </MyBottomSheet>
    </View>
  );
}
