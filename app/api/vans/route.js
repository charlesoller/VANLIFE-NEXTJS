import { myCreateServerClient } from "../customHooks";
import { NextResponse } from "next/server";

export async function GET(request) {
    // console.log("in route handler")
    const supabase = await myCreateServerClient();
    const { data, error } = await supabase
        .from('vans')
        .select()

    return NextResponse.json({ data, error }, { headers: corsHeaders }, { status: 200})
  }
