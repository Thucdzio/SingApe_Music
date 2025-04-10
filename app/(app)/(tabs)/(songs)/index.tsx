import { Button, ButtonText } from "@/components/ui/button";
import { View, FlatList, ScrollView } from "react-native";
import { Href, useNavigation, useRouter } from "expo-router";
import { VStack, HStack, Text, Input } from "@/components/ui";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { InputField } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrackList } from "@/app/components/TrackList";
import { screenPadding } from "@/constants/token";
import FloatingPlayer from "@/app/components/FloatingPlayer";

export default function Songs() {
  const numCols = 3;
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    console.log(text);
  };

  const playlists = [
    { id: 1, title: "Daily Mix 1", image: "https://link_to_image1.jpg" },
    { id: 2, title: "Top 2025", image: "https://link_to_image2.jpg" },
    { id: 3, title: "Lofi Chill", image: "https://link_to_image3.jpg" },
    { id: 4, title: "Lofi Hay ", image: "https://link_to_image4.jpg" },
  ];

  const recommended = [
    {
      id: 1,
      title: "Hãy Trao Cho Anh",
      artist: "Sơn Tùng M-TP",
      image: "https://link_to_image4.jpg",
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://link_to_image5.jpg",
    },
    {
      id: 3,
      title: "What do you mean",
      artist: "Justin Bieber",
      image: "link_to_image5",
    },
    {
      id: 4,
      title: "Hãy Trao Cho Anh",
      artist: "Sơn Tùng M-TP",
      image: "https://link_to_image4.jpg",
    },
    {
      id: 5,
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://link_to_image5.jpg",
    },
    {
      id: 6,
      title: "What do you mean",
      artist: "Justin Bieber",
      image: "link_to_image5",
    },
    {
      id: 7,
      title: "Hãy Trao Cho Anh",
      artist: "Sơn Tùng M-TP",
      image: "https://link_to_image4.jpg",
    },
    {
      id: 8,
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://link_to_image5.jpg",
    },
    {
      id: 9,
      title: "What do you mean",
      artist: "Justin Bieber",
      image: "link_to_image5",
    },
  ];

  const onPressSerach = () => {
    return Text;
  };
  return (
    <SafeAreaView>
      <VStack space="lg" className=" px-4 py-4">
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

        {/* FlatList displaying playlists */}
        <FlatList
          style={{ borderColor: "green", borderWidth: 5 }}
          data={playlists}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 50 }}>
              {/* <Image
                source={{ uri: item.image }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              /> */}
              <Text>{item.title}</Text>
            </View>
          )}
        />
        <Text className="text-xl font-bold">Gợi ý cho bạn </Text>
        <FlatList
          style={{ borderColor: "green", borderWidth: 5 }}
          data={recommended}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numCols}
          key={numCols}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 50 }}>
              {/* <Image
                source={{ uri: item.image }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              /> */}
              <Text>{item.title}</Text>
            </View>
          )}
        />
        <Text>TOP 100</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            paddingHorizontal: screenPadding.horizontal,
          }}
        >
          {/* <TrackList scrollEnabled={false}></TrackList> */}
        </ScrollView>
        <Text>Chill</Text>
        <Text>Chủ đề & Thể loại</Text>
        <Text>Album Hot</Text>
        {/* <Button
          variant="solid"
          onPress={() => {
            console.log("press buttons");
            router.push("/[id]");
          }}
        >
          <ButtonText>Press</ButtonText>
        </Button> */}
      </VStack>
    </SafeAreaView>
  );
}
