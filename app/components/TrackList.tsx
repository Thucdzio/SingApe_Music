import Library from "../../assets/data/library.json";
import { FlatList, FlatListProps, View } from "react-native";
import { TracksListItem } from "./TrackListItem";
import TrackPlayer, { Track } from "react-native-track-player";

export type TracksListProps = Partial<FlatListProps<Track>> & {};
export const TrackList = ({ ...flatlistProps }: TracksListProps) => {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
  };
  return (
    // <FlatList
    //   data={Library}
    //   renderItem={({ item: track }) => (
    //     <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
    //   )}
    //   {...flatlistProps}
    // />
    View
  );
};
