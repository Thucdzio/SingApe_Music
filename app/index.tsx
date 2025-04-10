import { useAuth } from "@/context/auth";
import AuthenticateOption from "./(auth)/index";
import { Redirect } from "expo-router";

export default function Login() {
  const { session, loading, error } = useAuth();

  if (process.env.NODE_ENV !== 'production') {
    console.log('Login screen loaded');
  }

  if (session) {
    // return <Redirect href="/home" />;
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
    <AuthenticateOption/>
  )
}