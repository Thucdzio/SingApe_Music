import { PlaylistScreen } from "@/components/PlaylistScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@/components/ui";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, FlatList, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors, { purple, transparent } from "tailwindcss/colors";
import { ButtonIcon } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronDown,
  CirclePlus,
  Play,
  Shuffle,
} from "lucide-react-native";
import { AlbumScreen } from "@/components/AlbumScreen";
import { MyTrack, Playlist } from "@/types/zing.types";
import { useEffect, useState } from "react";
import { getAlbumById } from "@/lib/api";
import { fetchPlaylist } from "@/lib/spotify";
import { convertZingToTrack } from "@/helpers/convert";
import { generateTracksListId, playPlaylist, playTrack } from "@/services/playbackService";
import { Track } from "react-native-track-player";


export default function Album() {
  const item = useLocalSearchParams<MyTrack>();
  const [data, setData] = useState<MyTrack[]>([]);
  console.log(item)

  const fetchAlbum = async () => {
    // const response = await getAlbumById(item.id);
    const response: Playlist = await fetchPlaylist(item.id);
    setData(await Promise.all(response.song.items.map(async (track) => {
      return convertZingToTrack(track)
    })));
  }

  useEffect(() => {
    fetchAlbum();
  }, []);

  const title = "Album";

  const onPlayPress = () => {
    playPlaylist(data, generateTracksListId(item.title || title, item.id));
  }

  const onShufflePress = () => {
    playPlaylist(data.sort(() => Math.random() - 0.5), generateTracksListId(item.title || title, item.id));
  }
  
  const onTrackPress = (track: Track) => {
    playTrack(track);
  }


  return (
    <View className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <AlbumScreen
        id={item.id}
        imageUrl={item.artwork}
        title={item.title}
        artists={item.artists}
        tracks={data}
        releaseDate={item.releaseDate}
        onPlayPress={onPlayPress}
        onShufflePress={onShufflePress}
        onAddToPlaylistPress={() => {}}
        onOptionPress={() => {}} 
        onTrackPress={onTrackPress}
      />
    </View>
  );
}
