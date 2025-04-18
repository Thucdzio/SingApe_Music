import { useState, useCallback, useEffect } from "react";
import TrackPlayer, { Track } from "react-native-track-player";

export function useTrackPlayerShuffleMode() {
  //   const [isShuffling, setIsShuffling] = useState(false);
  //   const [originalQueue, setOriginalQueue] = useState<Track[]>([]);

  //   const toggleShuffleMode = useCallback(async () => {
  //     const currentQueue = await TrackPlayer.getQueue();

  //     if (!isShuffling) {
  //       setOriginalQueue(currentQueue);

  //       // Shuffle queue
  //       const shuffled = shuffleArray(currentQueue);
  //       await TrackPlayer.reset();
  //       await TrackPlayer.add(shuffled);
  //       await TrackPlayer.play();
  //     } else {
  //       // Khôi phục queue gốc
  //       await TrackPlayer.reset();
  //       await TrackPlayer.add(originalQueue);
  //       await TrackPlayer.play();
  //     }

  //     setIsShuffling((prev) => !prev);
  //   }, [isShuffling, originalQueue]);

  //   return { isShuffling, toggleShuffleMode };
  // }

  // function shuffleArray<T>(array: T[]): T[] {
  //   const shuffled = [...array];
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  //   }
  //   return shuffled;

  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const fetchShuffle = async () => {
      setIsShuffling(false);
    };
    fetchShuffle();
  }, []);

  const toggleShuffleMode = () => {
    setIsShuffling((prev) => !prev);
  };

  return { isShuffling, toggleShuffleMode };
}
