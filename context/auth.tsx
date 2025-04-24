<<<<<<< HEAD
import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { AuthError } from 'expo-auth-session';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
=======
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { supabase } from "@/app/lib/supabase";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string;
  display_name?: string;
};
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  display_name: string;
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
<<<<<<< HEAD
  signUp: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  session?: Session | null;
  setSession: (session: Session | null) => void;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  error?: AuthError | null;
=======
  signUp: (params: SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
  session?: Session | null;
  loading?: boolean;
  error?: any | null;
  setError: (error: any) => void;
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb
}>({
  user: null,
  setUser: () => null,
  signIn: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
<<<<<<< HEAD
  signOut: () => null,
=======
  signOut: async () => Promise.resolve(),
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb
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
<<<<<<< HEAD

  if (!value) {
    throw new Error('useSession must be wrapped in a <AuthProvider />');
=======
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
<<<<<<< HEAD
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
=======
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  // Function to get user profile data
  const getUserProfile = async (userId: string) => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        const profile = await getUserProfile(session.user.id);

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          display_name: profile?.display_name,
        });
      }

      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);

        if (session?.user) {
          const profile = await getUserProfile(session.user.id);

          setUser({
            id: session.user.id,
            email: session.user.email || "",
            display_name: profile?.display_name,
          });
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async ({ email, password }: SignInParams) => {
    setLoading(true);
    setError(null);
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSession(data.session);

      if (data.user) {
        const profile = await getUserProfile(data.user.id);

        setUser({
          id: data.user.id,
          email: data.user.email || "",
          display_name: profile?.display_name,
        });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email, password and display name
  const signUp = async ({ email, password, display_name }: SignUpParams) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // 2. If successful and we have a user, insert profile data
      if (data.user) {
        // Create a profile record with display_name
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            display_name,
            email: data.user.email,
            updated_at: new Date().toISOString(),
          },
        ]);

        if (profileError) throw profileError;

        // If we got a session (auto sign-in is enabled)
        if (data.session) {
          setSession(data.session);
          setUser({
            id: data.user.id,
            email: data.user.email || "",
            display_name: display_name,
          });
        }
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
<<<<<<< HEAD
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  }
=======
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb

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
<<<<<<< HEAD
        setLoading,
        error: null, // Handle error state as needed
      }}>
=======
        error,
        setError,
      }}
    >
>>>>>>> f262d16bcbdbb17a587fa3a9f2cbecb9ac145dfb
      {children}
    </AuthContext.Provider>
  );
}
