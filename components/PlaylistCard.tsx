import { Box, HStack, VStack } from "./ui";
import { Pressable } from "./ui/pressable";
import { Image } from "./ui/image";
import { Text } from "./ui/text";

export const Playlist = ({ ...props }) => {
  return (
    <Pressable
      onPress={() => {
        props.onPress(props.id);
      }}
    >
      <Box className="h-20">
        <HStack className="w-full h-full items-center justify-start gap-4">
          <Image
            source={{ uri: props.image }}
            alt="Playlist Image"
            className="w-16 h-16 rounded-md"
          />
          <VStack className="w-full h-full items-start justify-start gap-1 pt-2">
            <Text className="text-lg font-semibold">{props.title}</Text>
            <Text className="text-sm text-gray-500">
              {props.type} ✦ {props.createdBy}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
