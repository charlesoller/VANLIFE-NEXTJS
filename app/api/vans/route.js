import { myCreateServerClient } from "../customHooks";
import { NextResponse } from "next/server";

export async function GET(request) {
    // console.log("in route handler")
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const supabase = await myCreateServerClient();
    const { data, error } = await supabase
        .from('vans')
        .select()

    return NextResponse.json({ data, error })
  }
