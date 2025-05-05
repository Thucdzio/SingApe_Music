import { Button, ButtonText } from "@/components/ui/button";
import { View, FlatList, ScrollView } from "react-native";
import { Href, useNavigation, useRouter } from "expo-router";
import { VStack, HStack, Text, Input } from "@/components/ui";

import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/home/Header";

import { Top100 } from "@/components/home/Top100";
import SuggestionSection from "@/components/home/SuggestionSection";
import PlaylistsScreen from "../library/playlist";
import CategoryGenre from "@/components/home/Categories";
import HotAlbum from "@/components/home/HotAlbums";
import Chill from "@/components/home/Chill";

export default function Songs() {
  const router = useRouter();

  return (
    <SafeAreaView className="pd-16">
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <VStack space="lg" className="px-4 py-4 pd-16">
          {/* Header */}
          <HomeHeader />

          <SuggestionSection />

          <Top100 scrollEnabled={false} id="top100"></Top100>
          <Chill></Chill>
          <CategoryGenre />
          <HotAlbum />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
