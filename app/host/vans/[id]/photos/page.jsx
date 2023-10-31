import { getVan } from "@/app/api/vanFetching"

export default async function HostVanDetailPhotos({ params }){
    const van = await getVan(params.id)
    return (
        <div className='host-van--detail__photos'>
            <img src={van.imageUrl} />
        </div>
    )
}
