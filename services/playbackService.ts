import TrackPlayer, { Event, Track } from "react-native-track-player";
import { saveListeningHistory } from "./fileService";

export const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
};

export const playTrack = async (track: Track) => {
  try {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
    saveListeningHistory(track);
  } catch (error) {
    console.error("Error loading track:", error);
  }
};