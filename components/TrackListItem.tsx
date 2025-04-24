import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  Text,
  Pressable,
  Spinner,
  VStack,
  HStack,
  Image,
  Center,
  Icon,
  Box,
  Button,
} from "@/components/ui";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { unknownTrackImageSource } from "@/constants/image";
import PlayingBars from "./PlayingBar";
import { EllipsisVertical, Option, Play } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { iconColor } from "@/constants/tokens";
import { useSelector } from "react-redux";
import { ButtonIcon } from "./ui/button";
import { Children, useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "./ui/actionsheet";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetBackdrop, BottomSheetContent, BottomSheetDragIndicator, BottomSheetItem, BottomSheetItemText, BottomSheetPortal, BottomSheetTrigger } from "./ui/bottomsheet";
import BottomSheet from "@gorhom/bottom-sheet";

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
  onRightPress?: (track: Track) => void;
  children?: React.ReactNode;
};

export const TracksListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
  onRightPress,
  children,
}: TracksListItemProps) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;
  const reverseTheme = useSelector((state: any) =>
    state.isDarkMode ? "light" : "dark"
  );

  const handleOptionPress = (track: Track) => {
    onRightPress?.(track);
  };

  return (
    // onPress={() => handleTrackSelect(track)}
    <Pressable onPress={() => handleTrackSelect(track)} className="px-0 py-2">
      <HStack space="md" className="gap-4 items-center">
        <Center className="relative">
          <Image
            source={
              track.artwork ? { uri: track.artwork } : unknownTrackImageSource
            }
            className={`w-12 h-12 rounded`}
            alt="track artwork"
          />

          {isActiveTrack ? (
            <>
              <BlurView
                className="absolute w-full h-full"
                tint={reverseTheme}
                intensity={80}
              />
              {playing ? (
                <PlayingBars color={iconColor.activeLight} />
              ) : (
                <Icon
                  as={Play}
                  className="absolute text-indigo-500 fill-indigo-500"
                />
              )}
            </>
          ) : null}
        </Center>
        <HStack className="flex-1 items-center justify-between">
          <VStack className="flex-1 pr-2">
            <Text
              numberOfLines={1}
              className={`text-sm font-semibold ${
                isActiveTrack ? "text-indigo-500" : "text-foreground"
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
          <Button
              variant="solid"
              className="bg-transparent border-none data-[active=true]:bg-transparent w-5 h-5"
              size="sm"
              onPress={() => handleOptionPress(track)}
            >
              <ButtonIcon
                as={EllipsisVertical}
                size="xl"
                className="text-primary-500"
              />
            </Button>
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
