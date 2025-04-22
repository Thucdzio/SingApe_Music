import { Button, ButtonText } from "@/components/ui/button";
import { View, FlatList, ScrollView } from "react-native";
import { Href, useNavigation, useRouter } from "expo-router";
import { VStack, HStack, Text, Input } from "@/components/ui";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { InputField } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrackList } from "@/components/TrackList";
import { screenPadding } from "@/constants/tokens";
import { FloatingPlayer } from "@/components/FloatingPlayer";

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

  const onPressSerach = () => {
    return Text;
  };
  return (
    <SafeAreaView>
      <ScrollView>
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

          <Text className="text-xl font-bold">Gợi ý cho bạn </Text>
          <Text>TOP 100</Text>
          <TrackList scrollEnabled={false}></TrackList>
          <Text>Chill</Text>
          <Text>Chủ đề & Thể loại</Text>
          <Text>Album Hot</Text>
          <Button
            variant="solid"
            onPress={() => {
              console.log("press buttons");
              router.push("/[id]");
            }}
          >
            <ButtonText>Press</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
