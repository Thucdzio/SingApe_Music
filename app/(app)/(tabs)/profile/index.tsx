import React from "react";
import { Image } from "@/components/ui/image";
import { Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Stack } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

import { router } from "expo-router";

const ProfileHeader = () => {
  const handleSettingButton = () => {
    router.push("/profile/settings");
  }

  const handleNotificationButton = () => {
    router.push("/profile/notifications");
  }
  
  return (
    <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Cá nhân",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
          headerBackground: () => (
            <View className="color-background-500" />
          ),
          headerRight: () => (
            <HStack className="gap-4 mr-4">
              <Button
                variant="solid"
                className="rounded-full p-2 bg-inherit 
                data-[hover=true]:bg-inherit
                data-[active=true]:bg-inherit brightness-125"
              >
                <AntDesign name="setting" size={26}
                onPress={
                  handleSettingButton
                }
                />
              </Button>
              
              <Button
                className="rounded-full p-2 active:bg-green-400 focus:bg-green-400 bg-white"
              >
                <Feather name="bell" size={26}
                onPress={
                  handleNotificationButton
                }/>
              </Button>
            </HStack>
          ),
        }}
      />
  )
}

export default function Profile() {
  return (
    <View className="color-background-500">
      {ProfileHeader()}
      <VStack>
        <HStack className="p-4 items-center gap-4">
          <Image
            className="rounded-full"
            size="md"
            source={{
              uri: "https://avatars.githubusercontent.com/u/114483495?v=4",
            }}
            alt="avatar"
          />
          <VStack>
            <Text className="text-lg font-bold">Ly Hong Duc</Text>
            <Box className="bg-gray-200 rounded-full px-2 py-1">
              <Text className="text-gray-500">@lyhongduc</Text>
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
}
