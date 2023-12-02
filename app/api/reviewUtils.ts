"use server"

import { myCreateServerClient } from "./customHooks";
import { getCurrentUserByEmail } from "./api";

export async function getReviews(){
    const supabase = await myCreateServerClient();
    const { data } = await supabase.auth.getSession()
    const userEmail = data.session.user.email;
    const user = await getCurrentUserByEmail(userEmail)
    const userReviews = user[0].all_reviews;
    return userReviews;
}
