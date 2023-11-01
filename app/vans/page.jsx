"use client"

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import VanThumbnail from "../components/VanThumbnail";
import TypeTag from "../components/TypeTag";
import Loading from "../loading";


export default function Vans(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const [vans, setVans] = useState([])
    const type = searchParams.get('type')

    useEffect(() => {
        async function getVans() {
            const res = await fetch(`http://localhost:3000/api/vans`, {
                method: 'GET'
            })

            const vans = await res.json();
            if(vans.error){
                console.log(vans.error)
            } else {
                router.refresh();
                setVans(vans.data)
            }
        }

        getVans();
    }, [])

    const vansElement = vans.map(van => {
        const thumbnailEle =
            <Link className="van--thumbnail" href={`/vans/${van.id}`} key={ van.id }>
                <VanThumbnail
                    id={ van.id }
                    name={ van.name }
                    price={ van.price }
                    imageUrl = { van.imageUrl }
                    type={ van.type }
                />
            </Link>
        return type ? van.type === type ? thumbnailEle : null : thumbnailEle;
    })

    const filtersElement = [...new Set(vans.map(van => van.type))]   //creates set of unique items from type property //isSelected={typeFilter === filter}
                        .map(filter => {
                            return (
                                <Link href={`?type=${filter}`} key={ filter }>
                                    <TypeTag type={filter} isFilter={true}  className="vans__filter" isSelected={type === filter}/>
                                </Link>
                            )
                        })

    return (
        <main className="vans">
            <h1 className="vans__title">Explore our van options</h1>
            <div className="vans__filters">
                {filtersElement}
                {<Link className="vans__filters__clear" href="/vans">Clear filters</Link>}
            </div>
            <div className="vans__grid">
                <Suspense fallback={<Loading />}>
                    {vansElement}
                </Suspense>
            </div>
        </main>
    )
}
