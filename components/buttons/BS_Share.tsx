import { MyTrack } from "@/types/zing.types";
import ButtonBottomSheet from "../bottomSheet/ButtonBottomSheet";
import { Share2 } from "lucide-react-native";

interface BS_ShareProps {
  selectedItem: MyTrack | null;
  handleDismissModalPress: () => void;
}

export const BS_Share = ({
  selectedItem,
  handleDismissModalPress,
}: BS_ShareProps) => {
  // Placeholder for share functionality
  const handleSharePress = () => {
    if (selectedItem) {
      // Implement share logic here
      console.log(`Sharing track: ${selectedItem.title}`);
      handleDismissModalPress();
    }
  };

  return (
    <ButtonBottomSheet
      onPress={handleSharePress}
      buttonIcon={Share2}
      buttonText="Chia sẻ"
    />
  );
};
