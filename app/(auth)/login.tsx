// app/(auth)/login.tsx - File đăng nhập
import React, { useRef, useState } from "react";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { ButtonText, Button } from "@/components/ui/button";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { supabase } from "@/app/lib/supabase";

const header = () => {
  const isDarkMode = useSelector((state: any) => state.isDarkMode);
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: isDarkMode ? "#fff" : "#000",
      }}
    />
  );
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sử dụng useState để lưu trữ giá trị input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

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

    setValidationError(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      setError(null);

      // Sử dụng trực tiếp API của Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Điều hướng đến màn hình chính nếu đăng nhập thành công
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Error signing in:", error);
      setError(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      setError(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setValidationError({
        ...validationError,
        email: "Vui lòng nhập email để đặt lại mật khẩu",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "myapp://reset-password",
      });

      if (error) throw error;

      Alert.alert(
        "Đặt lại mật khẩu",
        "Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn."
      );
    } catch (error: any) {
      console.error("Error resetting password:", error);
      setError(error.message || "Đã xảy ra lỗi khi đặt lại mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-full h-full items-center bg-background-0">
        {header()}
        <VStack
          space="md"
          className="bg-none w-full flex-1 justify-center p-4 max-w-md h-full"
        >
          <VStack space="md" className="w-full justify-center">
            <FormControl isRequired={true} isInvalid={!!validationError.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email"
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
              isInvalid={!!validationError.password || !!error}
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
              ) : error ? (
                <FormControlError>
                  <FormControlErrorText>
                    {error || "Sai tên đăng nhập hoặc mật khẩu"}
                  </FormControlErrorText>
                </FormControlError>
              ) : null}
            </FormControl>
            <TouchableWithoutFeedback onPress={handleForgotPassword}>
              <Text className="text-primary-100">Quên mật khẩu?</Text>
            </TouchableWithoutFeedback>
            <Button
              onPress={handleSignIn}
              variant="solid"
              action="primary"
              isDisabled={loading}
            >
              <ButtonText>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </ButtonText>
            </Button>
          </VStack>
          <HStack className="w-full justify-between items-center px-4">
            <Divider className="w-1/3" />
            <Text className="text-primary-100">Hoặc</Text>
            <Divider className="w-1/3" />
          </HStack>
          <Button
            onPress={handleGoogleSignIn}
            variant="outline"
            action="primary"
            className="mb-2"
            isDisabled={loading}
          >
            <ButtonText>Đăng nhập với Google</ButtonText>
            <AntDesign name="google" size={24} color="#6E6BFF" />
          </Button>
          <VStack className="bg-none w-full items-center justify-center">
            <Text className="text-primary-100">Bạn chưa có tài khoản?</Text>
            <Link href="/register">
              <Text className="text-primary-200 font-bold">Đăng ký</Text>
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
