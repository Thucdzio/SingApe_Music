import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { SearchBar } from "@/components/home/SearchBar";
import { router, Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { UserRound } from "lucide-react-native";
import { backgroundColor, fontSize } from "@/constants/tokens";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { HStack, VStack } from "@/components/ui";
import Library from "@/assets/data/library.json";

const header = () => {
  const isDarkMode = useSelector((state: any) => state.isDarkMode);
  return (
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
  );
};
const SearchScreen = () => {
  const handleSelectSong = (song: any) => {
    console.log("Selected song:", song);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {header()}
      <VStack>
        <SearchBar data={Library} onSelect={handleSelectSong} />
      </VStack>
    </View>
  );
};

export default SearchScreen;
