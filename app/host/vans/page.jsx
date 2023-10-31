import HostVanThumbnail from "../../components/HostVanThumbnail"

import { getHostVans } from "@/app/api/vanFetching";
import { useCreateServerClient } from "@/app/api/customHooks"

export default async function HostVans(){
    const vans = await getHostVans();
    const vansElement = vans.map(van => {
        return (
            <HostVanThumbnail
                key={ van.id }
                id={ van.id }
                name={ van.name }
                price={ van.price }
                imageUrl = { van.imageUrl }
            />
        )
    })

    return (
        <div className="host-vans">
            <h1 className="host-vans__title">Your listed vans</h1>
            <div className="host-vans__grid">
                { vansElement }
            </div>
        </div>
    )
}
