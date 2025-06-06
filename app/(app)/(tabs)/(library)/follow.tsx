import CustomHeader from "@/components/CustomHeader";
import { router, Stack } from "expo-router";
import { UserRound } from "lucide-react-native";
import { Text } from "@/components/ui";
import { FlatList, ScrollView, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TracksList } from "@/components/TrackList";
import { Track } from "react-native-track-player";
import { MyTrack } from "@/types/zing.types";
import { Artist } from "@/lib/supabase";
import { getFollows } from "@/services/cacheService";
import { useAuth } from "@/context/auth";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function Follow() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Artist[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFollows(user?.id || "");
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <SafeAreaView className="bg-background-0 dark:bg-background-0 flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4">
            <Text className="text-lg font-semibold">{item.name}</Text>
          </View>
        )}
        ListHeaderComponent={
          <CustomHeader
            title="Đang theo dõi"
            showBack={true}
            centerTitle={false}
            headerClassName="bg-background-0 dark:bg-background-0"
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-gray-500">Bạn chưa theo dõi nghệ sĩ nào</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
