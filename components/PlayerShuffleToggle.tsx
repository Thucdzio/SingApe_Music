import { colors } from "@/constants/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps, useRef } from "react";
import { Pressable } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;

export const PlayerShuffleToggle = ({ ...iconProps }: IconProps) => {
  const handleShuffle = async () => {
    const currentQueue = await TrackPlayer.getQueue();
    const shuffledTracks = [...currentQueue].sort(() => Math.random() - 0.5);
    await TrackPlayer.setQueue(shuffledTracks);
    await TrackPlayer.play();
  };

  return (
    <Pressable>
      <MaterialCommunityIcons
        name="shuffle"
        onPress={handleShuffle}
        color={colors.icon}
        {...iconProps}
      />
    </Pressable>
  );
};
