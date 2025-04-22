import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://pylebcixrgfsitjtxlbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bGViY2l4cmdmc2l0anR4bGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Mzc5MDMsImV4cCI6MjA2MDExMzkwM30.IAtO3L9tqP2zteUEdVrghqRMDogVnWPp6J5mC1hGbIY';

// Check if we're running in a browser or native environment
const isBrowser = typeof window !== 'undefined';
const isExpo = Platform.OS === 'ios' || Platform.OS === 'android';
const isClient = isBrowser || isExpo;

// Create a mock client for SSR
const createMockClient = () => {
  const mockData = {
    data: null,
    error: null
  };

  const mockAuth = {
    getSession: () => Promise.resolve({ data: { session: null } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: null }),
  };

  // Add database operations
  const mockFrom = () => ({
    select: () => ({ 
      eq: () => ({ 
        single: () => Promise.resolve(mockData) 
      }),
      match: () => Promise.resolve(mockData)
    }),
    insert: () => Promise.resolve(mockData),
    update: () => Promise.resolve(mockData),
    delete: () => Promise.resolve(mockData),
  });

  return {
    auth: mockAuth,
    from: mockFrom,
  };
};

export const supabase = isClient 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : createMockClient(); 