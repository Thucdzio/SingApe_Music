import { colors } from "../../constants/token";
import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { VStack, HStack, Pressable } from "@/components/ui";

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <VStack className={`w-full ${style}`}>
      <HStack className="flex-row justify-evenly items-center">
        <SkipToPreviousButton />
        <PlayPauseButton />
        <SkipToNextButton />
      </HStack>
    </VStack>
  );
};

export const PlayPauseButton = ({
  style,
  iconSize = 48,
}: PlayerButtonProps) => {
  const { playing } = useIsPlaying();

  return (
    <Pressable
      className={`h-${iconSize} ${style}`}
      onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
    >
      <FontAwesome6
        name={playing ? "pause" : "play"}
        size={iconSize}
        color={colors.text}
      />
    </Pressable>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <Pressable onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
    </Pressable>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <Pressable onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name="backward" size={iconSize} color={colors.text} />
    </Pressable>
  );
};
