import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { AuthError } from 'expo-auth-session';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export type SignInParams = { 
  email: string; 
  password: string 
};

export type SignUpParams = { 
  email: string; 
  password: string,
  name?: string,
};

const AuthContext = createContext<{
  user?: User | null;
  setUser: (user: User | null) => void;
  signIn: (params: SignInParams) => Promise<void>;
  signUp: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  session?: Session | null;
  setSession: (session: Session | null) => void;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  error?: AuthError | null;
}>({
  user: null,
  setUser: () => null,
  signIn: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
  signOut: () => null,
  session: null,
  setSession: () => null,
  loading: true,
  setLoading: () => {},
  error: null,
});


// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useSession must be wrapped in a <AuthProvider />');
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async ({ email, password }: SignInParams) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    if (!data.session) {
      throw new Error('No session returned from sign in');
    }
    setSession(data.session);
    setUser(data.session.user);
  }

  const signUp = async ({ email, password, name }: SignUpParams) => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { display_name: name },
      }
    })
    console.log('session', session);
    
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
    setSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ 
        user,
        setUser,
        signIn,
        signUp,
        signOut,
        session,
        setSession,
        loading,
        setLoading,
        error: null, // Handle error state as needed
      }}>
      {children}
    </AuthContext.Provider>
  );
}
