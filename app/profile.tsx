import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View>
      <Text>👤 Đây là Trang hồ sơ</Text>
      <Button title="Quay lại Trang chủ" onPress={() => router.push("/home")} />
    </View>
  );
}
