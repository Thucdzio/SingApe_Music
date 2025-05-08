import { FlatList, ScrollView, View } from "react-native";
import { Image, VStack, Text, HStack, Box, Button } from "./ui";
import { Heading } from "./ui/heading";
import { ButtonIcon, ButtonText } from "./ui/button";
import { ArrowLeft, CircleArrowDown, CirclePlus, EllipsisVertical, Heart, Pause, Pen, Play, Plus, Shuffle } from "lucide-react-native";
import { TracksList } from "./TrackList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {  Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import colors from "tailwindcss/colors";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { backgroundColor } from "@/constants/tokens";
import { isPlaying, Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { useState } from "react";
import getGradient from "@/helpers/color";
import { unknownTrackImageSource } from "@/constants/image";
import { useAuth } from "@/context/auth";
import { P } from "ts-pattern";
import { Artists, MyTrack } from "@/types/zing.types";
import { getTotalDuration } from "@/helpers/calc";
import { formatDate } from "@/helpers/format";

interface AlbumProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  artists?: Artists[];
  releaseDate?: string;
  tracks?: MyTrack[];
  variant?: "library" | "songs"
  onTrackPress?: (track: Track) => void;
  onPlayPress?: () => void;
  onShufflePress?: () => void;
  onAddToPlaylistPress?: () => void;
  onOptionPress?: () => void;
  onDownloadPress?: () => void;
}

export const AlbumScreen = ({ 
  id,
  title,
  description,
  imageUrl,
  artists,
  tracks,
  variant = "songs",
  onTrackPress,
  releaseDate,
  onPlayPress,
  onShufflePress,
  onAddToPlaylistPress,
  onOptionPress,
  onDownloadPress,
}: AlbumProps) => {
  const { playing } = useIsPlaying();

  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue<number>(0);
  const colorScheme = useColorScheme();

  const formatedDate = formatDate(releaseDate || "");
  const artistsName =  "Unknown Artist";

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const scrollHeaderTitleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [160, 200], [0, 1]);
    return { opacity };
  });

  const headerBackgroundAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [160, 180],
      ["transparent", (colorScheme.colorScheme === "dark" ? colors.purple[900] : colors.white)],
    );
    return { backgroundColor };
  });

  const playButtonOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [225, 226],
      [0, 1]
    );

    return { opacity };
  });

  const playButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [210, 250],
      [42, 0],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  const handleAddToPlaylistPress = () => {

  }

  const variantSong = () => {
    return (
      <HStack>
        <Button
          variant="solid"
          className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
          size="md"
          onPress={onAddToPlaylistPress}
        >
          <ButtonIcon as={CirclePlus} className={buttonIconStyle} />
        </Button>
        <Button
          variant="solid"
          className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
          size="md"
          onPress={onDownloadPress}
        >
          <ButtonIcon as={CircleArrowDown} className={buttonIconStyle} />
        </Button>
        <Button
          variant="solid"
          className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
          size="md"
          onPress={onOptionPress}
        >
          <ButtonIcon as={EllipsisVertical} className={buttonIconStyle} />
        </Button>
      </HStack>
    )
  }

  return (
    <View className="flex-1">
      <Animated.ScrollView
        className="flex-1 w-full bg-transparent"
        onScroll={scrollHandler}
      >
        <LinearGradient
          colors={getGradient(id || "")}
          style={[{ paddingTop: insets.top }]}
        >
          <VStack className="bg-transparent">
            <Box className="w-full justify-center items-center mt-4">
              <Image
                source={{ uri: imageUrl || unknownTrackImageSource }}
                className="w-48 h-48 rounded-lg"
                alt="Playlist Image"
                resizeMode="cover"
              />
            </Box>
            <Box className="justify-center items-center mt-4">
              <Heading>{title}</Heading>
              <Text className="text-gray-500 mt-2">{description}</Text>
            </Box>
            <HStack space="md" className="items-center px-4">
              <Image
                source={{ uri: artists?.[0]?.thumbnail || unknownTrackImageSource }}
                className="w-7 h-7 rounded-full"
                alt="User"
                resizeMode="cover"
              />
              <Text className="text-gray-500 font-bold">{artistsName}</Text>
            </HStack>
            <Box className="w-full px-4 pt-2">
              <Text className="text-gray-500">{formatedDate}</Text>
            </Box>
            <HStack className="space-x-2 justify-between pr-4 py-2 w-full">
              {variantSong()}
              <HStack className="justify-items-end gap-2">
                <Button
                  variant="solid"
                  className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
                  size="md"
                  onPress={onShufflePress}
                >
                  <ButtonIcon as={Shuffle} className={buttonIconStyle} />
                </Button>
                <Animated.View
                >
                  <Button
                    variant="solid"
                    className="rounded-full justify-center bg-blue-400 data-[active=true]:bg-blue-900 h-14 w-14"
                    size="md"
                    onPress={onPlayPress}
                  >
                    <ButtonIcon as={playing ? Pause : Play} className="text-black fill-black w-6 h-6" />
                  </Button>
                </Animated.View>
              </HStack>
            </HStack>
          </VStack>
        </LinearGradient>
        <TracksList id={title || "random"} tracks={tracks || []} scrollEnabled={false} className="p-4" />
      </Animated.ScrollView>

      
      <Animated.View
        className="absolute w-full"
        style={[headerBackgroundAnimatedStyle, { paddingTop: insets.top }]}
      >
        <HStack className="items-center w-full">
          <Button
            onPress={() => {router.back()}}
            variant="solid"
            className="bg-transparent rounded-full justify-center h-14 w-14 data-[active=true]:bg-transparent"
            size="md"
          >
            <ButtonIcon as={ArrowLeft} className="text-primary-500" size="xxl" />
          </Button>
          <Animated.Text
            style={[scrollHeaderTitleAnimatedStyle]}
            className="text-primary-500 text-2xl font-bold ml-4"
          >
            Danh sách phát
          </Animated.Text>
        </HStack>
        <Animated.View
          className="absolute right-4 top-7"
          style={[playButtonAnimatedStyle, playButtonOpacity, { paddingTop: insets.top }]}
          >
        <Button
          variant="solid"
          className="rounded-full justify-center bg-blue-400 data-[active=true]:bg-blue-900 h-14 w-14"
          size="md"
          onPress={onPlayPress}
        >
          <ButtonIcon as={playing ? Pause : Play} className="text-black fill-black" />
        </Button>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const buttonIconStyle = "text-primary-500 w-6 h-6";