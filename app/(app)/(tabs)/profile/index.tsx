
import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, HStack, Text, VStack, Image } from "@/components/ui";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Profile() {
  const { signIn } = useAuth();
  return (
    <SafeAreaView>
      <HStack className="p-5">
        <Avatar size="2xl" className="border">
          <AvatarFallbackText>Lucas</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-2.jpg",
            }}
          />
          <AvatarBadge />
        </Avatar>
        <VStack>
          <Text className=" text-2xl font-bold pl-10 pt-4">Lucas Dzio</Text>
          <Text className="pl-10 pt-2 ">@Lucasdzio</Text>
        </VStack>
      </HStack>

      <VStack className="pl-5">
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
      </VStack>
      <VStack>
        <Text className="text-4xl font-bold pl-5 pt-10">Preferences</Text>
        <Text className="text-2xl font-bold pl-5 text-red-500 ">Sharing</Text>
        <HStack className="w-full justify-between space-x-4 p-5">
          <Entypo name="facebook" size={100} color="black" />
          <Entypo name="instagram" size={100} color="black" />
          <AntDesign name="youtube" size={100} color="black" />
          <AntDesign name="twitter" size={100} color="black" />
          <FontAwesome5 name="tiktok" size={100} color="black" />
        </HStack>
      </VStack>
      <VStack className="p-5 space-y-4 ">
        <HStack className="items-center justify-between p-4 bg-gray-200 rounded-lg ">
          <Text className="text-lg font-semibold">Playlist</Text>
          <MaterialCommunityIcons
            name="playlist-music"
            size={32}
            color="black"
          />
        </HStack>
        <HStack className="items-center justify-between p-4 bg-gray-200 rounded-lg">
          <Text className="text-lg font-semibold">Edit Profile</Text>
          <Feather name="edit" size={32} color="black" />
        </HStack>
        <HStack className="items-center justify-between p-4 bg-gray-200 rounded-lg">
          <Text className="text-lg font-semibold">Setting</Text>
          <Feather
            name="settings"
            size={24}
            color={"black"}
            onPress={() => router.push("/settings")}
          />
        </HStack>
        <HStack className="items-center justify-between p-4 bg-gray-200 rounded-lg">
          <Text className="text-lg font-semibold">LogOut</Text>
          <MaterialCommunityIcons
            name="logout"
            size={32}
            color="black"
            onPress={() => {
              router.push("/register");
            }}
          />
        </HStack>
      </VStack>
    </SafeAreaView>

  );
}
