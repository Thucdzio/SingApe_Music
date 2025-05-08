import { Heart, LucideIcon } from "lucide-react-native";
import { Button } from "../ui";
import { ButtonIcon, ButtonText } from "../ui/button";

interface ButtonBottomSheetProps {
  onPress: () => void;
  buttonIcon?: LucideIcon;
  buttonText?: string;
}

export default function ButtonBottomSheet(
  {
    onPress,
    buttonIcon = Heart,
    buttonText = "Yêu thích"
  }:
  ButtonBottomSheetProps,
) {
  return (
    <Button
      onPress={onPress}
      className={buttonStyle}
    >
      <ButtonIcon as={buttonIcon} size="xxl" className="text-primary-500" />
      <ButtonText className={buttonTextStyle}>{buttonText}</ButtonText>
    </Button>
  )
}

const buttonStyle =
  "w-full h-10 pl-1 bg-transparent justify-start border-none data-[active=true]:bg-background-100";
const buttonTextStyle =
  "pl-4 text-xl font-medium text-primary-500 data-[active=true]:text-primary-500";
