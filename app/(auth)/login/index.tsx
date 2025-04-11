import React from "react";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { View, Text } from "react-native";
import { useAuth } from "../../../context/auth";
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

const header = () => {
  const isDarkMode = useSelector((state: any) =>
    state.isDarkMode
  );
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Đăng nhập",
        headerTransparent: true,
        headerTintColor: isDarkMode ? "#fff" : "#000",
      }}
    />
  );
};

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleEmailChange = (text: string) => {
    emailRef.current = text;
  };
  const handlePasswordChange = (text: string) => {
    passwordRef.current = text;
  };
  const handleSignIn = async () => {
    try {
      await signIn({
        email: emailRef.current,
        password: passwordRef.current,
      });
      router.dismissAll();
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  // Call the signIn function when the component mounts or based on your app's logic

  return (
    <View className="w-full h-full items-center bg-background-50">
    {header()}
    <VStack space="md" className="bg-none w-full flex-1 justify-center p-4 max-w-md">
      <VStack space="md" className="w-full justify-center">
        <FormControl isRequired={true}>
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
        </FormControl>
        <FormControl isRequired={true}>
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
              Sai tên đăng nhập hoặc mật khẩu
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Text className="text-primary-100">Quên mật khẩu?</Text>
        <Button
          onPress={handleSignIn}
          variant="solid"
          action="primary"
          className=""
        >
          <ButtonText>Đăng nhập</ButtonText>
        </Button>
      </VStack>
      <HStack className="w-full justify-between items-center px-4">
        <Divider className="w-1/3" />
        <Text className="text-primary-100">Hoặc</Text>
        <Divider className="w-1/3" />
      </HStack>
      <Button
        onPress={handleSignIn}
        variant="outline"
        action="primary"
        className="mb-2"
      >
        <ButtonText>Đăng nhập với Google</ButtonText>
        <AntDesign name="googleplus" size={24} className="color-primary-200" />
      </Button>
      <VStack className="bg-none w-full items-center justify-center">
        <Text className="text-primary-100">
          Bạn chưa có tài khoản?
        </Text>
        <Link href="/register" className="text-primary-200 font-bold">
          Đăng ký
        </Link>
      </VStack>
    </VStack>
    </View>
  );
}
