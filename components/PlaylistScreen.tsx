import { FlatList, ScrollView, View } from "react-native";
import { Image, VStack, Text, HStack, Box, Button } from "./ui";
import { Heading } from "./ui/heading";
import { ButtonIcon, ButtonText } from "./ui/button";
import { ArrowLeft, CirclePlus, Play, Shuffle } from "lucide-react-native";
import { TrackList } from "./TrackList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {  Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import colors from "tailwindcss/colors";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { backgroundColor } from "@/constants/tokens";

interface PlaylistProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  createdBy?: string;
  tracks?: Array<{ id: string; title: string; artist: string }>;
  onTrackPress?: (trackId: string) => void;
}

export const PlaylistScreen = ({ ...props }: PlaylistProps) => {
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
      [249, 250],
      [0, 1]
    );

    return { opacity };
  });

  const playButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [160, 200],
      [0, -50],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  return (
    <View className="flex-1">
      <Animated.ScrollView
        className="flex-1 w-full bg-transparent"
        onScroll={scrollHandler}
      >
        <LinearGradient
          colors={[
            colors.purple[400],
            (colorScheme.colorScheme === "dark" ? colors.purple[700] : colors.purple[200]),
            (colorScheme.colorScheme === "dark" ? colors.purple[900] : colors.purple[50]),
            (colorScheme.colorScheme === "dark" ? backgroundColor.dark : colors.white),
          ]}
          style={[{ paddingTop: insets.top }]}
        >
          <VStack className="bg-transparent">
            <Box className="w-full justify-center items-center mt-4">
              <Image
                source={{ uri: "https://picsum.photos/200/300?random=3" }}
                className="w-48 h-48 rounded-lg"
                alt="Playlist Image"
                resizeMode="cover"
              />
            </Box>
            <Box className="justify-center items-center mt-4">
              <Heading>Playlist Screen</Heading>
              <Text className="text-gray-500 mt-2">Author</Text>
            </Box>
            <HStack className="mt-4 space-x-2 justify-between p-4 w-full">
              <HStack>
                <Button
                  variant="solid"
                  className="rounded-full justify-center bg-transparent data-[active=true]:bg-background-200 h-14 w-14"
                  size="md"
                >
                  <ButtonIcon as={CirclePlus} className="text-black" />
                </Button>
              </HStack>
              <HStack className="justify-items-end gap-2">
                <Button
                  variant="solid"
                  className="rounded-full justify-center bg-transparent data-[active=true]:bg-background-200 h-14 w-14"
                  size="md"
                >
                  <ButtonIcon as={Shuffle} className="text-black" />
                </Button>
                <Animated.View
                  
                >
                  <Button
                    variant="solid"
                    className="rounded-full justify-center bg-blue-400 data-[active=true]:bg-blue-900 h-14 w-14"
                    size="md"
                  >
                    <ButtonIcon as={Play} className="text-black fill-black" />
                  </Button>
                </Animated.View>
              </HStack>
            </HStack>
          </VStack>
        </LinearGradient>
        <TrackList scrollEnabled={false} className="p-4" />
      </Animated.ScrollView>

      
      <Animated.View
        className="absolute w-full"
        style={[headerBackgroundAnimatedStyle, { paddingTop: insets.top }]}
      >
        <HStack className="items-center w-full">
          <Button
            onPress={() => {router.back()}}
            variant="solid"
            className="bg-transparent rounded-full justify-center h-14 w-14 data-[active=true]:bg-background-200"
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
          style={[playButtonOpacity, { paddingTop: insets.top }]}
          >
        <Button
          variant="solid"
          className="rounded-full justify-center bg-blue-400 data-[active=true]:bg-blue-900 h-14 w-14"
          size="md"
        >
          <ButtonIcon as={Play} className="text-black fill-black" />
        </Button>
        </Animated.View>
      </Animated.View>
    </View>
  );
};
