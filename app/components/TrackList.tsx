import Library from "../../assets/data/library.json";
import React, { useEffect } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { TracksListItem } from "./TrackListItem";
import TrackPlayer, { Track } from "react-native-track-player";

export type TracksListProps = Partial<FlatListProps<Track>> & {};

export const TrackList = ({ ...flatlistProps }: TracksListProps) => {
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        const state = await TrackPlayer.getState().catch(() => null);
        if (state === null) {
          await TrackPlayer.setupPlayer();
          console.log("Player setup done");
        } else {
          console.log("Player already setup");
        }
      } catch (error) {
        console.error("Error setting up player:", error);
      }
    };
    setupPlayer();
  }, []);

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
      data={Library}
      renderItem={({ item: track }) => (
        <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      keyExtractor={(item) => item.url}
      {...flatlistProps}
    />
  );
};
