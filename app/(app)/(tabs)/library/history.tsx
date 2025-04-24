import CustomHeader from "@/components/CustomHeader";
import { router, Stack } from "expo-router";
import { UserRound } from "lucide-react-native";
import { Text } from "@/components/ui";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import colors from "tailwindcss/colors";
import { TrackList } from "@/components/TrackList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function History() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://api.example.com/favorites"); // Replace with your API endpoint
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* <AnimatedHeader
        headerTitle="Lịch sử phát nhạc"
        bigTitle="Lịch sử phát nhạc"
        onBackPress={() => router.back()}
      >
        <TrackList scrollEnabled={false}/>
      </AnimatedHeader> */}
      <CustomHeader
        title="Lịch sử phát nhạc"
      />
      
    </>
  );
}
