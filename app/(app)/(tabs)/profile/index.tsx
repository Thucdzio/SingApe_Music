
import { FlatList, SafeAreaView, View } from "react-native";
import { Href, router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, HStack, Text, VStack, Image, Button } from "@/components/ui";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { fontSize, iconSize } from "@/constants/token";
import { ButtonText } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Heading } from "@/components/ui/heading";

const header = () => {
  const isDarkMode = useSelector((state: any) => state.isDarkMode);

  const handleNotification = () => {
    router.push("/profile/notifications" as Href);
  }

  return (
    <Stack.Screen
      options={{
        headerTitle: "Cá nhân",
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: fontSize.xl,
        },
        headerRight: () => (
          <HStack className="flex-row items-center space-x-2 pr-4">
            <Button
              onPress={handleNotification}
              variant="solid"
              className="p-2 bg-transparent border-none rounded-full data-[active=true]:bg-background-200"
            >
              <Feather name="bell" size={26} className="color-primary-500" />
            </Button>
          </HStack> 
        ),
        headerTintColor: isDarkMode ? "#fff" : "#000",
      }}
    />
  )
}

const listFunction = [
  {
    id: 1,
    title: "Danh sách phát",
    icon: <MaterialCommunityIcons name="playlist-music" size={iconSize.lg} className="color-primary-500" />,
    onPress: () => {
      router.push("/profile/playlist" as Href);
    },
  },
  {
    id: 2,
    title: "Chỉnh sửa thông tin",
    icon: <Feather name="edit" size={iconSize.base} className="color-primary-500" />,
    onPress: () => {
      router.push("/profile/edit-profile" as Href);
    },
  },
  {
    id: 3,
    title: "Cài đặt",
    icon: <Feather name="settings" size={iconSize.base} className="color-primary-500" />,
    onPress: () => {
      router.push("/profile/settings" as Href);
    },
  },
  {
    id: 4,
    title: "Đăng xuất",
    icon: <MaterialCommunityIcons name="logout" size={iconSize.base} className="color-primary-500" />,
    onPress: () => {
      const { signOut } = useAuth();
      signOut();
      router.replace("/(auth)" as Href);
    },
  },
];

export default function Profile() { 
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {header()}
      <HStack className="p-4 pt-16">
        <Avatar size="xl" className="border">
          <AvatarFallbackText>Lucas</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-2.jpg",
            }}
          />
        </Avatar>
        <VStack className="pl-4 gap-1">
          <Text className="text-2xl font-bold pt-2">Lucas Dzio</Text>
          <HStack className="w-fit justify-center items-center gap-2 bg-gradient-to-r from-info-100 to-info-50 text-info-800 px-2 py-1 rounded-2xl shadow-md border border-info-200">
            <FontAwesome5 name="crown" size={iconSize.xs} className="color-orange-500" />
            <Text className="text-xl">
              Premium
            </Text>
          </HStack>
        </VStack>
      </HStack>

      {/* <VStack className="pl-5">
        <HStack>
          <FontAwesome5 name="map-marker-alt" size={16} color="black" />{" "}
          <Text className="pl-10">144 Xuân Thủy Cầu Giấy Hà Nội Việt Nam</Text>
        </HStack>
        <HStack>
          <Feather name="phone" size={16} color="black" />
          <Text className="pl-10">+0123456789</Text>
        </HStack>
        <HStack>
          <Fontisto name="email" size={16} color="black" />{" "}
          <Text className="pl-10">lucasdzio@gmail.com</Text>
        </HStack>
      </VStack> */}
      {/* <VStack>
        <Text className="text-4xl font-bold pl-5 pt-10">Preferences</Text>
        <Text className="text-2xl font-bold pl-5 text-red-500 ">Sharing</Text>
        <HStack className="w-full justify-between space-x-4 p-5">
          <Entypo name="facebook" size={100} color="black" />
          <Entypo name="instagram" size={100} color="black" />
          <AntDesign name="youtube" size={100} color="black" />
          <AntDesign name="twitter" size={100} color="black" />
          <FontAwesome5 name="tiktok" size={100} color="black" />
        </HStack>
      </VStack> */}
      <FlatList
        data={listFunction}
        className="p-4"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            key={item.id}
            onPress={item.onPress}
            variant="solid"
            action="secondary"
            className="w-full bg-transparent justify-start mb-2 data-[active=true]:bg-background-200"
          >
            {item.icon}
            <ButtonText>
              {item.title}
            </ButtonText>
          </Button>
        )}
      />

    </SafeAreaView>
  );
}
