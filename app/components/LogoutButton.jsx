"use client"

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          )

        const { error } = await supabase.auth.signOut();
        if(!error){
            router.push("/login")
            router.refresh()
        } else {
            console.log(error)
        }
    }

    return (
        <button className='logout-button' onClick={handleLogout}>
            Logout
        </button>
    )
}
