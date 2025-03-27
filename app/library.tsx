import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Library() {
  const router = useRouter();

  return (
    <View>
      <Text>📚 Đây là Trang thư viện</Text>
      <Button title="Quay lại Trang chủ" onPress={() => router.push("/home")} />
    </View>
  );
}
