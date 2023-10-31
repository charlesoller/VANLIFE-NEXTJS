"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'


//components
import AuthForm from "../AuthForm"

export default function Login(){
    const [error, setError] = useState()
    const router = useRouter()

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        setError('')

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          )

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message);
        } else {
            router.push('/host/vans')
            router.refresh();
        }
    }

    return (
        <main>
            <h2 className="text-center">Log in</h2>

            <AuthForm handleSubmit={handleSubmit}/>

            {error && (
                <div className="error">{error}</div>
            )}
        </main>
    )
}
