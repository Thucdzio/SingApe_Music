import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  Text,
  Pressable,
  Spinner,
  VStack,
  HStack,
  Image,
} from "@/components/ui";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { unknownTrackImageSource } from "@/constants/image";
import colors from "tailwindcss/colors";

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};

export const TracksListItem1 = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TracksListItemProps) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;
  console.log("Track :", track);
  return (
    // onPress={() => handleTrackSelect(track)}
    <Pressable
      onPress={() => handleTrackSelect(track)}
      className="px-0 py-2 flex-1"
    >
      <HStack space="md" className="gap-4 items-center pr-5">
        <HStack className="relative">
          <Image
            source={
              typeof track.artwork === "string" &&
              track.artwork.startsWith("http")
                ? { uri: track.artwork }
                : unknownTrackImageSource
            }
            className={`w-12 h-12 rounded ${
              isActiveTrack ? "opacity-60" : "opacity-100"
            }`}
            alt="track artwork"
          />
          {isActiveTrack &&
            (playing ? (
              <Spinner
                className="absolute top-[12px] left-[12px]"
                size="small"
                color={colors.black}
              />
            ) : (
              <Ionicons
                style={{ position: "absolute", top: 12, left: 12 }}
                name="play"
                size={24}
                color="black"
              />
            ))}
        </HStack>
        <HStack className="flex-1 items-center justify-between">
          <VStack className="flex-1 pr-2">
            <Text
              numberOfLines={1}
              className={`text-sm font-semibold ${
                isActiveTrack ? "text-primary" : "text-foreground"
              }`}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text numberOfLines={1} className="text-muted text-[14px] mt-1">
                {track.artist}
              </Text>
            )}
          </VStack>

          <Entypo name="dots-three-horizontal" size={18} color="#999" />
        </HStack>

        {/* <StopPropagation>
          <TrackShortcutsMenu track={track}>
            <Entypo name="dots-three-horizontal" size={18} color="#999" />
          </TrackShortcutsMenu>
        </StopPropagation> */}
      </HStack>
    </Pressable>
  );
};
