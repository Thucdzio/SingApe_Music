import { Button, ButtonText } from "@/components/ui/button";
import { View, FlatList, ScrollView } from "react-native";
import { Href, useNavigation, useRouter } from "expo-router";
import { VStack, HStack, Text, Input } from "@/components/ui";
import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { InputField } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrackList } from "@/components/TrackList";
import { screenPadding } from "@/constants/tokens";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { getAllSongs, getSongsByArtistId, Song } from "@/lib/api/songs";
import { getAllArtists, Artist } from "@/lib/api/artists";
import { Track } from "react-native-track-player";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function Songs() {
  const numCols = 3;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Data states
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  // Load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Function to load data from Supabase
  const loadData = async () => {
    try {
      setLoading(true);

      // Fetch songs
      const songsData = await getAllSongs();
      if (songsData) {
        setSongs(songsData);
        console.log(`Loaded ${songsData.length} songs`);
      }

      // Fetch artists
      const artistsData = await getAllArtists();
      if (artistsData) {
        setArtists(artistsData);
        console.log(`Loaded ${artistsData.length} artists`);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    console.log(text);
  };

  // Convert Song objects to Track objects for TrackList
  const songsToTracks = (songs: Song[]): Track[] => {
    if (!songs || songs.length === 0) return [];

    return songs.map((song) => {
      const fallbackUrl =
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

      return {
        id: song.id,
        title: song.title || "Unknown Title",
        artist: "Various Artists",
        url: song.url || fallbackUrl,
        artwork: song.cover_url || "https://via.placeholder.com/400",
        duration: 0,
      };
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack space="lg" className="px-4 py-4">
          {/* Header with Mic and Search Icon */}
          <HStack className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold">Khám phá</Text>
            <HStack className="flex-row space-x-2">
              <Feather name="mic" size={24} color="black" />
              <Feather
                name="search"
                size={24}
                color="black"
                onPress={() => {
                  console.log("hello");
                  setIsSearchVisible(!isSearchVisible);
                }}
              />
            </HStack>
          </HStack>

          {isSearchVisible && (
            <Input variant="rounded" size="md">
              <InputField
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search on here..."
              />
            </Input>
          )}

          {loading ? (
            <LoadingOverlay />
          ) : (
            <>
              <Text className="text-xl font-bold">Gợi ý cho bạn</Text>
              {songs.length > 0 ? (
                <TrackList
                  scrollEnabled={false}
                  tracks={songsToTracks(songs.slice(0, 5))}
                />
              ) : (
                <TrackList scrollEnabled={false} />
              )}

              <Text className="text-xl font-bold mt-4">TOP 100</Text>
              {songs.length > 0 ? (
                <TrackList
                  scrollEnabled={false}
                  tracks={songsToTracks(songs.slice(0, 3))}
                />
              ) : (
                <TrackList scrollEnabled={false} />
              )}

              <Text className="text-xl font-bold mt-4">Chill</Text>
              {songs.length > 0 ? (
                <TrackList
                  scrollEnabled={false}
                  tracks={songsToTracks(songs.slice(0, 2))}
                />
              ) : (
                <TrackList scrollEnabled={false} />
              )}

              <Text className="text-xl font-bold mt-4">Chủ đề & Thể loại</Text>
              {artists.length > 0 && (
                <HStack className="flex-wrap justify-between mt-2">
                  {artists.slice(0, 4).map((artist) => (
                    <Button
                      key={artist.id}
                      variant="outline"
                      className="w-[48%] mb-2"
                      onPress={() => router.push(`/artists/${artist.id}` as Href)}
                    >
                      <ButtonText>{artist.name}</ButtonText>
                    </Button>
                  ))}
                </HStack>
              )}

              <Text className="text-xl font-bold mt-4">Album Hot</Text>

              <Button
                className="mt-4"
                variant="solid"
                onPress={() => {
                  console.log("press buttons");
                  router.push("/artists" as Href);
                }}
              >
                <ButtonText>Xem tất cả nghệ sĩ</ButtonText>
              </Button>
            </>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
