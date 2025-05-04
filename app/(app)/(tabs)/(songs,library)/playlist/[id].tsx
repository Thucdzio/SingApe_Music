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
import { Heading } from "@/components/ui/heading";
import { TrackList } from "@/components/TrackList";


export default function Playlist() {
  const { id, image, title, createdBy } = useLocalSearchParams();

  return (
    // <PlaylistScreen
    //     title={title as string}
    //     description={""}
    //     imageUrl={image as string}
    //     tracks={[]}
    //     onTrackPress={(trackId) => console.log(trackId)}
    //     createdBy={createdBy as string}
    // />
    <View className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PlaylistScreen />
    </View>
  );
}
