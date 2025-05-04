import { Button, ButtonText } from "@/components/ui/button";
import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { Href, Link, useNavigation, useRouter } from "expo-router";
import {
  VStack,
  HStack,
  Text,
  Input,
  Spinner,
  Image,
  Box,
} from "@/components/ui";
import { useCallback, useEffect, useState, memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrackList } from "@/components/TrackList";
import { getSongs } from "@/services/apiService";
import { Track, useActiveTrack } from "react-native-track-player";
import CustomHeader from "@/components/CustomHeader";
import { Heading } from "@/components/ui/heading";
import { MyTrack, Home, ExtendedTrack } from "@/types/zing.types";
import { fetchHome } from "@/lib/spotify";
import { convertZingToTrack } from "@/helpers/convert";
import { TracksListItem } from "@/components/TrackListItem";
import { playTrack } from "@/services/playbackService";
import { getListeningHistory } from "@/services/fileService";
import { getAllSongs, getSongsByArtistId, Song } from "@/lib/api/songs";
import { getAllArtists, Artist } from "@/lib/api/artists";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function Songs() {
  const [data, setData] = useState<Home>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const haveFloatingPlayer = useActiveTrack();

  const [chillSection, setChillSection] = useState<MyTrack[]>([]);
  const [recentSection, setRecentSection] = useState<Track[]>([]);
  const [top100Section, setTop100Section] = useState<MyTrack[]>([]);
  const [newReleaseSection, setNewReleaseSection] = useState<MyTrack[]>([]);
  const [albumHotSection, setAlbumHotSection] = useState<MyTrack[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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

  const fetchSongs = async () => {
    setIsLoading(true);
    try {
      const myData = await getSongs();
      const tracks = myData.map(
        (song) =>
          ({
            id: song.id,
            title: song.title ?? undefined,
            artist: song.song_artists.map((sa: any) => sa.artists.name).join(", "),
            album: song.albums?.title ?? undefined,
            url: song.url || "",
            genre: song.song_genres.map((sa: any) => sa.genres.name).join(", "),
            artwork: song.cover_url || "",
          } as Track)
      );

      setTracks(tracks);

      const zingData: Home = await fetchHome();
      setData(zingData);

      const chillSection = zingData?.items.find(
        (item) => item.title === "Chill"
      )?.items;
      setChillSection(
        Array.isArray(chillSection) ? await handleData(chillSection) : []
      );

      const newReleaseSection = zingData?.items.find(
        (item) => item.sectionType === "new-release"
      )?.items;
      setNewReleaseSection(
        Array.isArray(newReleaseSection)
          ? await handleData(newReleaseSection)
          : newReleaseSection?.all
          ? await handleData(newReleaseSection.all)
          : []
      );

      const recentSection = getListeningHistory();
      setRecentSection(
        (await recentSection).map((song) => {
          return song.track;
        })
      );

      const top100Section = zingData?.items.find(
        (item) => item.sectionId === "h100"
      )?.items;
      setTop100Section(
        Array.isArray(top100Section) ? await handleData(top100Section) : []
      );

      const albumHotSection = zingData?.items.find(
        (item) => item.sectionId === "hAlbum"
      )?.items;
      setAlbumHotSection(
        Array.isArray(albumHotSection) ? await handleData(albumHotSection) : []
      );
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleData = async (data: ExtendedTrack[]) => {
    const tracks = await Promise.all(
      data.map((song) => {
        return convertZingToTrack(song);
      })
    );
    return tracks;
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSongs().then(() => setRefreshing(false));
  }, []);

  const renderRecentSection = () => {
    return (
      <>
      <HStack className="justify-between items-center pr-4">
        <Heading className={headingStyle}>Gần đây</Heading>
        <Button
          variant="link"
          className="text-sm font-semibold"
          onPress={() => {
            router.push("/recent" as Href);
          }}
        >
          <ButtonText className="text-primary-500">Xem tất cả</ButtonText>
        </Button>
        </HStack>
        <TrackList
          className="px-4 data-[active=true]:no-underline"
          scrollEnabled={false}
          tracks={recentSection.slice(0, 3)}
          onTrackOptionPress={(track) => {
            console.log("Track pressed:", track);
          }}
        />
      </>
    );
  };

  const renderTop100Section = () => {
    return (
      <>
        <Heading className={headingStyle}>Top 100</Heading>
        <Box className="">
            <AlbumList horizontal={true} data={top100Section} />
          </Box>
      </>
    );
  }

  const recommendSection = () => {
    return (
      <>
        <Heading className={headingStyle}>Dựa trên sở thích của bạn</Heading>
          <TrackList
            className="px-4"
            scrollEnabled={false}
            tracks={tracks}
            onTrackOptionPress={(track) => {
              console.log("Track pressed:", track);
            }}
          />
      </>
    );
  }

  const renderChillSection = () => {
    return (
      <>
        <Heading className={headingStyle}>Chill</Heading>
        <Box className="">
          <AlbumList horizontal={true} data={chillSection} />
        </Box>
      </>
    )
  }

  const renderAlbumHotSection = () => {
    return (
      <>
        <Heading className={headingStyle}>Album Hot</Heading>
        <Box className="">
          <AlbumList horizontal={true} data={albumHotSection} />
        </Box>
      </>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CustomHeader
          title="Khám phá"
          showBack={false}
          titleClassName="text-3xl font-bold"
          headerClassName="bg-background-0 px-4"
        />
        <VStack space="lg">
          {renderAlbumHotSection()}
          {recommendSection()}
          {recentSection.length > 3 && renderRecentSection()}
          <Heading className={headingStyle}>Mới phát hành</Heading>
          <Box>
            <ColumnWiseFlatList data={newReleaseSection || []} />
          </Box>
          {top100Section.length > 0 && renderTop100Section()}
          {chillSection.length > 0 && renderChillSection()}
        </VStack>
        <Box className="h-28" />
      </ScrollView>
    </SafeAreaView>
  );
}

interface AlbumListProps {
  horizontal?: boolean;
  data: MyTrack[];
}

const ColumnWiseFlatList = ({ data }: { data: MyTrack[] }) => {
  const screenWidth = useWindowDimensions().width - 32;
  const snapInterval = screenWidth + 14; // 16 is the width of the separator
  const numCols = 3;
  const transformedData = (() => {
    const columns: MyTrack[][] = [];
    for (let i = 0; i < data.length; i += numCols) {
      columns.push(data.slice(i, i + numCols));
    }
    return columns;
  })();
  const Column = memo(({ items }: { items: MyTrack[] }) => (
    <VStack style={{ width: screenWidth }}>
      {items.map((item, i) => (
        <TracksListItem
          key={i}
          track={item}
          onTrackSelect={(track) => {
            console.log("Track pressed:", track);
          }}
        />
      ))}
    </VStack>
  ));
  const _renderitem = ({ item }: any) => <Column items={item} />;
  return (
    <FlatList
      data={transformedData}
      horizontal
      keyExtractor={(_, i) => `col-${i}`}
      renderItem={_renderitem}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => <View className="w-4" />}
      ListFooterComponent={() => <View className="w-4" />}
      ItemSeparatorComponent={() => <View className="w-4" />}
      initialNumToRender={9}
      maxToRenderPerBatch={9}
      windowSize={6}
      snapToAlignment="start"
      snapToInterval={snapInterval}
      disableIntervalMomentum={true}
      className="flex-grow-0"
    />
  );
};

const AlbumList = ({ horizontal, data, ...props }: AlbumListProps) => {
  return (
    <FlatList
      data={data}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View className="w-4" />}
      ListHeaderComponent={<View className="w-4" />}
      ItemSeparatorComponent={() => <View className="w-4" />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AlbumListItem item={item} />}
      {...props}
    />
  );
};

const AlbumListItem = ({ item }: { item: MyTrack }) => {
  return (
    <Link href={`/albums/${item.id}` as Href}>
      <VStack className="w-40">
        <Image
          source={{ uri: item.artwork }}
          alt={item.title}
          className="w-40 h-40 rounded-lg"
        />
        <Text
          className="text-md font-semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text className="text-gray-400">{item.sortDescription}</Text>
      </VStack>
    </Link>
  );
};

const headingStyle = "text-2xl px-4";
const listStyle = "px-4";