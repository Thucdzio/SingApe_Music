import { useState, useCallback } from "react";
import TrackPlayer from "react-native-track-player";

export function useTrackPlayerShuffleMode() {
  const [isShuffling, setIsShuffling] = useState(false);

  const toggleShuffleMode = useCallback(async () => {
    const currentQueue = await TrackPlayer.getQueue();

    if (currentQueue.length === 0) return;

    // Shuffle queue
    const shuffledQueue = shuffleArray(currentQueue);

    await TrackPlayer.reset();
    await TrackPlayer.add(shuffledQueue);

    await TrackPlayer.play();

    setIsShuffling(true);
  }, []);

  return { isShuffling, toggleShuffleMode };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
