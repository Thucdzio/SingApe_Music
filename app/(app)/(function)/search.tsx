import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, LayoutChangeEvent } from "react-native";
import { SearchBar } from "@/components/home/SearchBar";
import { router, Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { ArrowLeft, Search, UserRound, X } from "lucide-react-native";
import { backgroundColor, fontSize } from "@/constants/tokens";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { Button, HStack, Icon, Input, VStack, Image } from "@/components/ui";
import Library from "@/assets/data/library.json";
import TrackPlayer from "react-native-track-player";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { playTrack } from "@/services/playbackService";
import {
  Artist,
  ExtendedTrack,
  MyTrack,
  SearchResult,
} from "@/types/zing.types";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchSearch } from "@/lib/spotify";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { TracksListItem } from "@/components/TrackListItem";
import { Avatar } from "@/components/ui/avatar";
import { star } from "@/constants/text";
import { PlaylistCard } from "@/components/PlaylistCard";
import { convertZingToTrack } from "@/helpers/convert";
import Animated, { FadeIn, FadeOut, LinearTransition, SlideInLeft, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { set } from "ts-pattern/dist/patterns";

type MixedSearchItem = any & {
  type: "song" | "artist" | "playlist" | "album";
};

type FilterType = {label: string; value: string};

export default function SearchScreen() {
  // const isInitialized = useRef(false);
  // useSetupTrackPlayer({
  //   onLoad: () => {
  //     console.log("TrackPlayer setup hoàn tất");
  //     isInitialized.current = true;
  //   },
  // });
  // const handleSelectSong = async (song: any) => {
  //   console.log("Selected song:", song);
  //   if (isInitialized.current) {
  //     await TrackPlayer.reset();
  //   }
  //   TrackPlayer.add(song)
  //     .then(() => {
  //       router.push("/player");
  //       TrackPlayer.play()
  //         .then(() => {
  //           console.log("Playback started");
  //         })
  //         .catch((error) => {
  //           console.error("Error playing track:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error adding track:", error);
  //     });
  // };
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<FilterType>({label: "Tất cả", value: "all"});
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<MixedSearchItem[]>();
  const [filteredData, setFilteredData] = useState<MixedSearchItem[]>();
  const debounceQuery = useDebounce(query, 200);

  const filterOptions: FilterType[] = [
    { label: "Bài hát", value: "song" },
    { label: "Danh sách phát", value: "playlist" },
    { label: "Nghệ sĩ", value: "artist" },
    { label: "Album", value: "album" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        const response: SearchResult = await fetchSearch(query);
        const convertedTracks = await Promise.all(
          response.songs.map(async (item: any) => {
            const track = await convertZingToTrack(item);
            return {
              ...track,
              type: "song",
            };
          })
        );
        const convertedArtists = response.artists.map((item: any) => ({
          ...item,
          type: "artist",
        }));
        const convertedPlaylists = response.playlists.map((item: any) => ({
          ...item,
          type: "playlist",
        }));
        const mixedItems: MixedSearchItem[] = [
          ...convertedArtists,
          ...convertedTracks,
          ...convertedPlaylists,
        ];

        // const mixedItems: MixedSearchItem[] = [
        //   ...response.artists.map((a: any) => ({ ...a, type: "artist" })),
        //   ...response.songs.map((s: any) => ({ ...s, type: "song" })),
        //   ...response.playlists.map((p: any) => ({ ...p, type: "playlist" })),
        // ];
        setData(mixedItems);
        setFilteredData([
          ...convertedArtists.slice(0, 3),
          ...convertedTracks.slice(0, 3),
          ...convertedPlaylists.slice(0, 3),
        ]);
      } else {
        setData(undefined);
      }
    };
    fetchData();
  }, [debounceQuery]);

  useEffect(() => {
    setFilteredData(data?.filter((item: MixedSearchItem) => {
      if (filter.value === "all") {
        return true;
      } else {
        return filter.value === item.type
      }
    }))
  }, [filter, setShowAll]);

  const handleSelectSong = async (song: MyTrack) => {
    console.log("Selected song:", song);
    playTrack(song);
  };

  const renderItem = ({ item }: { item: MixedSearchItem }) => {
    if (item.type === "artist") {
      return renderArtistItem({ item });
    } else if (item.type === "song") {
      return renderTrackItem({ item });
    } else if (item.type === "playlist") {
      return renderPlaylistItem({ item });
    }
    return null;
  };
  const renderTrackItem = ({ item }: { item: MixedSearchItem }) => {
    const newItem = item as unknown as MyTrack;
    return (
      <View className="px-2">
        <TracksListItem
          track={newItem}
          onTrackSelect={() => {
            handleSelectSong(newItem);
          }}
          onRightPress={() => {
            console.log("Long pressed:", item);
          }}
        />
      </View>
    );
  };

  const renderArtistItem = ({ item }: { item: MixedSearchItem }) => {
    const newItem = item as unknown as Artist;
    return (
      <HStack space="lg" className="px-2 items-center">
        <Image
          source={newItem.thumbnailM}
          className="rounded-full"
          size="sm"
          alt={newItem.name || "Unknown"}
        />
        <HStack space="md">
          <VStack space="xs">
            <Text className="text-base font-semibold text-black dark:text-white">
              {newItem.name}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Nghệ sĩ 
            </Text>
            {/* {star} {newItem.totalFollow} người theo dõi */}
          </VStack>
          <Button
            onPress={() => {
              console.log("Theo dõi nghệ sĩ:", newItem.name);
              // Theo dõi nghệ sĩ
            }}
            className="bg-transparent border-none rounded-full data-[active=true]:bg-background-200 w-10 h-10"
          >
            <ButtonText>Theo dõi</ButtonText>
          </Button>
        </HStack>
      </HStack>
    );
  };

  const renderPlaylistItem = ({ item }: { item: MixedSearchItem }) => {
    const newItem = item as unknown as MyTrack;
    return (
      <HStack space="lg" className="px-2 items-center">
        <Image
          source={newItem.thumbnailM}
          className="rounded-sm"
          size="sm"
          alt={newItem.name || "Unknown"}
        />
        <HStack space="md">
          <VStack space="xs" className="w-10/12">
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-base font-semibold text-primary-500">
              {newItem.title}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Danh sách phát
            </Text>
          </VStack>
        </HStack>
      </HStack>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <VStack space="md" className="px-2">
        <HStack space="md" className="items-center drop-shadow-sm">
          <Button
            onPress={() => {
              router.back();
            }}
            className="bg-transparent border-none rounded-full data-[active=true]:bg-background-200 w-12 h-12"
          >
            <ButtonIcon
              as={ArrowLeft}
              size="xxl"
              className="text-primary-500"
            />
          </Button>
          <HStack className="flex-1 items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2 h-12 mr-4">
            <Icon as={Search} className="text-gray-500" size="xl" />
            <Input
              className=" border-0 flex-1 text-base text-black dark:text-white"
              size="lg"
            >
              <InputField
                placeholder={"Tìm bài hát, ca sĩ, album..."}
                onChangeText={(text) => setQuery(text)}
                autoCorrect={false}
                autoFocus={true}
              />
            </Input>
            {query.length > 0 && (
              <Button
                onPress={() => setQuery("")}
                className="bg-transparent border-none rounded-full data-[active=true]:bg-background-200 w-10 h-10"
              >
                <ButtonIcon as={X} size="xl" className="text-gray-500" />
              </Button>
            )}
          </HStack>
        </HStack>
        <ListHeaderComponent
          selected={filter}
          onSelect={setFilter}
          filterOptions={filterOptions}
          isVisible={showAll}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.encodeId}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          ItemSeparatorComponent={() => (
            <View className="h-3 bg-transparent" />
          )}
          ListFooterComponent={() => (
            <>
              {!showAll && filteredData && (
                <Button
                  variant="link"
                  action="positive"
                  onPress={() => setShowAll(true)}
                >
                  <ButtonText>Xem tất cả các kết quả</ButtonText>
                </Button>
              )}
              <View className="h-10 bg-transparent" />
            </>
          )}
          renderItem={renderItem}
        />
      </VStack>
    </SafeAreaView>
  );
};








interface ListHeaderComponentProps {
  isVisible?: boolean;
  selected: FilterType;
  filterOptions: FilterType[];
  onSelect: (value: FilterType) => void;
}

const ListHeaderComponent = ({
  selected,
  onSelect,
  filterOptions,
  isVisible,
}: ListHeaderComponentProps) => {
  const displayedOptions = useMemo(() => {
    if (selected.value === "all") return filterOptions;
    const filtered = filterOptions.filter((item) => item.value === selected.value);
    return [{ label: "button", value: "x" }, ...filtered];
  }, [selected, filterOptions]);

  if (!isVisible) {
    return null;
  }

  const handleOnSelect = (value: FilterType) => {
    if (selected?.value === value.value) {
      return onSelect({
        label: "Tất cả",
        value: "all"
      });
    }
    onSelect(value);
  }

  return (
    <Animated.FlatList
      data={displayedOptions}
      keyExtractor={(item) => item.value.toString()}
      horizontal
      className="h-12"
      showsHorizontalScrollIndicator={false}
      itemLayoutAnimation={LinearTransition}
      removeClippedSubviews={false}
      ItemSeparatorComponent={() => <View className="w-2" />}
      renderItem={({ item }) => {
        const isActive = selected.value === item.value;
        if (item.value === "x") {
          return (
           <Button
            variant="solid"
            action="secondary"
            className={`rounded-full w-10 h-10`}
            size="sm"
            onPress={() => handleOnSelect(selected)}
          >
            <ButtonIcon as={X} className="text-base" />
          </Button>
          );
        }
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Button
              variant="solid"
              action="secondary"
              className={`rounded-full w-fit h-10 ${isActive && "bg-green-500"}`}
              onPress={() => handleOnSelect(item)}
            >
              <ButtonText className={`text-base font-medium ${isActive && "text-white" }`}>
                {item.label}
              </ButtonText>
            </Button>
            </Animated.View>
        )}
      }
    />
  );
};








interface Props {
  isVisible?: boolean;
  selected: FilterType;
  filterOptions: FilterType[];
  onSelect: (value: FilterType) => void;
}

export function FilterTabs({
  selected,
  onSelect,
  filterOptions,
  isVisible,
}: Props) {
  const xOffset = useSharedValue(0);
  const positions = useRef<Record<FilterType["value"], number>>({} as any);

  const handleLayout = (filter: FilterType, e: LayoutChangeEvent) => {
    positions.current[filter.value] = e.nativeEvent.layout.x;
  };

  if (!isVisible) {
    return null;
  }
  const handleOnSelect = (value: FilterType) => {
    const x = positions.current[value.value];
    if (typeof x === "number") {
      xOffset.value = withTiming(-x, { duration: 300 });
    }
    if (selected?.value === value.value) {
      return onSelect({
        label: "Tất cả",
        value: "all"
      });
    }
    onSelect(value);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xOffset.value }],
  }));
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="mt-2"
    >
      {"all" !== selected.value && (
        <Animated.View
          entering={SlideInLeft}
          exiting={FadeOut}
          className="mr-2"
        >
        <Button
            variant="solid"
            action="secondary"
            className={`rounded-full w-10 h-10`}
            size="sm"
            onPress={() => handleOnSelect(selected)}
          >
            <ButtonIcon as={X} className="text-base" />
          </Button>
        </Animated.View>
      )}
      {filterOptions.map((filter) => {
        const isActive = selected.value === filter.value;
        if (selected.value !== "all" && !isActive) {
          return null;
        }
        return (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            onLayout={(e) => handleLayout(filter, e)}
            style={
              animatedStyle
            }
            className="mr-2"
          >
            <Button
              key={filter.value}
              variant="solid"
              action="secondary"
              className={`rounded-full w-fit h-10 ${isActive && "bg-green-500"}`}
              onPress={() => handleOnSelect(filter)}
            >
              <ButtonText className={`text-base font-medium ${isActive && "text-white" }`}>
                {filter.label}
              </ButtonText>
            </Button>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}