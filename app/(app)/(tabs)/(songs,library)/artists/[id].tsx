import { ArtistScreen } from "@/components/screens/ArtistScreen";
import { MyTrack } from "@/types/zing.types";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Artist() {
  const [data, setData] = useState<MyTrack[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      // const response = await fetchArtist
    };

    fetchArtist();
  }, []);

  return (
    <View className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ArtistScreen />
    </View>
  );
}
