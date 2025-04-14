import {
  SkipToPreviousButton,
  PlayerControls,
  PlayPauseButton,
  SkipToNextButton,
} from "@/components/PlayerControls";
import { unknownTrackImageSource } from "../constants/image";
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, ViewProps } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { MovingText } from "@/components/MovingText";
import { HStack, Image, Pressable, VStack } from "@/components/ui";
import { colors } from "@/constants/tokens";

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
        bottom: 40,
        left: 10,
        right: 10,
        zIndex: 9999,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Pressable
        onPress={handlePress}
        className="flex-row items-center  rounded-xl"
        style={{ backgroundColor: "#252525" }}
      >
        <HStack space="4xl" className="flex-1 items-center">
          <Image
            source={{
              uri: displayedTrack.artwork ?? unknownTrackImageSource,
            }}
            className="w-16 h-16 rounded-xl m-2"
          />
          <MovingText
            text={displayedTrack.title ?? ""}
            animationThreshold={25}
            style={{
              color: colors.text,
              flex: 1,
              fontSize: 15,
              fontWeight: "600",
              overflow: "hidden",
            }}
          />
          <HStack className=" items-center flex-1 px-30 ">
            <SkipToPreviousButton iconSize={22} />
            <PlayPauseButton iconSize={28} />
            <SkipToNextButton iconSize={22} />
          </HStack>
        </HStack>
      </Pressable>
    </View>
  );
};
