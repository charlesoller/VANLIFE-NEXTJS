import Link from 'next/link'

//Custom Components
import TypeTag from '@/app/components/TypeTag'

//Custom Hooks
import { useCreateServerClient } from "../../api/customHooks"

async function getVan(id){
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

export default async function VanDetail({ params }){
    const van = await getVan(params.id)
    return (
        <div className="van--detail">
        <Link href="/vans" className="van--detail__back">← Back to all vans</Link>
        <img className="van--detail__image" src={ van.imageUrl } alt="An image of a van available for rental." />
        <h1 className="van--detail__name">{ van.name }</h1>
        <h3 className="van--detail__price">${ van.price }<span className="van--detail__price-subtext">/day</span></h3>
        <p className="van--detail__description"> {van.description }</p>
        <TypeTag type={ van.type } className="van--detail__type"/>
        <button className="van--detail__button">Rent this van</button>
    </div>
    )
}
