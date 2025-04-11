import {
  PlayerControls,
  PlayPauseButton,
  SkipToNextButton,
} from "../components/PlayerControls";
import { unknownTrackImageSource } from "../../constants/image";
import { useLastActiveTrack } from "../hook/useLastActiveTrack";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, ViewProps } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { MovingText } from "./MovingText";
import { HStack, Image, Pressable, VStack } from "@/components/ui";

export const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();

  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();
  console.log("Active Track:", activeTrack);
  console.log("Last Active Track:", lastActiveTrack);

  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handlePress = () => {
    router.navigate("/player");
  };

  if (!displayedTrack) {
    console.log("No track is currently playing or active.");
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        zIndex: 9999,
        paddingHorizontal: 12,
      }}
    >
      <Pressable
        onPress={handlePress}
        className="flex-row items-center bg-[#252525] p-3 rounded-xl py-2.5"
      >
        <HStack className="flex-1 items-center justify-between">
          <HStack className="flex-row items-center space-x-2">
            <Image
              source={{
                uri: displayedTrack.artwork ?? unknownTrackImageSource,
              }}
              className="w-10 h-10 rounded-lg"
            />
            <MovingText
              text={displayedTrack.title ?? ""}
              animationThreshold={25}
            />
          </HStack>

          {/* PlayerControls sẽ được đẩy sang phải */}
          <View>
            <PlayerControls />
          </View>
        </HStack>
      </Pressable>
    </View>
  );
};
