import { useCreateServerClient } from "./customHooks";

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
