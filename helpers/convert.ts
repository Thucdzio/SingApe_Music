import { fetchSong } from "@/lib/spotify";
import { ExtendedTrack, MyTrack } from "@/types/zing.types";
import { useEffect } from "react";
import { Track } from "react-native-track-player";

export async function convertZingToTrack(track: ExtendedTrack): Promise<MyTrack> {
  if (track.link.includes("/album") || track.link.includes("/playlist")) {
    track.link = track.link.split("/").slice(0, -1).join("/");
  } else {
    const song = await fetchSong(track.encodeId);
    track.link = song;
  }

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
