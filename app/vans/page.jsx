"use client"

import { Suspense, useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ExploreVanCard from "../components/ExploreVanCard";
// import VanThumbnail from "../components/VanThumbnail";
import TypeTag from "../components/TypeTag";
import Loading from "../loading";


async function getVans(){
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

    const { data, error } = await supabase
        .from('vans')
        .select()

    if(error){
        console.log(error)
    }
    return data;
}

export default function Vans(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const [vans, setVans] = useState([])
    const type = searchParams.get('type')

    useEffect(() => {
        async function loadVans() {
            const data = await getVans()
            setVans(data)
        }

        loadVans()
    }, []);

    const vansElement = vans.map(van => {
        const thumbnailEle =
            // <Link className="van--thumbnail" href={`/vans/${van.id}`} key={ van.id }>
                <ExploreVanCard
                    id={ van.id }
                    name={ van.name }
                    price={ van.price }
                    imageUrl = { van.imageUrl }
                    type={ van.type }
                    key={ van.id }
                />
            // </Link>
        return type ? van.type === type ? thumbnailEle : null : thumbnailEle;
    })

    const filtersElement = [...new Set(vans.map(van => van.type))]   //creates set of unique items from type property //isSelected={typeFilter === filter}
                        .map(filter => {
                            return (
                                <Link href={`?type=${filter}`} key={ filter }>
                                    <TypeTag type={filter}/>
                                </Link>
                            )
                        })

    return (
        <main className="vans">
            <h1 className="vans__title">Explore our van options</h1>
            <div className="vans__filters">
                {filtersElement}
                <Link className="vans__filters__clear" href="/vans">{type ? "Clear Filters" : null}</Link>
            </div>
            <div className="vans__grid">
                <Suspense fallback={<Loading />}>
                    {vansElement}
                </Suspense>
            </div>
        </main>
    )
}
