import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { AuthError } from 'expo-auth-session';
import { useStorageState } from './useStorageState';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture: string;
  provider: string;
  exp: string;
}

export type SignInParams = { 
  email: string; 
  password: string 
};

const AuthContext = createContext<{
  user?: AuthUser | null;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  loading?: boolean;
  error?: AuthError | null;
}>({
  user: null,
  signIn: async () => Promise.resolve(),
  signOut: () => null,
  session: null,
  loading: true,
  error: null,
});


// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [[isLoading, session], setSession] = useStorageState('session');
  const [loading, setLoading] = useState(false);
  
  const signIn = async ({ email, password }: SignInParams) => {
    setLoading(true);
    try {
      const response = true;
      setSession('session_token');
      const responseUser = {
        id: '123',
        email: email,
        name: 'John Doe',
        picture: 'https://example.com/johndoe.jpg',
        provider: 'local',
        exp: new Date().toISOString(),
      }
      setUser(responseUser);
    } catch (error) {
      console.error('Sign-in error:', error);
      setUser(null);
    }
    setLoading(false);
  }

  const signOut = async () => {
    setSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ 
        user,
        signIn,
        signOut,
        session,
        loading,
        error: null, // Handle error state as needed
      }}>
      {children}
    </AuthContext.Provider>
  );
}
