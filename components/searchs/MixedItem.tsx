import { Artist, MyTrack } from "@/types/zing.types";
import { FlatListProps, View } from "react-native";
import { Button, HStack, Image, VStack, Text } from "../ui";
import { ButtonIcon, ButtonText } from "../ui/button";
import { X } from "lucide-react-native";
import { TracksListItem } from "../TrackListItem";
import { useState } from "react";

export type MixedSearchItem = any & {
  type: "song" | "artist" | "playlist" | "album";
};

interface MixedItemProps extends Partial<FlatListProps<MixedSearchItem>> {
  item: MixedSearchItem;
  isRecent: boolean;
  onRemoveRecent?: (item: MixedSearchItem) => void;
  onSelectSong: (item: MyTrack) => void;
  onSelectArtist: (item: MixedSearchItem) => void;
  onSelectPlaylist: (item: MixedSearchItem) => void;
}

export const MixedItem = ({
  item,
  isRecent,
  onRemoveRecent,
  onSelectSong,
  onSelectArtist,
  onSelectPlaylist,
}: MixedItemProps
) => {
  const [followed, setFollowed] = useState(false);
  const handleFollowArtist = () => {
    setFollowed(!followed);
    console.log("Follow artist:", item);
  }



  const renderItem = () => {
    if (item.type === "artist") {
      return renderArtistItem();
    } else if (item.type === "song") {
      return renderTrackItem();
    } else if (item.type === "playlist") {
      return renderPlaylistItem();
    }
    return null;
  };

  const removeRecentButton = (item: MixedSearchItem) => {
    return (
      <Button
        onPress={() => {
          onRemoveRecent?.(item);
          console.log("Remove recent:", item);
        }}
        className="bg-transparent border-none rounded-full data-[active=true]:bg-background-200 w-10 h-10"
      >
        <ButtonIcon as={X} size="xxl" className="text-gray-500" />
      </Button>
    )
  }

  const renderTrackItem = () => {
    const newItem = item as unknown as MyTrack;
    return (
      <View className="px-2">
        {isRecent ? (
          <TracksListItem
            track={newItem}
            showOptionButton={false}
            onTrackSelect={() => {
              onSelectSong(newItem);
            }}
          >
            {removeRecentButton(item)}
          </TracksListItem>
        ) : (
          <TracksListItem
            track={newItem}
            onTrackSelect={() => {
              onSelectSong(newItem);
            }}
            onRightPress={() => {
              console.log("Long pressed:", item);
            }}
          />
        )}
      </View>
    );
  };

  const renderArtistItem = () => {
    const newItem = item as unknown as Artist;
    return (
      <HStack space="lg" className="px-2 items-center">
        <Image
          source={newItem.thumbnailM}
          className="rounded-full"
          size="sm"
          alt={newItem.name || "Unknown"}
        />
        <HStack space="md" className="flex-1 justify-between items-center">
          <VStack space="xs">
            <Text className="text-base font-semibold text-black dark:text-white">
              {newItem.name}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Nghệ sĩ
            </Text>
            {/* {star} {newItem.totalFollow} người theo dõi */}
          </VStack>

          {isRecent ? (
            removeRecentButton(newItem)
          ) : (
            <Button
              variant="outline"
              action="primary"
              onPress={() => {
                handleFollowArtist();
                console.log("Select artist:", newItem);
              }}
              className={`w-fit h-10 rounded-full ${
                followed ? "border-primary-500" : "border-gray-500"}`}
            >
              <ButtonText>{followed ? "Đang theo dõi" : "Theo dõi"}</ButtonText>
            </Button>
          )}
        </HStack>
      </HStack>
    );
  };

  const renderPlaylistItem = () => {
    const newItem = item as unknown as MyTrack;
    return (
      <HStack space="lg" className="px-2 items-center">
        <Image
          source={newItem.thumbnailM}
          className="rounded-sm"
          size="sm"
          alt={newItem.name || "Unknown"}
        />
        <HStack space="md">
          <VStack space="xs" className="w-10/12">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-base font-semibold text-primary-500"
            >
              {newItem.title}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Danh sách phát
            </Text>
          </VStack>

          {isRecent && removeRecentButton(newItem)}
        </HStack>
      </HStack>
    );
  };

  return (
    renderItem()
  );
};
