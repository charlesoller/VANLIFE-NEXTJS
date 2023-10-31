"use client"

import { useState } from "react"
import { createBrowserClient } from '@supabase/ssr'

import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";

export default function Signup(){
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          )
          
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback`
            }
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/verify')
        }
    }

    return (
        <main>
            <h2 className="text-center">Sign up</h2>
            <AuthForm handleSubmit={handleSubmit} />
            {error && (
                <div className="error">{error}</div>
            )}
        </main>
    )
}
