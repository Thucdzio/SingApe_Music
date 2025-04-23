import { useAuth } from "@/context/auth";
import { supabase } from "@/lib/supabase";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";

export default function App() {
  const { setSession, setUser } = useAuth();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        setUser(data.session.user);
        router.replace("/(app)");
        console.log("getSession-supabase success");
      } else {
        console.log("getSession-supabase no session");
        router.replace("/(auth)");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) {
        console.log("onAuthStateChange-supabase success", session);
        setUser(session.user);
        router.replace("/(app)");
      } else {
        console.log("onAuthStateChange-supabase no session");
        setUser(null);
        router.replace("/(auth)");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
}
