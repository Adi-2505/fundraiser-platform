"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";


const Context = createContext<Session | null>(null);

const SupabaseSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
      }
      setSession(session);
    };
    getSession();
  });

  return <Context.Provider value={session}>{children}</Context.Provider>;
};

export default SupabaseSessionProvider;

export const useSupabaseSession = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useSupabaseSession must be used within a SupabaseSessionProvider"
    );
  }
  return context;
};
