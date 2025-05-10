import { FlatList, ScrollView, View } from "react-native";
import { Image, VStack, Text, HStack, Box, Button } from "./ui";
import { Heading } from "./ui/heading";
import { ButtonIcon, ButtonText } from "./ui/button";
import { ArrowLeft, CirclePlus, EllipsisVertical, Heart, Pause, Pen, Play, Plus, Shuffle } from "lucide-react-native";
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

interface PlaylistProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  createdBy?: string;
  userImage?: string;
  tracks?: Track[];
  variant?: "library" | "songs"
  onTrackPress?: (track: Track) => void;
  onPlayPress?: () => void;
  onShufflePress?: () => void;
  onAddToPlaylistPress?: () => void;
  onOptionPress?: () => void;
  onPlusPress?: () => void;
  onEditPress?: () => void;
}

export const PlaylistScreen = ({ 
  id,
  title,
  description,
  imageUrl,
  createdBy,
  userImage,
  tracks,
  variant = "songs",
  onTrackPress,
  onPlayPress,
  onShufflePress,
  onAddToPlaylistPress,
  onOptionPress,
  onPlusPress,
  onEditPress 
}: PlaylistProps) => {
  const { playing } = useIsPlaying();

  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue<number>(0);
  const colorScheme = useColorScheme();

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

  const variantRender = () => {
    switch (variant) {
      case "library":
        return (
          variantLibrary()
        );
      case "songs":
        return (
          variantSong()
        );
      default:
        return null;
    }
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
      </HStack>
    )
  }

  const variantLibrary = () => {
    return (
      <HStack>
        <Button
          variant="solid"
          className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
          size="md"
          onPress={onPlusPress}
        >
          <ButtonIcon as={Plus} className={buttonIconStyle} />
        </Button>
        <Button
          variant="solid"
          className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
          size="md"
          onPress={onEditPress}
        >
          <ButtonIcon as={Pen} className={buttonIconStyle} />
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
                source={{ uri: userImage || "https://ui-avatars.com/api/?length=1&bold=true&background=f76806&name=" + createdBy,}}
                className="w-7 h-7 rounded-full"
                alt="User"
                resizeMode="cover"
              />
              <Text className="text-gray-500">{createdBy}</Text>
            </HStack>
            <HStack className="space-x-2 justify-between pr-4 py-2 w-full">
              {variantRender()}
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