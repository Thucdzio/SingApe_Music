import store from '@/store/store';
import { Href, router, Stack } from 'expo-router';
import { setTheme, toggleTheme } from '@/store/slices';
import { VStack, Button, Text, HStack } from '@/components/ui';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColor, fontSize, iconSize } from '@/constants/token';;
import { Pressable, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { useSelector } from 'react-redux';

const header = () => {
    const isDarkMode = useSelector((state: any) => state.isDarkMode);
    return (
        <Stack.Screen
            options={{
                headerTitle: "Cài đặt",
                headerTitleStyle: {
                    fontSize: fontSize.base,
                },
                headerTintColor: isDarkMode ? backgroundColor.dark : backgroundColor.light,
                headerStyle: {
                    backgroundColor: isDarkMode ? backgroundColor.headerLight : backgroundColor.headerDark,
                },
                headerShadowVisible: false,
            }}
        />
    )
}

const listFunction = [
    {
        id: 1,
        title: "Chủ đề",
        describe: "Chọn chủ đề cho ứng dụng",
        icon: <MaterialCommunityIcons name="theme-light-dark" size={iconSize.lg} className="color-primary-500" />,
        onPress: () => {
            store.dispatch(toggleTheme());
        },
    },
    {
        id: 2,
        title: "Thông báo",
        describe: "Thông báo đẩy, email",
        icon: <Fontisto name="bell" size={iconSize.lg} className="color-primary-500" />,
        onPress: () => {
            router.push("profile/settings/noti-setting" as Href);
        },
    },
    {
        id: 3,
        title: "Phát lại",
        describe: "Phát liên tục, chế độ phát, tự động phát",
        icon: <MaterialCommunityIcons name="play" size={iconSize.lg} className="color-primary-500" />,
        onPress: () => {
            router.push("profile/settings/play-setting" as Href);
        },
    },
    {
        id: 4,
        title: "Giới thiệu",
        describe: "Giới thiệu về ứng dụng",
        icon: <MaterialCommunityIcons name="information-outline" size={iconSize.lg} className="color-primary-500" />,
        onPress: () => {
            router.push("/profile/settings/introduce" as Href);
        },
    },
];

export default function Settings() {
    const handleThemeChange = (theme: string) => {
        store.dispatch(setTheme({
            isDarkMode: theme === 'dark',
            isSystemTheme: theme === 'system',
        }));
    }
    return (
        <View className="flex-1 bg-background-50">
            <VStack className="flex-1 justify-start items-center w-full max-w-md bg-transparent p-4 space-y-4">
                {header()}
                {listFunction.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={item.onPress}
                        className='w-full'
                    >
                        <Card
                            key={item.id}
                            className="w-full h-16 flex-row items-center justify-between px-4"
                        >
                            <HStack className="flex-row items-center space-x-2">
                                {item.icon}
                                <VStack className="flex-1">
                                    <Text className="text-base font-semibold">{item.title}</Text>
                                    <Text className="text-sm text-gray-500">{item.describe}</Text>
                                </VStack>
                            </HStack>
                            <MaterialCommunityIcons name="chevron-right" size={iconSize.base} className="color-primary-500" />
                        </Card>
                    </Pressable>
                ))}
            </VStack>
        </View>
    )
}