import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { AuthError } from 'expo-auth-session';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { supabase } from '@/lib/supabase';

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
  signUp: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  error?: AuthError | null;
}>({
  user: null,
  signIn: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
  signOut: () => null,
  session: null,
  loading: true,
  setLoading: () => {},
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  }

  const signUp = async ({ email, password }: SignInParams) => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    
    if (error) {
      throw error;
    }
    if (!session) {
      throw new Error('No session returned from sign up');
    }
    setLoading(false);
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    setStorageItemAsync('session', null);
    setSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ 
        user,
        signIn,
        signUp,
        signOut,
        session,
        loading,
        setLoading,
        error: null, // Handle error state as needed
      }}>
      {children}
    </AuthContext.Provider>
  );
}
