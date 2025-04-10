import React, { useEffect, useState } from "react";
import { View, Text, Button, ViewStyle } from "react-native";
import TrackPlayer, { Event, State, Track } from "react-native-track-player";

interface FloatingPlayerProps {
  style?: ViewStyle;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ style }) => {
  const [track, setTrack] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Setup Player và Add Track
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        console.log("Player đã được khởi tạo");
        console.log("Current state: ", isPlaying);
        // Thêm track vào player
        await TrackPlayer.add({
          id: "1",
          url: "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw ",
          title: "Sample Track",
          artist: "Sample Artist",
        });
        console.log("Track đã được thêm vào player");
      } catch (error) {
        console.error("Lỗi khi khởi tạo player: ", error);
      }
    };

    const onPlaybackTrackChanged = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      (event) => {
        console.log("Track Changed:", event);
        if (event.track) {
          setTrack(event.track);
        }
      }
    );

    const onPlaybackStateChanged = TrackPlayer.addEventListener(
      Event.PlaybackState,
      (event) => {
        console.log("State Changed:", event);
        setIsPlaying(event.state === State.Playing);
      }
    );

    setupPlayer();

    // Cleanup: Hủy đăng ký sự kiện khi component unmount
    return () => {
      onPlaybackTrackChanged.remove();
      onPlaybackStateChanged.remove();
    };
  }, []);

  const togglePlayback = async () => {
    console.log("presss button play");
    console.log(isPlaying);
    try {
      if (isPlaying) {
        console.log("Pausing track...");
        await TrackPlayer.pause();
      } else {
        console.log("Playing track...");
        await TrackPlayer.play();
      }

      // Lấy lại trạng thái sau khi gọi play hoặc pause
      const state = await TrackPlayer.getState();
      console.log("Current player state after action:", state);

      // Cập nhật trạng thái isPlaying
      setIsPlaying(state === State.Playing);
    } catch (error) {
      console.error("Lỗi khi cố gắng play/pause: ", error);
    }
  };

  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: 50,
          left: 0,
          width: "100%",
        },
        style,
      ]}
    >
      <Text>Track: {track ? track.title : "No Track"}</Text>
      <Text>State: {isPlaying ? "Playing" : "Paused"}</Text>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayback} />
    </View>
  );
};

export default FloatingPlayer;
