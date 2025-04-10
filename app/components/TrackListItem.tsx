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

export const TracksListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TracksListItemProps) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    // onPress={() => handleTrackSelect(track)}
    <Pressable onPress={() => handleTrackSelect(track)} className="px-0 py-2">
      <HStack space="md" className="gap-4 items-center pr-5">
        <HStack className="relative">
          <Image
            source={
              track.artwork ? { uri: track.artwork } : unknownTrackImageSource
            }
            className={`w-12 h-12 rounded ${
              isActiveTrack ? "opacity-60" : "opacity-100"
            }`}
            alt="track artwork"
          />
          {isActiveTrack &&
            (playing ? (
              <Spinner />
            ) : (
              <Ionicons
                style={{ position: "absolute", top: 14, left: 14 }}
                name="play"
                size={24}
                color="#999"
              />
            ))}
        </HStack>

        <VStack className="flex-1" space="lg">
          <Text
            numberOfLines={1}
            className={`text-sm font-semibold ${
              isActiveTrack ? "text-primary" : "text-foreground"
            } max-w-[90%]`}
          >
            {track.title}
          </Text>

          {track.artist && (
            <Text numberOfLines={1} className="text-muted text-[14px] mt-1">
              {track.artist}
            </Text>
          )}
          <Entypo
            name="dots-three-horizontal"
            size={18}
            colors="black"
          ></Entypo>
        </VStack>

        {/* <StopPropagation>
          <TrackShortcutsMenu track={track}>
            <Entypo name="dots-three-horizontal" size={18} color="#999" />
          </TrackShortcutsMenu>
        </StopPropagation> */}
      </HStack>
    </Pressable>
  );
};
