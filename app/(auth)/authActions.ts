"use client"

import { createBrowserClient } from "@supabase/ssr";
import { nanoid } from "nanoid";

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )


export async function handleSignup(firstName: string, lastName: string, email: string, password: string){
    const { error: loginError } = await supabase.auth.signUp({
      email,
      password,
      options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    })


    const { error: uploadError } = await supabase
        .from('users')
        .insert({id: nanoid(), first_name: firstName, last_name: lastName, email: email, password: password})


    return {loginError, uploadError};
}

export async function handleLogin(email: string, password: string){
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    return error
}



export async function handleSignInWithGoogle() {
    console.log("FIX ME")
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: 'google',
    //     options: {
    //         queryParams: {
    //         access_type: 'offline',
    //         prompt: 'consent',
    //         },
    //     },
    // })

    // if(data){
    //     console.log(data)
    // }
    // if(error){
    //     console.log(error)
    // }
  }
