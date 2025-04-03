import { Image } from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { FlatList, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Stack } from "expo-router";

import React from "react";

const NotificationsHeader = () => {
  return (
    <Stack.Screen options={{
      headerShown: true,
      headerTitle: "Thông báo",
      headerTitleStyle: {
        fontSize: 20,
      },
      headerBackground: () => (
        <Box className="color-background-500" />
      ),
    }}
    />
  );
}

export default function Notifications() {
  return (
    <>
      {NotificationsHeader()}
      <FlatList
        data={[
          {
            id: 1,
            title: "Notification 1",
            description: "This is a notification",
          },
          {
            id: 2,
            title: "Notification 2",
            description: "This is a notification",
          },
          {
            id: 3,
            title: "Notification 3",
            description: "This is a notification",
          },
          {
            id: 4,
            title: "Notification 4",
            description: "This is a notification",
          },
          {
            id: 5,
            title: "Notification 5",
            description: "This is a notification",
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable className="py-3 bg-transparent" key={item.id}
          onPress={() => {
            console.log("Notification pressed:", item.id);
          }}
          >
            <HStack>
              <Image
                size="md"
                source={{
                  uri: "https://bkacontent.com/wp-content/uploads/2016/06/Depositphotos_31146757_l-2015.jpg",
                }}
              />
              <Card className="bg-transparent w-full h-full px-2 py-1">
                <Heading className="text-lg font-bold">{item.title}</Heading>
                <Text className="text-sm text-gray-500">
                  This is a notification
                </Text>
              </Card>
            </HStack>
          </Pressable>
        )}
        contentContainerStyle={{
          padding: 16,
        }}
      />
    </>
  );
}
