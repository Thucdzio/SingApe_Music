import { useState } from "react";
import { Modal, Pressable, Button, HStack, Icon, Text } from "@/components/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Share from "react-native-share";
import { colors } from "@/constants/tokens";

interface PlayerShareButtonProps {
  message?: string;
  url?: string;
  iconSize?: number;
}

export const PlayerShareButton = ({
  message,
  url,
  iconSize = 30,
}: PlayerShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onShare = async () => {
    const shareOptions = {
      title: "Chia sẻ bài hát",
      message: message,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <Pressable onPress={() => onShare()}>
        <MaterialCommunityIcons
          name="share"
          size={iconSize}
          color={colors.icon}
        />
      </Pressable>
    </>
  );
};
