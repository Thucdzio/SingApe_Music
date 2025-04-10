import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";

export default function Register() {
  return (
    <VStack className="flex-1 justify-center items-center bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">Register</Text>
      <Box className="bg-none p-4 rounded-lg shadow-md w-full max-w-md">
        <Button
          onPress={() => router.push("/register/account")}
          variant="solid"
          className="mt-4"
        >
          Register
        </Button>
        <Button
          onPress={() => router.push("/login")}
          variant="outline"
          className="mt-2 text-white bold"
        >
          <Text>Continue with Google</Text>
        </Button>
        <Button
          onPress={() => router.back()}
          variant="outline"
          className="mt-2 text-white bold"
        >
          <Text>Back to Login</Text>
        </Button>
      </Box>
    </VStack>
  );
}
