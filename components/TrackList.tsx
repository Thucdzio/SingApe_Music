import Library from "../assets/data/library.json";
import React, { useEffect } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { TracksListItem } from "../components/TrackListItem";
import TrackPlayer, { Track } from "react-native-track-player";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks?: Track[];
  onTrackOptionPress?: (track: Track) => void;
  children?: React.ReactNode;
};

export const TrackList = ({ ...flatlistProps }: TracksListProps) => {
  const handleTrackSelect = async (track: Track) => {
    try {
      await TrackPlayer.load(track);
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error loading track:", error);
    }
  };

  if (!Library || Library.length === 0) {
    return <Text>No tracks available</Text>;
  }

  return (
    <FlatList
      data={flatlistProps.tracks || Library}
      renderItem={({ item: track }) => (
        <TracksListItem
          track={track}
          onTrackSelect={handleTrackSelect}
          onRightPress={flatlistProps.onTrackOptionPress}
          children={flatlistProps.children}
        />
      )}
      keyExtractor={(item) => item.url}
      {...flatlistProps}
    />
  );
};
