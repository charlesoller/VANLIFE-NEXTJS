"use client"

import Link from "next/link";
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
            router.push('/host')
            router.refresh();
        }
    }

    return (
        <main className="login-container">
            <h2>Log in</h2>
            <AuthForm handleSubmit={handleSubmit}/>
            <Link href="/signup"><p>Click here to sign up</p></Link>
            {error && (
                <div className="error">{error}</div>
            )}
        </main>
    )
}
