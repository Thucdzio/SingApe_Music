import { Redirect, useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/auth"; // Assuming you have an auth context to manage authentication
import { useRef, useState } from "react";

export default function AccountRegister() {
  const { signIn, session } = useAuth(); // Assuming you have a signIn function in your auth context
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleEmailChange = (text: string) => {
    emailRef.current = text;
  };
  const handlePasswordChange = (text: string) => {
    passwordRef.current = text;
  };

  const handleSubmit = async () => {
    // Handle form submission logic here

    signIn({ email: emailRef.current, password: passwordRef.current }); // Call the signIn function from your auth context
    console.log("Form submitted");
  };

  if (session) {
    router.navigate("/(app)/(tabs)/(songs)"); // Redirect to home if already logged in
  }

  return (
    <VStack className="flex-1 justify-center items-center bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">Register</Text>
      <Text className="text-white text-lg mb-4">
        Please fill in the details below to create an account.
      </Text>
      <FormControl isRequired={false}>
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
      <FormControl isRequired={false}>
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            type="password"
            placeholder="Enter your password"
            onChangeText={handlePasswordChange}
          ></InputField>
        </Input>
      </FormControl>
      <Button onPress={handleSubmit} variant="solid" className="mt-4">
        Register
      </Button>
      <Button onPress={() => router.back()} variant="outline" className="mt-2">
        Back to Login
      </Button>
    </VStack>
  );
}
