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

const AuthContext = createContext<{
  user?: AuthUser | null;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading?: boolean;
  error?: AuthError | null;
}>({
  user: null,
  signIn: async () => Promise.resolve(),
  signOut: () => null,
  session: null,
  isLoading: true,
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

  type SignInParams = { email: string; password: string };
  
  const signIn = async ({ email, password }: SignInParams) => {
    // Perform sign-in logic here, e.g., API call to authenticate the user
    setSession('xxx');
  }

  const signOut = async () => {
    // Perform sign-out logic here, e.g., API call to invalidate the session
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ 
        user,
        signIn,
        signOut,
        session,
        isLoading,
        error: null, // Handle error state as needed
      }}>
      {children}
    </AuthContext.Provider>
  );
}
