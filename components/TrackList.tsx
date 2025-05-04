import React, { useEffect } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { TracksListItem } from "./TrackListItem";
import TrackPlayer, { Track } from "react-native-track-player";
import { saveListeningHistory } from "@/services/fileService";
import Library from "assets/data/library.json";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks?: Track[];
  onTrackSelect?: (track: Track) => void;
  onTrackOptionPress?: (track: Track) => void;
  children?: React.ReactNode;
};

export const TrackList = (props: TracksListProps) => {
  const { tracks, onTrackOptionPress, ...flatlistProps } = props;

  const handleTrackSelect = async (track: Track) => {
    try {
      flatlistProps.onTrackSelect?.(track);
      console.log("Selected track:", track);
      await TrackPlayer.load(track);
      await TrackPlayer.play();
      saveListeningHistory(track);
    } catch (error) {
      console.error("Error loading track:", error);
    }
  };

  return (
    <FlatList
      data={tracks || Library}
      renderItem={({ item: track }) => (
        <TracksListItem
          track={track}
          onTrackSelect={handleTrackSelect}
          onRightPress={onTrackOptionPress}
          children={props.children}
        />
      )}
      keyExtractor={(item) => item.id || item.url}
      {...flatlistProps}
    />
  );
};
