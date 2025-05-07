import TrackPlayer, { Event, Track } from "react-native-track-player";
import { useQueue } from "@/store/queue";

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

export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}

export const playTrack = async (track: Track) => {
  try {
    const { activeQueueId, setActiveQueueId } = useQueue();
    if (activeQueueId === track.id) {
      return;
    }
    setActiveQueueId(track.id);

    await TrackPlayer.reset();
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  } catch (error) {
    console.error("Error loading track:", error);
  }
};

export const playPlaylist = async (tracks: Track[], id: string) => {
  try {
    if (!tracks || tracks.length === 0) return;
    const { activeQueueId, setActiveQueueId } = useQueue();
    if (activeQueueId === id) {
      TrackPlayer.pause();
      return;
    }
    setActiveQueueId(id);
    
    await TrackPlayer.reset();
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
  } catch (error) {
    console.error("Error loading playlist:", error);
  }
}

export const playPlaylistFromIndex = async (tracks: Track[], index: number, id: string) => {
  if (!tracks || index < 0 || index >= tracks.length) return;
  

  TrackPlayer.reset(); // clear existing queue
  TrackPlayer.add(tracks);
  TrackPlayer.skip(tracks[index].id);
  TrackPlayer.play();

}

export const playPlaylistFromTrack = async (tracks: Track[], trackIndex: Track) => {
  if (trackIndex === undefined) return;
  const index = tracks.findIndex((track) => track.id === trackIndex.id);
  if (index === -1) return;

  TrackPlayer.reset();
  TrackPlayer.setQueue(tracks.slice(index));
  TrackPlayer.play();
}