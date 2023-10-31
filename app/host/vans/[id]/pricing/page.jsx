import Link from "next/link"

// Custom Functions
import { getVan } from "@/app/api/vanFetching"

export default async function HostVanDetailPricing({ params }){
    const van = await getVan(params.id)
    return (
        <div className='host-van--detail__photos'>
            <h3 className="host-van--detail__pricing"><span className="host-van--detail__pricing__price">${van.price}.00</span>/day</h3>
        </div>
    )
}
