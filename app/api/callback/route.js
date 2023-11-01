import { myCreateServerClient } from "../customHooks"
import { cookies } from 'next/headers'
import { NextResponse } from "next/server"

export async function GET(request) {
    const url = new URL(request.url)
    //this is getting basically the verification code from the email, then we will use this to start a new session for user
    const code = url.searchParams.get('code')
    const supabase = myCreateServerClient();

    if (code) {
        //below runs on server but we can't access client cookies directly so we need to include/import cookies
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(url.origin);
}
