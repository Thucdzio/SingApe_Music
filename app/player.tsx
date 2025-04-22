import { MovingText } from "../components/MovingText";
import { PlayerControls } from "../components/PlayerControls";
import { PlayerProgressBar } from "../components/PlayerProgressbar";
import { PlayerRepeatToggle } from "../components/PlayerRepeatToggle";
import { PlayerVolumeBar } from "../components/PlayerVolumeBar";
import { unknownTrackImageSource } from "@/constants/image";
import { colors, fontSize } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/usePlayerBackground";
import { useTrackPlayerFavorite } from "@/hooks/useTrackPlayerFavorite";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { Box, VStack, HStack, Text, Spinner, Center } from "@/components/ui";
import { Image } from "react-native";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { imageColors } = usePlayerBackground(
    activeTrack?.artwork ?? unknownTrackImageSource
  );

  const { top, bottom } = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useTrackPlayerFavorite();

  if (!activeTrack) {
    return (
      <Center className="flex-1 bg-background">
        <Spinner color="$icon" />
      </Center>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        imageColors
          ? [imageColors.background, imageColors.primary]
          : [colors.background, colors.background]
      }
    >
      <Box
        className="flex-1 px-5"
        style={{ paddingTop: top + 70, paddingBottom: bottom }}
      >
        <DismissPlayerSymbol />

        <Center className="h-[45%]">
          <Image
            source={{ uri: activeTrack.artwork ?? unknownTrackImageSource }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
          />
        </Center>

        <VStack className="flex-1 mt-10">
          <VStack>
            <VStack className="h-[70px]">
              <HStack className="justify-between items-center">
                <Box className="flex-1 overflow-hidden">
                  <MovingText
                    text={activeTrack.title ?? ""}
                    animationThreshold={30}
                    style={{
                      color: colors.text,
                      fontSize: 25,
                      fontWeight: "700",
                    }}
                  />
                </Box>
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={20}
                  color={isFavorite ? colors.primary : colors.icon}
                  style={{ marginHorizontal: 14 }}
                  onPress={toggleFavorite}
                />
              </HStack>

              {activeTrack.artist && (
                <Text
                  numberOfLines={1}
                  className="text-white text-[20px] font-bold opacity-80 w-[90%]"
                >
                  {activeTrack.artist}
                </Text>
              )}
            </VStack>

            <PlayerProgressBar style={{ marginTop: 20 }} />
            <PlayerControls style={{ marginTop: 10 }} iconSize={48} />
          </VStack>
          <PlayerVolumeBar style={{ marginTop: 30 }} />
          <Center className="mt-10">
            <PlayerRepeatToggle size={30} className="mb-2" />
          </Center>
        </VStack>
      </Box>
    </LinearGradient>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Box
      className="absolute left-0 right-0 flex-row justify-center"
      style={{ top: top + 8 }}
    >
      <Box className="w-[50px] h-2 rounded-full bg-white opacity-70" />
    </Box>
  );
};

export default PlayerScreen;
