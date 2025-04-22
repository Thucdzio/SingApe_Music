import { useNavigation } from 'expo-router';
import { Pressable, View, Text, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import clsx from 'clsx';
import { Icon } from './ui/icon';
import { Button } from './ui';
import { ButtonIcon } from './ui/button';

type Props = {
  title?: string;
  showBack?: boolean;
  centerTitle?: boolean;
  right?: React.ReactNode;
  titleClassName?: string;
  backgroundClassName?: string;
  style?: ViewStyle;
};

export default function CustomHeader({
  title,
  showBack = false,
  centerTitle = false,
  right,
  titleClassName = 'text-lg font-semibold text-black dark:text-white',
  backgroundClassName = 'bg-background-0 dark:bg-background-0',
  style,
}: Props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      className={"flex-row items-center px-4 gap-4" + backgroundClassName}
      style={[
        {
          paddingTop: insets.top,
          height: insets.top + 56,
        },
        style,
      ]}
    >
        {showBack ? (
            <View className="w-16">
          <Button
            onPress={() => navigation.goBack()}
            className="bg-transparent border-none rounded-full data-[active=true]:bg-background-200 w-10"
          >
            <ButtonIcon as={ArrowLeft} size="xxl" className="text-primary-50" />
          </Button>
          </View>
        ): null}

      {/* Title */}
      <View className={clsx('flex-1', centerTitle && 'items-center')}>
        {!!title && <Text className={clsx(titleClassName)}>{title}</Text>}
      </View>

      {/* Right */}
      <View className="w-10 items-end justify-center">{right}</View>
    </View>
  );
}
