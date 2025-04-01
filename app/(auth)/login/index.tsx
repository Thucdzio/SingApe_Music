import { View, Text } from 'react-native'
import { useAuth } from '../../../context/auth'
import { useRouter } from 'expo-router'
import { useRef } from 'react';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';

export default function SignIn() {
    const { signIn } = useAuth(); 
    const router = useRouter();

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleEmailChange = (text: string) => {
        emailRef.current = text;
    };

    const handlePasswordChange = (text: string) => {
        passwordRef.current = text;
    };


    const handleSignIn = async () => {
        try {
            await signIn({ email: emailRef.current, password: passwordRef.current });
        } catch (error) {
            console.error('Error signing in:', error)
        }
    }
    // Call the signIn function when the component mounts or based on your app's logic

    return (
        <VStack
            className='flex-1 justify-center items-center bg-black p-4'
        >
            <FormControl isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText>
                        Email
                    </FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField
                        type="text"
                        placeholder="Enter your email"
                        onChangeText={handleEmailChange}
                        value={emailRef.current}
                    />
                </Input>
            </FormControl>
            <FormControl isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText>
                        Password
                    </FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField 
                        type="password"
                        placeholder="Enter your password"
                        onChangeText={handlePasswordChange}
                        value={passwordRef.current}
                    />
                </Input>
            </FormControl>
        </VStack>
    )
}
