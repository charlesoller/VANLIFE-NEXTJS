import { myCreateServerClient } from "./customHooks";
import { nanoid } from 'nanoid'

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

export async function handlePossibleNewUser(data){
    const supabase = await myCreateServerClient();
    const email = data.session.user.email;

    const { data: emailData, error: emailError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)

    if(!emailData.length){
        const { error: uploadError } = await supabase
            .from('users')
            .insert({id: nanoid(), email: email})

        if(uploadError){
            console.log(uploadError.message)
        }
    }
}

export async function getCurrentUserById(userId: string){
    const supabase = await myCreateServerClient();
    const {data, error} = await supabase
        .from('users')
        .select()
        .eq('id', userId)

    if(error){
        console.log(error.message)
    }

    return data[0]
}

export async function getCurrentUser(){
    const supabase = await myCreateServerClient()
    const { data } = await supabase.auth.getSession()

    return data;
}

export async function getComments(vanId){
    const supabase = await myCreateServerClient();
    const { data, error } = await supabase
        .from('vans')
        .select('comments')
        .eq('id', vanId)

    if(error) console.log(error)

    return data[0].comments
}
