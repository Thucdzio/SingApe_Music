import CustomHeader from "@/components/CustomHeader";
import { KeyboardAvoidingComponent } from "@/components/KeyboardAvoiding";
import { Playlist } from "@/components/PlaylistCard";
import { Button, HStack, VStack } from "@/components/ui";
import { Box } from "@/components/ui/box";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VirtualHeader } from "@/components/VirtualHeader";
import { fontSize, textColor } from "@/constants/tokens";
import { Href, router, Stack } from "expo-router";
import {
  ArrowBigDownDash,
  Download,
  Heart,
  History,
  UserRound,
  UsersRound,
} from "lucide-react-native";
import { useLayoutEffect, useState } from "react";
import { ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// const header = () => {
//   const isDarkMode = useSelector((state: any) => state.isDarkMode);
//   return (
//     <Stack.Screen
//       options={{
//         headerShown: false,
//         headerTitle: "Thư viện",
//         headerTitleStyle: {
//           fontSize: fontSize.xl,
//         },
//         headerTintColor: isDarkMode ? textColor.light : textColor.dark,
//         headerTransparent: true,
//         headerSearchBarOptions: {
//           headerIconColor: isDarkMode ? textColor.light : textColor.dark,
//           hideNavigationBar: true,
//           onOpen: () => {
//             router.push("/search");
//           },
//         },
//       }}
//     />
//   );
// };

export default function Library() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFavorite = () => {
    router.push("/library/favorite" as Href);
  }

  const handleDownload = () => {
    router.push("/library/download" as Href);
  }

  const handleHistory = () => {
    router.push("/history" as Href);
  }

  const handleFollow = () => {
    router.push("/library/follow" as Href);
  }

  return (
    <SafeAreaView className="flex-1 bg-background-0">
    <ScrollView>
      <CustomHeader
        title="Thư viện"
        showBack={false}
        centerTitle={false}
        titleClassName="text-3xl font-bold"
        headerClassName="px-4"
      />
      
      <Box className="flex-1 w-full h-full bg-background-0 px-4">
        <VStack className="flex-1 w-max-md gap-2">
          <Heading className="justify-self-start text-2xl font-bold mt-4 mb-2">
            Bài hát
          </Heading>
          <HStack className="w-full items-center justify-center gap-2">
            <Button
              onPress={handleFavorite}
              variant="solid"
              className="rounded-lg justify-start bg-pink-400 dark:bg-pink-400 data-[active=true]:bg-pink-500 w-1/2 h-14"
              size="xl"
            >
              <ButtonIcon as={Heart} className="text-red-600 fill-red-600" />
              <ButtonText className="text-secondary-50">Yêu thích</ButtonText>
            </Button>
            <Button
              onPress={handleFavorite}
              variant="solid"
              className="rounded-lg justify-start bg-yellow-400 dark:bg-yellow-400 data-[active=true]:bg-yellow-500 w-1/2 h-14"
              size="xl"
            >
              <ButtonIcon as={UsersRound} className="text-black fill-black" />
              <ButtonText className="text-secondary-50">Theo dõi</ButtonText>
            </Button>
          </HStack>
          <HStack className="w-full items-center justify-center gap-2">
            <Button
              onPress={handleHistory}
              variant="solid"
              className="rounded-lg justify-start bg-blue-400 dark:bg-blue-400 data-[active=true]:bg-blue-500 w-1/2 h-14"
              size="xl"
            >
              <ButtonIcon as={History} className="text-black " />
              <ButtonText>Lịch sử</ButtonText>
            </Button>
            <Button
              onPress={handleDownload}
              variant="solid"
              className="rounded-lg justify-start bg-green-400 dark:bg-green-400 data-[active=true]:bg-green-500 w-1/2 h-14"
              size="xl"
            >
              <ButtonIcon
                as={ArrowBigDownDash}
                className="text-black fill-black"
              />
              <ButtonText>Tải xuống</ButtonText>
            </Button>
          </HStack>
          <Heading className="justify-self-start text-2xl font-bold mt-4 mb-2">
            Playlist
          </Heading>
          <FlatList
            data={[...Array(10).keys()]}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <Playlist
                title={`Playlist ${item}`}
                createdBy={`Người tạo ${item}`}
                type={`Thể loại ${item}`}
                image={`https://picsum.photos/200/300?random=${item}`}
                onPress={() => router.push({
                  pathname: `/playlist/[id]`,
                  params: {
                    id: item,
                    image: `https://picsum.photos/200/300?random=${item}`,
                    title: `Playlist ${item}`,
                    createdBy: `Người tạo ${item}`,
                  },
                })}
              />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            />
        </VStack>
      </Box>
    </ScrollView>
    </SafeAreaView>
  );
}


