import { FlatList, ScrollView, View } from "react-native";
import { Image, VStack, Text, HStack, Box, Button } from "@/components/ui";
import { Heading } from "@/components/ui/heading";
import Library from "@/assets/data/library.json";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  ArrowLeft,
  CircleArrowDown,
  CirclePlus,
  CircleUserRound,
  CircleX,
  Disc,
  Disc2,
  EllipsisVertical,
  Heart,
  Pause,
  Pen,
  Play,
  Plus,
  Share,
  Share2,
  Shuffle,
  User,
} from "lucide-react-native";
import { TracksList } from "@/components/TrackList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import colors, { gray } from "tailwindcss/colors";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { backgroundColor } from "@/constants/tokens";
import {
  isPlaying,
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { useCallback, useRef, useState } from "react";
import { getGradientColor } from "@/helpers/color";
import {
  unknownArtistImageSource,
  unknownTrackImageSource,
} from "@/constants/image";
import { useAuth } from "@/context/auth";
import { P } from "ts-pattern";
import { MyBottomSheet } from "@/components/bottomSheet/MyBottomSheet";
import { MyTrack } from "@/types/zing.types";
import { Divider } from "@/components/ui/divider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ButtonBottomSheet from "@/components/bottomSheet/ButtonBottomSheet";

interface ArtistProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  createdBy?: string;
  userImage?: string;
  tracks?: Track[];
  variant?: "library" | "songs";
  onTrackPress?: (track: Track) => void;
  onPlayPress?: () => void;
  onShufflePress?: () => void;
  onAddToPlaylistPress?: () => void;
  onOptionPress?: () => void;
  onPlusPress?: () => void;
  onEditPress?: () => void;
}

export const ArtistScreen = ({
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
  onEditPress,
}: ArtistProps) => {
  const [selectedItem, setSelectedItem] = useState<Track | null>(null);
  const { playing } = useIsPlaying();

  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue<number>(0);
  const colorScheme = useColorScheme();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const imageSectionAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 160],
      [0, -10],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 160],
      [0.8, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const headerBackgroundAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 160],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity } ;
  });

  const scrollHeaderTitleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [160, 200], [0, 1]);
    return { opacity };
  });

  const playButtonOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [225, 226], [0, 1]);

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

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleTrackOptionPress = (track: Track) => {
    setSelectedItem(track);
    handlePresentModalPress();
  };

  const handleAddToPlaylistPress = () => {};
  const handleFavoritePress = () => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        isFavorite: !selectedItem?.isFavorite,
      });
    }
  };
  const handleDownloadPress = () => {
    // Handle download action
  };
  const handleRemoveFromPlaylistPress = () => {
    // Handle remove from playlist action
  };
  const handleArtistPress = () => {
    // Handle artist action
  };
  const handleSharePress = () => {
    // Handle share action
  };

  const onFollowPress = () => {
    // Handle follow action
  };

  return (
    <View className="flex-1">
        <Animated.ScrollView
          className="flex-1 w-full bg-transparen"
          onScroll={scrollHandler}
        >
      <View className="bg-black flex-1">
      <LinearGradient
        colors={getGradientColor("gray")}
        locations={[0.5, 0.8, 0.9, 1]}
        className="absolute w-full h-full"
      />
      <View>
      <Animated.View
        className="w-full h-72 relative rounded-lg overflow-hidden bg-transparent -z-20"
        style={imageSectionAnimatedStyle}
      >
        <Image
          source={unknownArtistImageSource}
          className="absolute w-full h-full -z-10"
          resizeMode="cover"
          alt="artist image"
        />
      </Animated.View>
      <View className="absolute bottom-0 left-0 right-0 px-4 py-1">
          <Heading
            numberOfLines={1}
            className="text-white text-5xl"
          >
            DA Lab
          </Heading>
        </View>
      </View>
          <HStack className="space-x-2 justify-between pr-4 py-2 w-full pl-4">
            <HStack className="items-center space-x-2">
              <Button
                variant="outline"
                action="primary"
                className="rounded-md justify-center bg-transparent w-fit"
                size="md"
                onPress={onFollowPress}
              >
                <ButtonText>Theo dõi</ButtonText>
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
            <HStack className="justify-items-end gap-2">
              <Button
                variant="solid"
                className="rounded-full justify-center bg-transparent h-14 w-14 data-[active=true]:bg-transparent data-[active=true]:opacity-40"
                size="md"
                onPress={onShufflePress}
              >
                <ButtonIcon as={Shuffle} className={buttonIconStyle} />
              </Button>
              <Animated.View>
                <Button
                  variant="solid"
                  className="rounded-full justify-center bg-blue-400 data-[active=true]:bg-blue-900 h-14 w-14"
                  size="md"
                  onPress={onPlayPress}
                >
                  <ButtonIcon
                    as={playing ? Pause : Play}
                    className="text-black fill-black w-6 h-6"
                  />
                </Button>
              </Animated.View>
            </HStack>
          </HStack>
          </View>
          <TracksList
            id={title || "random"}
            tracks={tracks || Library}
            scrollEnabled={false}
            className="p-4"
            onTrackOptionPress={handleTrackOptionPress}
            ItemSeparatorComponent={() => (
              <View className="h-3" />
            )}
          />
        </Animated.ScrollView>


      <Animated.View
        className="absolute w-full"
        style={{ paddingTop: insets.top }}
      >
        <Animated.View style={headerBackgroundAnimatedStyle} className="absolute w-full h-full">
          <LinearGradient
            colors={getGradientColor("gray")}
            locations={[0.5, 0.8, 0.9, 1]}
            className="absolute w-full h-full"
          />
          </Animated.View>
        <HStack className="items-center w-full">
          <Button
            onPress={() => {
              router.back();
            }}
            variant="solid"
            className="bg-transparent rounded-full justify-center h-14 w-14 data-[active=true]:bg-transparent"
            size="md"
          >
            <ButtonIcon
              as={ArrowLeft}
              className="text-primary-500"
              size="xxl"
            />
          </Button>
          <Animated.Text
            style={[scrollHeaderTitleAnimatedStyle]}
            className="text-white text-xl font-semibold ml-4"
          >
            DA Lab
          </Animated.Text>
        </HStack>
        <Animated.View
          className="absolute right-4 top-7"
          style={[
            playButtonAnimatedStyle,
            playButtonOpacity,
            { paddingTop: insets.top },
          ]}
        >
          <Button
            variant="solid"
            className="rounded-full justify-center bg-blue-400 data-[active=true]:bg-blue-900 h-14 w-14"
            size="md"
            onPress={onPlayPress}
          >
            <ButtonIcon
              as={playing ? Pause : Play}
              className="text-black fill-black"
            />
          </Button>
        </Animated.View>
        <MyBottomSheet bottomSheetRef={bottomSheetRef}>
          <HStack space="md">
            <Image
              source={
                selectedItem?.artwork
                  ? { uri: selectedItem.artwork }
                  : unknownTrackImageSource
              }
              className="rounded"
              size="sm"
              alt="track artwork"
            />
            <VStack className="flex-1 pl-2">
              <Text className="text-xl font-medium text-primary-500">
                {selectedItem?.title}
              </Text>
              <Text className="text-md text-gray-500">
                {selectedItem?.artist}
              </Text>
            </VStack>
          </HStack>
          <Box className="w-full my-4">
            <Divider />
          </Box>
          <VStack space="md" className="w-full">
            <ButtonBottomSheet
              onPress={handleAddToPlaylistPress}
              buttonIcon={CirclePlus}
              buttonText="Thêm vào danh sách phát"
            />
            <ButtonBottomSheet
              onPress={handleFavoritePress}
              stateChangable={true}
              fillIcon={selectedItem?.isFavorite}
              buttonIcon={Heart}
              buttonText="Thêm vào yêu thích"
            />
            <ButtonBottomSheet
              onPress={handleDownloadPress}
              buttonIcon={CircleArrowDown}
              buttonText="Tải xuống"
            />
            <ButtonBottomSheet
              onPress={handleRemoveFromPlaylistPress}
              buttonIcon={CircleX}
              buttonText="Xóa khỏi danh sách phát"
            />
            <ButtonBottomSheet
              onPress={handleArtistPress}
              buttonIcon={CircleUserRound}
              buttonText="Chuyển đến nghệ sĩ"
            />
            <ButtonBottomSheet
              onPress={handleSharePress}
              buttonIcon={Share2}
              buttonText="Chia sẻ"
            />
          </VStack>
        </MyBottomSheet>
      </Animated.View>
    </View>
  );
};

const buttonIconStyle = "text-primary-500 w-6 h-6";
