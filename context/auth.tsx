import { AuthError } from 'expo-auth-session';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

// export type AuthUser = {
//   id: string;
//   email: string;
//   display_name?: string;
// };

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  display_name: string;
};

const AuthContext = createContext<{
  user?: User | null;
  setUser: (user: User | null) => void;
  signIn: (params: SignInParams) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<void>;
  signOut: () => void;
  session?: Session | null;
  setSession: (session: Session | null) => void;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  error?: AuthError | null;
  setError: (error: AuthError | null) => void;
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
  setError: () => null,
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
  const [error, setError] = useState<AuthError | null>(null);

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

  const signUp = async ({ email, password, display_name }: SignUpParams) => {
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

  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) throw error;

  //     setSession(data.session);

  //     if (data.user) {
  //       const profile = await getUserProfile(data.user.id);

  //       setUser({
  //         id: data.user.id,
  //         email: data.user.email || "",
  //         display_name: profile?.display_name,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Sign-in error:", error);
  //     setError(error);
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Sign up with email, password and display name
  // const signUp = async ({ email, password, display_name }: SignUpParams) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // 1. Create the user with Supabase Auth
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     if (error) throw error;

  //     // 2. If successful and we have a user, insert profile data
  //     if (data.user) {
  //       // Create a profile record with display_name
  //       const { error: profileError } = await supabase.from("profiles").insert([
  //         {
  //           id: data.user.id,
  //           display_name,
  //           email: data.user.email,
  //           updated_at: new Date().toISOString(),
  //         },
  //       ]);

  //       if (profileError) throw profileError;

  //       // If we got a session (auto sign-in is enabled)
  //       if (data.session) {
  //         setSession(data.session);
  //         setUser({
  //           id: data.user.id,
  //           email: data.user.email || "",
  //           display_name: display_name,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Sign-up error:", error);
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

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
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
