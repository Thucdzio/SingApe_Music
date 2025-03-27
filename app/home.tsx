import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View>
      <Text>🏠 Đây là Trang chủ</Text>
      <Button title="Đi đến Thư viện" onPress={() => router.push("/library")} />
      <Button title="Đi đến Hồ sơ" onPress={() => router.push("/profile")} />
    </View>
  );
}
