import { colors } from "@/constants/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { useTrackPlayerShuffleMode } from "@/hooks/useTrackPlayerShuffleMode";

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;

export const PlayerShuffleToggle = ({ ...iconProps }: IconProps) => {
  const { isShuffling, toggleShuffleMode } = useTrackPlayerShuffleMode();

  return (
    <MaterialCommunityIcons
      name="shuffle"
      onPress={toggleShuffleMode}
      color={isShuffling ? colors.blue : colors.icon}
      {...iconProps}
    />
  );
};
