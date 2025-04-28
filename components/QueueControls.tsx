import { HStack, Button, Icon } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import TrackPlayer, { Track } from "react-native-track-player";
import { Pressable, ViewProps } from "react-native";
import { ButtonText } from "./ui/button";
import { Download, Plus } from "lucide-react-native";
type QueueControlsProps = {
  tracks: Track[];
} & ViewProps;

export const QueueControls = ({
  tracks,
  style,
  ...viewProps
}: QueueControlsProps) => {
  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
  };

  const handleShufflePlay = async () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
    await TrackPlayer.setQueue(shuffledTracks);
    await TrackPlayer.play();
  };

  const handleDownload = async () => {
    console.log("Downloading");
  };
  const handleAddSong = async () => {
    console.log("Adding");
  };
  return (
    <HStack
      className="w-full items-center justify-center"
      style={style}
      {...viewProps}
    >
      {/* Nút download bên trái */}
      <Pressable
        onPress={handleDownload}
        className="px-3 py-2 rounded-full bg-muted-foreground/10"
      >
        <Download size={24} color="#666" />
      </Pressable>
      <Button
        variant="outline"
        className="flex-1 items-center justify-center bg-muted-foreground/10 rounded-2xl "
        onPress={handleShufflePlay}
      >
        <ButtonText className="text-primary font-semibold text-xl">
          Shuffle
        </ButtonText>
      </Button>
      <Pressable
        onPress={handleAddSong}
        className="p-3 py-2 rounded-full bg-muted-foreground/10"
      >
        <Plus size={24} color="#666" />
      </Pressable>
    </HStack>
  );
};

{
  /* <Button
        variant="outline"
        className="flex-1 flex-row items-center justify-center bg-muted-foreground/10 rounded-lg px-4 py-3"
        onPress={handlePlay}
      >
        <Icon as={Ionicons} size="md" className="text-primary mr-2" />
        <ButtonText className="text-primary font-semibold text-lg">
          Play
        </ButtonText>
      </Button> */
}

{
  /* Shuffle Button */
}
