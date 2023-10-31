import { useCreateServerClient } from "./customHooks";

export async function getVans(){
    const supabase = await useCreateServerClient();

    const { data, error } = await supabase.from('vans')
        .select()

    if(error){
        console.log(error.message)
    }

    return data;
}

export async function getVan(id){
    const supabase = await useCreateServerClient();

    const { data, error } = await supabase.from('vans')
        .select()
        .eq('id', id)
        .single()

    if(error){
        console.log(error.message)
    }

    return data;
}

export async function getHostVans(){
    const supabase = await useCreateServerClient();

    const { data, error } = await supabase.from('vans')
        .select()
        .eq('hostId', 123)

    if(error){
        console.log(error.message)
    }

    return data;
}
