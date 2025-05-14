import React, { useEffect } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { TracksListItem } from "./TrackListItem";
import TrackPlayer, { Track } from "react-native-track-player";
import { saveListeningHistory } from "@/services/fileService";
import Library from "assets/data/library.json";
import { getSongMp3Url } from "@/lib/api/storage.api";
import { playTrack } from "@/services/playbackService";

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

      // If the track doesn't have a valid URL, fetch it from storage
      if (!track.url || track.url.trim() === "") {
        const url = await getSongMp3Url(track.id);
        if (url) {
          track.url = url;
        } else {
          console.error("Could not get song URL from storage");
          return;
        }
      }

      // Play the track using the playbackService helper
      await playTrack(track);
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
