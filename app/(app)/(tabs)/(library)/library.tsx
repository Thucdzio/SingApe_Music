import ButtonBottomSheet from "@/components/bottomSheet/ButtonBottomSheet";
import { MyBottomSheet } from "@/components/bottomSheet/MyBottomSheet";
import CustomHeader from "@/components/CustomHeader";
import { KeyboardAvoidingComponent } from "@/components/KeyboardAvoiding";
import { PlaylistCard } from "@/components/PlaylistCard";
import { UploadedSongCard } from "@/components/UploadedSongCard";
import {
  Button,
  HStack,
  Icon,
  Pressable,
  VStack,
  Image,
} from "@/components/ui";
import { Box } from "@/components/ui/box";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { unknownTrackImageSource } from "@/constants/image";
import { fontSize, textColor } from "@/constants/tokens";
import { deletePlaylist, listPlaylists } from "@/services/fileService";
import { playTrack } from "@/services/playbackService";
import { useLibraryStore } from "@/store/mylib";
import { MyPlaylist, MyTrack } from "@/types/zing.types";
import { View } from "@gluestack-ui/themed";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Href, Link, router, Stack, useFocusEffect } from "expo-router";
import uploadMusic from "@/lib/api/upload";
import {
  getUserUploadedSongs,
  deleteUploadedSong,
  UploadSong,
} from "@/lib/api/upload_songs.api";
import {
  ArrowBigDownDash,
  Download,
  Heart,
  History,
  Music,
  Plus,
  UserRound,
  UsersRound,
  X,
} from "lucide-react-native";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ScrollView, FlatList } from "react-native";
import { stat } from "react-native-fs";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
  const [data, setData] = useState<MyTrack[]>([]);
  const [uploadedSongs, setUploadedSongs] = useState<UploadSong[]>([]);
  const [selectedItem, setSelectedItem] = useState<MyTrack | UploadSong | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [uploadedSongsLoading, setUploadedSongsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();
  const store = useLibraryStore();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleFavorite = () => {
    router.push("/favorite" as Href);
  };

  const handleDownload = () => {
    router.push("/download" as Href);
  };

  const handleHistory = () => {
    router.push("/history" as Href);
  };

  const handleFollow = () => {
    router.push("/follow" as Href);
  };

  const createPlaylist = () => {
    router.push("/createPlaylist" as Href);
  };
  // Fetch playlists and uploaded songs when component is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const playlists = await listPlaylists();
          setData(playlists);

          // Convert MyTrack array to MyPlaylist array by adding empty tracks array
          const playlistItems = playlists.map((item) => ({
            ...item,
            tracks: [], // Add empty tracks array to make it compatible with MyPlaylist
          }));

          // Now it matches the MyPlaylist[] type
          store.setPlaylists(playlistItems);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchUploadedSongs = async () => {
        setUploadedSongsLoading(true);
        try {
          const songs = await getUserUploadedSongs();
          console.log("Fetched uploaded songs:", songs);
          setUploadedSongs(songs);
        } catch (error) {
          console.error("Error fetching uploaded songs:", error);
        } finally {
          setUploadedSongsLoading(false);
        }
      };

      fetchData();
      fetchUploadedSongs();
    }, [])
  );
  const handleOnOptionsPress = (item: MyTrack) => {
    handlePresentModalPress();
    // Set as playlist type
    setSelectedItem(item);
  };
  // Handle deletion of an uploaded song
  const handleDeleteUploadedSong = async (song: UploadSong) => {
    if (!song || !song.id) return;

    try {
      const { success, error } = await deleteUploadedSong(song.id);
      if (success) {
        // Remove the song from the local state
        setUploadedSongs(uploadedSongs.filter((s) => s.id !== song.id));
        console.log("Song deleted successfully");
      } else {
        console.error("Failed to delete song:", error);
      }
    } catch (err) {
      console.error("Error deleting song:", err);
    }
    // Close the modal
    handleCloseModalPress();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          title="Thư viện"
          showBack={false}
          centerTitle={false}
          titleClassName="text-3xl font-bold"
          headerClassName="px-4"
        />
        <Box className="flex-1 w-full h-full bg-background-0 px-4">
          <VStack className="flex-1 w-max-md gap-2">
            <Heading className="text-2xl font-bold">Bài hát</Heading>
            <Divider className="w-full mb-2" />
            <HStack className="w-full items-center justify-center gap-2">
              <Button
                onPress={handleFavorite}
                variant="solid"
                className="rounded-lg justify-start bg-pink-400 dark:bg-pink-400 data-[active=true]:bg-pink-500 w-1/2 h-14"
                size="xl"
              >
                <ButtonIcon as={Heart} className="text-red-600 fill-red-600" />
                <ButtonText className="text-secondary-50">Yêu thích</ButtonText>
              </Button>
              <Button
                onPress={handleFavorite}
                variant="solid"
                className="rounded-lg justify-start bg-yellow-400 dark:bg-yellow-400 data-[active=true]:bg-yellow-500 w-1/2 h-14"
                size="xl"
              >
                <ButtonIcon as={UsersRound} className="text-black fill-black" />
                <ButtonText className="text-secondary-50">Theo dõi</ButtonText>
              </Button>
            </HStack>
            <HStack className="w-full items-center justify-center gap-2">
              <Button
                onPress={handleHistory}
                variant="solid"
                className="rounded-lg justify-start bg-blue-400 dark:bg-blue-400 data-[active=true]:bg-blue-500 w-1/2 h-14"
                size="xl"
              >
                <ButtonIcon as={History} className="text-black " />
                <ButtonText>Lịch sử</ButtonText>
              </Button>
              <Button
                onPress={handleDownload}
                variant="solid"
                className="rounded-lg justify-start bg-green-400 dark:bg-green-400 data-[active=true]:bg-green-500 w-1/2 h-14"
                size="xl"
              >
                <ButtonIcon
                  as={ArrowBigDownDash}
                  className="text-black fill-black"
                />
                <ButtonText>Tải xuống</ButtonText>
              </Button>
            </HStack>
            <HStack className="items-center gap-2">
              <Heading className="text-2xl font-bold">Danh sách phát</Heading>
              <Pressable
                onPress={createPlaylist}
                className="rounded-full data-[active=true]:bg-background-100 items-center justify-center"
              >
                <Icon as={Plus} className="fill-primary-500" />
              </Pressable>
            </HStack>
            <Divider className="w-full" />
            <Animated.FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              layout={LinearTransition}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: "/playlists/[id]",
                      params: item,
                    });
                  }}
                >
                  <PlaylistCard
                    item={item}
                    type="Danh sách phát"
                    onOptionPress={() => handleOnOptionsPress(item)}
                  />
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View className="h-3" />}
              ListFooterComponent={() => <View className="h-28" />}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={false}
            />
            <HStack className="items-center justify-between">
              <Heading className="text-2xl font-bold">
                Bài hát đã tải lên
              </Heading>
              <Pressable
                onPress={uploadMusic}
                className="rounded-full w-10 h-10 data-[active=true]:bg-background-100 items-center justify-center"
              >
                <Icon as={Plus} className="fill-primary-500" />
              </Pressable>
            </HStack>
            <Divider className="w-full mb-2" />
            {uploadedSongsLoading ? (
              <Box className="h-12 items-center justify-center">
                <Text>Đang tải...</Text>
              </Box>
            ) : uploadedSongs.length === 0 ? (
              <Box className="h-20 items-center justify-center">
                <Text className="text-secondary-400">
                  Bạn chưa tải lên bài hát nào
                </Text>
                <Text className="text-secondary-400 mt-1">
                  Nhấn vào dấu + để tải lên bài hát
                </Text>
              </Box>
            ) : (
              <Animated.FlatList
                data={uploadedSongs}
                keyExtractor={(item) => item.id.toString()}
                layout={LinearTransition}
                renderItem={({ item }) => (
                  <UploadedSongCard
                    song={item}
                    onPress={() => {
                      // Play the song
                      console.log("Playing uploaded song:", item.title);
                      // Convert to Track format and play
                      const track = {
                        id: item.id,
                        title: item.title,
                        artist: "Bài hát đã tải lên",
                        url: item.url,
                        artwork: "https://via.placeholder.com/400",
                        duration: 0,
                      };
                      playTrack(track);
                    }}
                    onOptionsPress={() => {
                      // Show options for the song
                      console.log(
                        "Show options for uploaded song:",
                        item.title
                      );
                      setSelectedItem(item); // This is an UploadSong
                      handlePresentModalPress();
                    }}
                  />
                )}
                ItemSeparatorComponent={() => <View className="h-1" />}
                ListFooterComponent={() => <View className="h-8" />}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={false}
              />
            )}
          </VStack>
        </Box>
      </ScrollView>
      {/* Bottom sheet modal for uploaded song options */}
      <MyBottomSheet bottomSheetRef={bottomSheetRef}>
        {selectedItem && "url" in selectedItem ? (
          <VStack space="md" className="p-4">
            <Heading className="text-xl">Tùy chọn</Heading>
            <Button
              onPress={() =>
                handleDeleteUploadedSong(selectedItem as UploadSong)
              }
              className="bg-red-500"
            >
              <ButtonText>Xóa bài hát</ButtonText>
            </Button>
            <Button
              onPress={handleCloseModalPress}
              variant="outline"
              className="border-secondary-400"
            >
              <ButtonText className="text-secondary-400">Hủy bỏ</ButtonText>
            </Button>
          </VStack>
        ) : (
          <VStack space="md" className="p-4">
            <Heading className="text-xl">Tùy chọn</Heading>
            <Button
              onPress={() => {
                // Type guard to ensure selectedItem is a MyTrack
                if (
                  selectedItem &&
                  !("url" in selectedItem) &&
                  "id" in selectedItem
                ) {
                  const playlistItem = selectedItem as MyTrack;
                  const playlistId = playlistItem.id;
                  deletePlaylist(playlistId);
                  setData(data.filter((item) => item.id !== playlistId));

                  // Convert MyTrack array to MyPlaylist array
                  const playlistItems = data
                    .filter((item) => item.id !== playlistId)
                    .map((item) => ({
                      ...item,
                      tracks: [], // Add empty tracks array to make it compatible with MyPlaylist
                    }));

                  store.setPlaylists(playlistItems);
                  handleCloseModalPress();
                }
              }}
              className="bg-red-500"
            >
              <ButtonText>Xóa danh sách phát</ButtonText>
            </Button>
            <Button
              onPress={handleCloseModalPress}
              variant="outline"
              className="border-secondary-400"
            >
              <ButtonText className="text-secondary-400">Hủy bỏ</ButtonText>
            </Button>
          </VStack>
        )}
      </MyBottomSheet>
    </SafeAreaView>
  );
}
