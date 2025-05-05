import CustomHeader from "@/components/CustomHeader";
import { TracksList } from "@/components/TrackList";
import { supabase } from "@/lib/supabase";
import { getListeningHistory } from "@/services/fileService";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Track } from "react-native-track-player";

export default function History() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const history = await getListeningHistory();
        const track = history.map((item) => {
          return {
            id: item.track.id,
            title: item.track.title || "Unknown Title",
            artist: item.track.artist || "Unknown Artist",
            album: item.track.album || "Unknown Album",
            url: item.track.url,
            artwork: item.track.artwork || undefined,
            genre: item.track.genre || undefined,
          } as Track;
        });
        setTracks(track);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <CustomHeader
        title="Lịch sử"
        showBack={true}
        centerTitle={false}
        headerClassName="bg-background-0"
      />

      <TracksList
        id="history"
        tracks={tracks}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        className="px-4"
      />
    </SafeAreaView>
  );
}
