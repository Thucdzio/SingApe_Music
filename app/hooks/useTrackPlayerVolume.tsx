import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

export const useTrackPlayerVolume = () => {
  const [volume, setVolume] = useState<number>(0);

  const getVolume = useCallback(async () => {
    const currentVolume = await TrackPlayer.getVolume();
    setVolume(currentVolume);
  }, []);

  const updateVolume = useCallback(async (newVolume: number) => {
    if (newVolume < 0 || newVolume > 1) return;

    setVolume((prev) => {
      if (Math.abs(prev - newVolume) < 0.01) return prev;
      return newVolume;
    });

    await TrackPlayer.setVolume(newVolume);
  }, []);

  useEffect(() => {
    getVolume();
  }, [getVolume]);

  return { volume, updateVolume };
};
