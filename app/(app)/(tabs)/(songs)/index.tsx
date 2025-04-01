import { Button } from '@/components/ui/button';
import { View, Text } from 'react-native';
import { Href, useRouter } from 'expo-router';

export default function Songs() {
    const router = useRouter();

    return (
        <View>
            <Text>Song List</Text>
            <Text>Song 1</Text>
            <Text>Song 2</Text>
            <Text>Song 3</Text>
            <Text>Song 4</Text>
            <Text>Song 5</Text>
            <Button
                onPress={() => router.push(`/${1}` as Href)}
                className="bg-primary-50 text-black"
                variant="solid"
            >
                Press Me
            </Button>
        </View>
    )
}