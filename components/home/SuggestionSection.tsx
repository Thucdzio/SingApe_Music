import React, { useEffect, useState } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Text, VStack } from "@/components/ui";
import { supabase } from "@/components/utils/supabase";
import { downloadSong } from "@/components/DowloadMusic";
interface Song {
  id: string;
  title: string;
  url: string;
}

interface SuggestionSectionProps {
  onPressSong?: (song: Song) => void;
}

const SuggestionSection = ({ onPressSong }: SuggestionSectionProps) => {
  const [suggestedSongs, setSuggestedSongs] = useState<Song[]>([]);
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("id, title, url")
        .limit(10);

      if (error) {
        console.error("Lỗi khi fetch songs từ Supabase:", error.message);
      } else {
        setSuggestedSongs(data as Song[]);
      }
    };

    fetchSuggestions();
  }, []);
  console.log(suggestedSongs);
  return (
    <VStack space="md" className="mb-4">
      <Text className="text-xl font-bold">Gợi ý cho bạn</Text>
      <FlatList
        data={suggestedSongs}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => downloadSong(item.url, item.title)}
            style={{ width: 120 }}
          >
            {/* <Image
              source={{ uri: item.thumbnail }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 12,
                marginBottom: 8,
              }}
            /> */}
            <Text numberOfLines={2} className="text-sm font-medium">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </VStack>
  );
};

export default SuggestionSection;
