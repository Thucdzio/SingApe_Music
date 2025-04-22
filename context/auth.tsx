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
  user?: AuthUser | null;
  signIn: (params: SignInParams) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
  session?: Session | null;
  loading?: boolean;
  error?: any | null;
  setError: (error: any) => void;
}>({
  user: null,
  signIn: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
  session: null,
  loading: true,
  error: null,
  setError: () => null,
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        session,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
