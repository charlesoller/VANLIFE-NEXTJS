"use client"

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import VanThumbnail from "../components/VanThumbnail";
import TypeTag from "../components/TypeTag";
import Loading from "../loading";

// import VanList from "./VanList"
// import { filtersElement } from "./VanList";


export default async function Vans(){
    const searchParams = useSearchParams();
    const typeFilter = searchParams.get("type")

    async function getVans(){
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            )

            const { data, error } = await supabase.from('vans')
                .select()

            if(error){
                console.log(error.message)
            }

            return data;
    }

    const vans = await getVans();
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
        return (
            typeFilter ?
                van.type === typeFilter ?
                thumbnailEle : null
            : thumbnailEle
        )
    })

    const filtersElement = [...new Set(vans.map(van => van.type))]   //creates set of unique items from type property
                        .map(filter => {
                            return (
                                <Link href={`?type=${filter}`} key={ filter }>
                                    <TypeTag type={filter} isFilter={true} isSelected={typeFilter === filter} className="vans__filter" />
                                </Link>
                            )
                        })
    return (
        <main className="vans">
            <h1 className="vans__title">Explore our van options</h1>
            <div className="vans__filters">
                {filtersElement}
                {typeFilter ? <Link className="vans__filters__clear" href="/vans">Clear filters</Link> : null}
            </div>
            <div className="vans__grid">
                <Suspense fallback={<Loading />}>
                    {vansElement}
                </Suspense>
            </div>
        </main>
    )
}
