"use server"

import { myCreateServerClient } from "./customHooks"
import { getCurrentUserByEmail } from "./api";

export async function getActivities(){
    const supabase = await myCreateServerClient();

    //Getting user by getting email from session, then assigning transactions and orders to variables
    const { data } = await supabase.auth.getSession()
    const userEmail = data.session.user.email;

    const currentUser = await getCurrentUserByEmail(userEmail)
    const allActivity = [];
    if(currentUser[0].transactions){
        allActivity.push(...currentUser[0].transactions)
    }
    if(currentUser[0].orders){
        allActivity.push(...currentUser[0].orders)
    }
    // const allActivity = [...currentUser[0].transactions, ...currentUser[0].orders] || [];
    return allActivity;
}
