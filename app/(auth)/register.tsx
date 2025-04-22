// app/(auth)/register.tsx - File đăng ký
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link, router } from "expo-router";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui";
import { useState } from "react";
import { Divider } from "@/components/ui/divider";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@/app/lib/supabase";

const header = () => {
  const isDarkMode = useSelector((state: any) => state.isDarkMode);
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Đăng ký",
        headerTransparent: true,
        headerTintColor: isDarkMode ? "#fafafa" : "#000",
      }}
    />
  );
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sử dụng useState thay vì useRef
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validationError, setValidationError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!displayName) {
      newErrors.displayName = "Tên hiển thị không được để trống";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
      isValid = false;
    }

    setValidationError(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      setError(null);

      // 1. Tạo người dùng với Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // 2. Nếu thành công và có người dùng, thêm dữ liệu hồ sơ
      if (data.user) {
        // Tạo bản ghi hồ sơ với display_name
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            display_name: displayName,
            email: data.user.email,
            updated_at: new Date().toISOString(),
          },
        ]);

        if (profileError) throw profileError;

        Alert.alert(
          "Đăng ký thành công",
          "Vui lòng kiểm tra email của bạn để xác nhận tài khoản.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/login"),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      setError(error.message || "Đã xảy ra lỗi khi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing up with Google:", error);
      setError(error.message || "Đã xảy ra lỗi khi đăng ký với Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View className="flex-1 items-center h-full bg-background-0">
        {header()}

        <VStack className="flex-1 justify-center items-center w-full max-w-md bg-transparent p-4">
          <VStack space="md" className="bg-none w-full">
            <FormControl
              isRequired={true}
              isInvalid={!!validationError.displayName}
            >
              <FormControlLabel>
                <FormControlLabelText>Tên hiển thị</FormControlLabelText>
              </FormControlLabel>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tên hiển thị của bạn"
                  value={displayName}
                  onChangeText={setDisplayName}
                />
              </View>
              {validationError.displayName ? (
                <FormControlError>
                  <FormControlErrorText>
                    {validationError.displayName}
                  </FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>
            <FormControl isRequired={true} isInvalid={!!validationError.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
              {validationError.email ? (
                <FormControlError>
                  <FormControlErrorText>
                    {validationError.email}
                  </FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>
            <FormControl
              isRequired={true}
              isInvalid={!!validationError.password}
            >
              <FormControlLabel>
                <FormControlLabelText>Mật khẩu</FormControlLabelText>
              </FormControlLabel>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>
              {validationError.password ? (
                <FormControlError>
                  <FormControlErrorText>
                    {validationError.password}
                  </FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>
            <FormControl
              isRequired={true}
              isInvalid={!!validationError.confirmPassword || !!error}
            >
              <FormControlLabel>
                <FormControlLabelText>Nhập lại mật khẩu</FormControlLabelText>
              </FormControlLabel>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                />
              </View>
              {validationError.confirmPassword ? (
                <FormControlError>
                  <FormControlErrorText>
                    {validationError.confirmPassword}
                  </FormControlErrorText>
                </FormControlError>
              ) : error ? (
                <FormControlError>
                  <FormControlErrorText>
                    {error || "Đã xảy ra lỗi khi đăng ký"}
                  </FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>
            <Button
              onPress={handleRegister}
              variant="solid"
              className="mt-4"
              isDisabled={loading}
            >
              <ButtonText>{loading ? "Đang đăng ký..." : "Đăng ký"}</ButtonText>
            </Button>
          </VStack>
          <HStack className="w-full justify-between items-center mt-2">
            <Divider className="w-1/3" />
            <Text className="text-primary-100">Hoặc</Text>
            <Divider className="w-1/3" />
          </HStack>
          <Button
            onPress={handleGoogleSignUp}
            variant="outline"
            className="mt-2 w-full data-[active=true]:bg-background-300"
            isDisabled={loading}
          >
            <ButtonText>Đăng ký với Google</ButtonText>
            <AntDesign name="google" size={24} color="#6E6BFF" />
          </Button>
          <VStack className="w-full justify-center items-center mt-4">
            <Text className="text-primary-100">Bạn đã có tài khoản?</Text>
            <Link href="/login">
              <Text className="text-primary-100 font-bold">Đăng nhập</Text>
            </Link>
          </VStack>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 0,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
