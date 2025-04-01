import { Text, View } from 'react-native'
import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'

export default function Profile() {
    return (
        <View>
            <Text>👤 Đây là Trang hồ sơ</Text>
            <Button onPress={() => router.push('/library')}>
                <ButtonText>
                    Đi đến Thư viện
                </ButtonText>
            </Button>
        </View>
    )
}