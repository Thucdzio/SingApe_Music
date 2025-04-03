import React from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import store from "@/store/store";
import { toggleTheme } from "@/store/slices";

export default function GetStarted() {
  const handleLogin = () => {
    router.push("/login");
    console.log("Sign In button pressed");
  };
  const handleRegister = () => {
    router.push("/register");
    console.log("Sign Up button pressed");
  };

  const handleChangeTheme = () => {
    store.dispatch(toggleTheme());
  }

  return (
    <VStack className="flex-1 justify-center items-center color-background-500 p-4">
      <Text className="color-primary-500 text-2xl font-bold mb-4">Get Started</Text>
      <Text className="color-primary-100 text-lg mb-4">
        Welcome to our app! Please choose an option below to continue.
    	</Text>
      <Box className="bg-none w-full absolute bottom-5 p-16">
        <Button onPress={handleRegister}
                variant="solid"
                className="mb-2 text-black bg-primary-50"
        >
            <ButtonText>
              Sign Up
            </ButtonText>
        </Button>
        <Button onPress={handleLogin} 
                className="mb-2 text-primary-50" 
                variant="outline"
        >
            <ButtonText>
              Sign In
            </ButtonText>
        </Button>
        <Button onPress={handleChangeTheme}>
          <ButtonText>
            Change Theme
          </ButtonText>
        </Button>
      </Box>
    </VStack>
  );
}