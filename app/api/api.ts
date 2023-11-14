import { myCreateServerClient } from "./customHooks";

export async function getCurrentUserByEmail(userEmail: string){
    const supabase = await myCreateServerClient();

    const {data, error} = await supabase
        .from('users')
        .select()
        .eq('email', userEmail)

    if(error){
        console.log(error.message)
    }

    return data
}
