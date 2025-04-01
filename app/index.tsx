import GetStarted from "./(auth)/index";

export default function Login() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Login screen loaded');
  }

  return (
    <GetStarted/>
  )
}