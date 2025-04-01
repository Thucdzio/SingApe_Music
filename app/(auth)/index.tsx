import React from "react";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";

export default function GetStarted() {
  const handleLogin = () => {
    router.push("/login");
    console.log("Sign In button pressed");
  };
  const handleRegister = () => {
    router.push("/register");
    console.log("Sign Up button pressed");
  };
  return (
    <VStack className="flex-1 justify-center items-center bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">Get Started</Text>
      <Text className="text-white text-lg mb-4">
        Welcome to our app! Please choose an option below to continue.
    	</Text>
      <Box className="bg-none w-full absolute bottom-5 p-16">
        <Button onPress={handleRegister}
                variant="solid"
                className="mb-2 text-black bg-primary-50"
        >
            Register
        </Button>
        <Button onPress={handleLogin} 
                className="mb-2 text-primary-50" 
                variant="outline"
        >
            Login
        </Button>
      </Box>
    </VStack>
  );
}