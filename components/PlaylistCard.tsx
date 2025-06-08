import { Box, Button, HStack, Icon, VStack } from "./ui";
import { Pressable } from "./ui/pressable";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { MyTrack } from "@/types/zing.types";
import { Link, router } from "expo-router";
import { unknownTrackImageSource } from "@/constants/image";
import { ButtonIcon } from "./ui/button";
import { EllipsisVertical } from "lucide-react-native";
import { useWindowDimensions } from "react-native";
import { star } from "@/constants/text";
import { MergeImage } from "./MergeImage";

export const PlaylistCard = ({
  item,
  tracks,
  type,
  onOptionPress,
}: {
  item: MyTrack;
  tracks?: MyTrack[];
  type: string;
  onOptionPress: () => void;
}) => {

  const renderImage = () => {
    if (!item.artwork) {
      console.log("No artwork available for item:", item);
      const image1 = tracks && tracks.length > 0 ? tracks?.[0]?.artwork : null;
      return (
        <MergeImage
          image1={image1 || null}
          image2={tracks?.[1] && tracks?.[1].artwork || unknownTrackImageSource}
          image3={tracks?.[2] && tracks?.[2].artwork || unknownTrackImageSource}
          image4={tracks?.[3] && tracks?.[3].artwork || unknownTrackImageSource}
          size="sm"
        />
      );
    }

    return (
      <Image
        source={item.artwork || unknownTrackImageSource}
        alt="Playlist Image"
        className="w-16 h-16 rounded-md"
      />
    );
  };

  return (
    <HStack space="md" className="w-full items-center">
      {renderImage()}
      <HStack className="flex-1 w-full h-full bg-transparent items-center justify-between">
        <VStack className="flex-1 w-full gap-1">
          <Text className="text-lg font-semibold">{item.title}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {type} {star} {item.createdBy}
          </Text>
        </VStack>
        {/* <Pressable className="rounded-full w-10 h-10 items-center justify-center"
        onPress={onOptionPress}
      >
        <Icon as={EllipsisVertical} className="text-black fill-black" />
      </Pressable> */}
      </HStack>
    </HStack>
    // </Pressable>
  );
};
