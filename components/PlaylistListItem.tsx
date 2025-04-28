import { colors } from "@/constants/tokens";
import { Playlist } from "@/helpers/types";
import { AntDesign } from "@expo/vector-icons";

// Gluestack UI
import { Box, Text, Pressable, Image, HStack, VStack } from "@/components/ui";

type PlaylistListItemProps = {
  playlist: Playlist;
  onPress?: () => void;
};

export const PlaylistListItem = ({
  playlist,
  onPress,
}: PlaylistListItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box className="h-20">
        <HStack className="w-full h-full items-center justify-start gap-4">
          <Image
            source={{ uri: playlist.artworkPreview }}
            alt="Playlist Image"
            className="w-16 h-16 rounded-md"
          />
          <VStack className="flex-1 h-full justify-center gap-1">
            <Text className="text-base font-semibold">{playlist.name}</Text>
            <Text className="text-sm text-gray-500">
              Playlist ✦ {playlist.createdBy ?? "Unknown"}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>

    // <Pressable
    //   onPress={onPress}
    //   className="flex-row items-center px-4 py-2 active:opacity-80 border border-black-500"
    // >
    //   <HStack className="flex-1 items-center justify-between">
    //     <HStack className="items-center gap-x-3 ">
    //       <Image
    //         source={{
    //           uri: playlist.artworkPreview,
    //         }}
    //         className="w-[70px] h-[70px] border rounded-[8px]"
    //         alt="art-preview"
    //       />
    //       <Box className="flex-1">
    //         <Text numberOfLines={1} className="text-base font-semibold">
    //           {playlist.name}
    //         </Text>
    //       </Box>
    //     </HStack>

    //     <AntDesign
    //       name="right"
    //       size={16}
    //       color="black"
    //       style={{ opacity: 0.5 }}
    //     />
    //   </HStack>
    // </Pressable>
  );
};
