import { fetchSong } from "@/lib/spotify";
import { ExtendedTrack, MyTrack } from "@/types/zing.types";
import { useEffect } from "react";
import { Track } from "react-native-track-player";

export async function convertZingToTrack(track: ExtendedTrack): Promise<MyTrack> {
  return {
    id: track.encodeId,
    title: track.title,
    artist: track.artists[0].name,
    artwork: track.thumbnailM,
    url: track.link,
    duration: track.duration,
    score: track.score,
    rakingStatus: track.rakingStatus,
    weeklyRanking: track.weeklyRanking,
  };
}
