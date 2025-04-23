import React, { useState } from "react";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/auth";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { ButtonText, Button, ButtonIcon } from "@/components/ui/button";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import { Center, Modal, Spinner } from "@/components/ui";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Heading } from "@/components/ui/heading";

const header = () => {
  const isDarkMode = useSelector((state: any) => state.isDarkMode);
  console.log("--------------------------------");
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
  const { signIn, loading, setLoading } = useAuth();

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleEmailChange = (text: string) => {
    if (text.length === 0) {
      setIsInvalidEmail(true);
    }
    if (text.length > 0) {
      setIsInvalidEmail(false);
    }
    emailRef.current = text;
  };
  const handlePasswordChange = (text: string) => {
    if (text.length === 0) {
      setIsInvalidPassword(true);
    }
    if (text.length > 0) {
      setIsInvalidPassword(false);
    }
    passwordRef.current = text;
  };

  async function signInWithEmail() {
    try {
      if (emailRef.current.length === 0) {
        setIsInvalidEmail(true);
        return;
      }
      if (passwordRef.current.length === 0) {
        setIsInvalidPassword(true);
        return;
      }

      await signIn({
        email: emailRef.current,
        password: passwordRef.current,
      });
      setLoading(false);
      router.dismissAll();
      router.replace("/(app)/(tabs)");
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Đăng nhập thất bại",
        "Vui lòng kiểm tra lại thông tin đăng nhập.",
        [
          {
            text: "Xác nhận",
            onPress: () => setLoading(false),
          },
        ]
      );
    }
  }

  async function signInWithGoogle() {}

  if (loading) {
    return (
      <View className="w-full h-full items-center bg-background-0 justify-center">
        {header()}
        <LoadingOverlay />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View className="flex-1 items-center h-full bg-background-0">
          {header()}
          {/* <KeyboardAvoidingComponent> */}
          <VStack className="flex-1 items-center w-full max-w-md bg-transparent p-4">
            <Center className="h-32">
              <Heading className="text-primary-500 font-bold text-4xl mt-4">
                Đăng nhập
              </Heading>
            </Center>
            <VStack space="md" className="bg-none w-full">
              <FormControl isRequired={true} isInvalid={isInvalidEmail}>
                <FormControlLabel>
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    placeholder="Nhập email"
                    onChangeText={handleEmailChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    Vui lòng nhập email
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl isRequired={true} isInvalid={isInvalidPassword}>
                <FormControlLabel>
                  <FormControlLabelText>Mật khẩu</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    secureTextEntry={true}
                    placeholder="Nhập mật khẩu"
                    onChangeText={handlePasswordChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    Vui lòng nhập mật khẩu
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <Text className="text-primary-100">Quên mật khẩu?</Text>
              <Button
                onPress={signInWithEmail}
                variant="solid"
                action="primary"
                className=""
              >
                <ButtonText>Đăng nhập</ButtonText>
              </Button>
            </VStack>
            <HStack className="w-full justify-between items-center mt-2">
              <Divider className="w-1/3" />
              <Text className="text-primary-100">Hoặc</Text>
              <Divider className="w-1/3" />
            </HStack>
            <Button
              onPress={signInWithGoogle}
              variant="outline"
              className="mt-2 w-full data-[active=true]:bg-background-300"
            >
              <ButtonText>Đăng ký với Google</ButtonText>
              <AntDesign
                name="googleplus"
                size={24}
                className="color-primary-100"
              />
            </Button>
            <VStack className="w-full justify-center items-center mt-4">
              <Text className="text-primary-100">Chưa có tài khoản?</Text>
              <Link
                href="/(auth)/register"
                className="text-primary-100 font-bold"
              >
                Đăng ký
              </Link>
            </VStack>
          </VStack>
          {/* </KeyboardAvoidingComponent> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
