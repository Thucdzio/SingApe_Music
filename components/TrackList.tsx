import Library from "../assets/data/library.json";
import React, { useEffect, useRef } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { TracksListItem } from "./TrackListItem";
import TrackPlayer, { Track } from "react-native-track-player";
import { saveListeningHistory } from "@/services/fileService";
import { useQueue } from "@/store/queue";
import { fetchSong } from "@/lib/spotify";
import { Center } from "./ui";
import { Heading } from "./ui/heading";
import { MyTrack } from "@/types/zing.types";
import { playPlaylistFromTrack } from "@/services/playbackService";

export type TracksListProps = Partial<FlatListProps<MyTrack>> & {
  id: string;
  tracks: MyTrack[];
  hideQueueControls?: boolean;
  variant?: "album" | "playlist";
  onTrackSelect?: (track: MyTrack) => void;
  onTrackOptionPress?: (track: MyTrack) => void;
  children?: React.ReactNode;
};

export const TracksList = ({
  id,
  tracks,
  hideQueueControls = false,
  onTrackSelect,
  onTrackOptionPress,
  children,
  variant = "playlist",
  ...flatlistProps
}: TracksListProps) => {
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: MyTrack) => {
    // const trackIndex = tracks.findIndex(
    //   (track) => track.url === selectedTrack.url
    // );

    // if (trackIndex === -1) return;

    // const isChangingQueue = id !== activeQueueId;

    // if (isChangingQueue) {
    //   const beforeTracks = tracks.slice(0, trackIndex);
    //   const afterTracks = tracks.slice(trackIndex + 1);

    //   await TrackPlayer.reset();

    //   // we construct the new queue
    //   await TrackPlayer.add(selectedTrack);
    //   await TrackPlayer.add(afterTracks);
    //   await TrackPlayer.add(beforeTracks);

    //   await TrackPlayer.play();
    //   saveListeningHistory(tracks[trackIndex]);

    //   queueOffset.current = trackIndex;
    //   setActiveQueueId(id);
    // } else {
    //   const nextTrackIndex =
    //     trackIndex - queueOffset.current < 0
    //       ? tracks.length + trackIndex - queueOffset.current
    //       : trackIndex - queueOffset.current;

    //   await TrackPlayer.skip(nextTrackIndex);
    //   TrackPlayer.play();
    // }
    if (onTrackSelect) {
      onTrackSelect(selectedTrack);
    } else {
      playPlaylistFromTrack(tracks, selectedTrack);
    }
  };

  if (!tracks || tracks.length === 0) {
    return (
      <Center className="flex-1">
        <Heading className="text-primary-500 text-center w-2/3">
          Không có bài hát nào
        </Heading>
        {children}
      </Center>
    );
  }

  return (
    <FlatList
      data={tracks || Library}
      initialNumToRender={8}
      maxToRenderPerBatch={9}
      windowSize={5}
      renderItem={({ item: track }) => (
        <TracksListItem
          track={track}
          onTrackSelect={handleTrackSelect}
          onRightPress={onTrackOptionPress}
          children={children}
          variant={variant}
        />
      )}
      keyExtractor={(item) => item.id || item.url}
      {...flatlistProps}
    />
  );
};
