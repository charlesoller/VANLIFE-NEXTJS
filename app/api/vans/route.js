import { useCreateServerClient } from "../customHooks";
import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    console.log(searchParams)
    console.log(type)
    const supabase = await useCreateServerClient();
    const { data, error } = await supabase
        .from('vans')
        .select()
        // .eq('type', type)

    return NextResponse.json({ data, error })
  }
