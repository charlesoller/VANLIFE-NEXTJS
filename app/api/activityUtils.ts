"use server"

import { myCreateServerClient } from "./customHooks"
import { getCurrentUserByEmail } from "./api";

export async function getActivities(){
    const supabase = await myCreateServerClient();

    //Getting user by getting email from session, then assigning transactions and orders to variables
    const { data } = await supabase.auth.getSession()
    const userEmail = data.session.user.email;

    const currentUser = await getCurrentUserByEmail(userEmail)

    const allActivity = currentUser[0].all_activity ? currentUser[0].all_activity : [];
    return allActivity;
}
