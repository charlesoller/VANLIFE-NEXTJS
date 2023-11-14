"use client"

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export async function handleLogout(){
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

    const { error } = await supabase.auth.signOut();

    return error
  }
