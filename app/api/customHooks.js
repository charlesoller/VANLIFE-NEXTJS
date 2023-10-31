import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function useCreateServerClient(){
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get(name) {
              return cookieStore.get(name)?.value
            },
          },
        }
      )

      return supabase;
}
