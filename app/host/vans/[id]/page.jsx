import { getVan } from "@/app/api/vanFetching"

export default async function HostVanDetail({ params }){
    const van = await getVan(params.id)
    return (
        <div className="host-van--detail__details">
            <p><b>Name: </b>{ van.name }</p>
            <p style={{textTransform: "capitalize"}}><b>Category: </b>{ van.type }</p>
            <p><b>Description: </b>{ van.description }</p>
            <p><b>Visibility: </b>Public</p>
        </div>
    )
}
