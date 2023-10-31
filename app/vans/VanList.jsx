import Link from "next/link"

//Custom Hooks
import { getVans } from "../api/vanFetching"

//Component Imports
import VanThumbnail from "../components/VanThumbnail"
import TypeTag from "../components/TypeTag"

const vans = await getVans();
export const filtersElement = [...new Set(vans.map(van => van.type))]   //creates set of unique items from type property
    .map(filter => {
        return (
            <TypeTag type={filter} isFilter={true} className="vans__filter" key={filter}/>
        )
    })

export default async function VanList(){
    const vans = await getVans();
    const vansElement = vans.map(van => {
        return (
            <Link className="van--thumbnail" href={`/vans/${van.id}`} key={ van.id }>
                <VanThumbnail
                    name={ van.name }
                    price={ van.price }
                    imageUrl = { van.imageUrl }
                    type={ van.type }
                />
            </Link>
        )
    })
    return (
        vans ? vansElement : <h1>There are no vans!</h1>
    )
}
