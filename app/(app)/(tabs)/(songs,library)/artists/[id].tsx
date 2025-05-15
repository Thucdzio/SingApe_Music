import { ArtistScreen } from "@/components/screens/ArtistScreen";
import { fetchArtist } from "@/lib/spotify";
import { ArtistResult, MyTrack } from "@/types/zing.types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Artist() {
  const item = useLocalSearchParams<MyTrack>();
  const [data, setData] = useState<ArtistResult>();

  useEffect(() => {
    const fetchData= async () => {
      console.log("item", item);
      const response = await fetchArtist(item.id);
      setData(response);
      console.log("response", response);
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-background-0">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ArtistScreen 
        data={data}
        id={data?.id}
        name={data?.name}
        imageUrl={data?.thumbnail}
      />
    </View>
  );
}
