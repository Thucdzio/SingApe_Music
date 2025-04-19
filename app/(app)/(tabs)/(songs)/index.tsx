import { Button, ButtonText } from "@/components/ui/button";
import { View, FlatList, ScrollView } from "react-native";
import { Href, useNavigation, useRouter } from "expo-router";
import { VStack, HStack, Text, Input } from "@/components/ui";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrackList } from "@/components/TrackList";
import HomeHeader from "@/components/home/Header";
import SuggestionSection from "@/components/home/SuggestionSection";
export default function Songs() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView>
        <VStack space="lg" className="px-4 py-4">
          {/* Header */}
          <HomeHeader />
          {/* <SuggestionSection
            onPressSong={(song) => {
              console.log("Bài hát được chọn:", song);
            }}
          /> */}

          <Text>TOP 100</Text>
          <Text>Chill</Text>
          <Text>Chủ đề & Thể loại</Text>
          <Text>Album Hot</Text>
          <Text className="text-xl font-bold mt-4">Danh sách bài hát</Text>
          <TrackList scrollEnabled={false} />
          <Button
            variant="solid"
            onPress={() => {
              router.push("/search");
            }}
          >
            <ButtonText>Press</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
