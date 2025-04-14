import { HStack, Slider, Icon } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useTrackPlayerVolume } from "../hooks/useTrackPlayerVolume";
import { View } from "react-native";
import {
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { colors } from "@/constants/tokens";
import { useEffect, useState } from "react";

export const PlayerVolumeBar = ({ style }: { style?: any }) => {
  const { volume = 0, updateVolume } = useTrackPlayerVolume();
  const [localVolume, setLocalVolume] = useState(volume ?? 0);

  useEffect(() => {
    if (volume !== undefined && volume !== localVolume) {
      setLocalVolume(volume);
    }
  }, [volume]);

  return (
    <View className="w-full" style={style}>
      <HStack space="sm" className="items-center">
        <Ionicons
          name="volume-low"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
        <Slider
          value={localVolume}
          onChange={(value) => {
            setLocalVolume(value);
          }}
          onChangeEnd={(value) => {
            updateVolume(value);
          }}
          className="flex-1"
        >
          <SliderTrack className="bg-gray-300 h-[4px] opacity-60 ">
            <SliderFilledTrack
              style={{ backgroundColor: "#fff" }}
              className="bg-white"
            />
          </SliderTrack>
          <SliderThumb
            className="bg-primary w-2 h-2 rounded-full color-white"
            // style={{ borderWidth: 2, borderColor: "white" }}
          />
        </Slider>
        <Ionicons
          name="volume-high"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
      </HStack>
    </View>
  );
};
