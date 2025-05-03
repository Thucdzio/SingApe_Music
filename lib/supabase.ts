import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/database.types";

// Get environment variables, removing any spaces that might exist
const supabaseUrl = (process.env.EXPO_PUBLIC_SUPABASE_URL || "null").trim();
const supabaseAnonKey = (
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "null"
).trim();

console.log("Supabase URL:", supabaseUrl.substring(0, 10) + "...");
console.log("Supabase Key:", supabaseAnonKey.substring(0, 10) + "...");

if (supabaseUrl === "null" || supabaseAnonKey === "null") {
  console.warn(
    "Supabase URL and Anon Key must be set in environment variables"
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// Default export for the supabase client
export default supabase;
