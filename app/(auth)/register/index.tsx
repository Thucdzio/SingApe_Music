import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link, router } from "expo-router";
import { Box } from "@/components/ui/box";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { HStack, Input } from "@/components/ui";
import { InputField } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Divider } from "@/components/ui/divider";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";

const header = () => {
  const isDarkMode = useSelector((state: any) =>
    state.isDarkMode
  );
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
  const { signIn } = useAuth(); 
  const [isInvalid, setIsInvalid] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repasswordRef = useRef("");

  const handleEmailChange = (text: string) => {
    emailRef.current = text;
  };
  const handlePasswordChange = (text: string) => {
    passwordRef.current = text;
  };
  const handleRePasswordChange = (text: string) => {
    if (isInvalid) {
      setIsInvalid(false);
    }
    repasswordRef.current = text;
  };

  const handleRegister = () => {
    try {
      if (passwordRef.current !== repasswordRef.current) {
        setIsInvalid(true);
        return;
      }
      signIn({
        email: emailRef.current,
        password: passwordRef.current,
      });
      router.dismissAll();
      router.replace("/(tabs)");
      console.log("Sign Up button pressed");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleGoogle = () => {
    console.log("Sign Up button pressed");
  };

  return (
    <View className="flex-1 items-center bg-background-50">
    <VStack className="flex-1 justify-center items-center w-full max-w-md bg-transparent p-4">
      {header()}
      <VStack space="md" className="bg-none w-full">
        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Enter your email"
              onChangeText={handleEmailChange}
            ></InputField>
          </Input>
        </FormControl>
        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Mật khẩu</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              placeholder="Enter your password"
              onChangeText={handlePasswordChange}
            ></InputField>
          </Input>
        </FormControl>
        <FormControl 
          isRequired={true}
          isInvalid={isInvalid}
        >
          <FormControlLabel>
            <FormControlLabelText>Nhập lại mật khẩu</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              placeholder="Enter your password"
              onChangeText={handleRePasswordChange}
            ></InputField>
          </Input>
          <FormControlError>
            <FormControlErrorText>
              Mật khẩu không khớp
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button
          onPress={handleRegister}
          variant="solid"
          className="mt-4"
        >
          <ButtonText>Đăng ký</ButtonText>
        </Button>
      </VStack>
      <HStack className="w-full justify-between items-center mt-2">
        <Divider className="w-1/3" />
        <Text className="text-primary-100">Hoặc</Text>
        <Divider className="w-1/3" />
      </HStack>
      <Button
        onPress={handleGoogle}
        variant="outline"
        className="mt-2 w-full data-[active=true]:bg-background-300"
      >
        <ButtonText>Đăng ký với Google</ButtonText>
        <AntDesign name="googleplus" size={24} className="color-primary-100"/>
      </Button>
      <VStack className="w-full justify-center items-center mt-4">
        <Text className="text-primary-100">Bạn đã có tài khoản?</Text>
        <Link href="/(auth)/login" className="text-primary-100 font-bold">
          Đăng nhập
        </Link>
      </VStack>
    </VStack>
    </View>
  );
}
