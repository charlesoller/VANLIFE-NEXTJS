"use client"

import Link from "next/link";
import Card from "@/app/components/VanCard";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LikedListings(){
    const [ vans, setVans ] = useState([])
    useEffect(() => {
        async function getLikedVans(){
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            )

            const { data } = await supabase.auth.getSession()
            const email = data.session.user.email;
            //Get current user and pull their liked vans
            const {data: idData, error: idError} = await supabase
                .from('users')
                .select('email, liked_vans')
                .eq('email', email)

            if(idError){
                console.log(vanError)
            }
            let likedVansIds = idData[0].liked_vans;
            if(!likedVansIds) return;
            else {
                const { data: vanData, error: vanError } = await supabase
                    .from('vans')
                    .select()
                    .in('id', likedVansIds)

                if(vanError){
                    console.log(vanError)
                }

                setVans(vanData)
            }
        }

        getLikedVans()
    }, [])

    let vanElements = vans.map(van => (
        // <Link className="van--thumbnail" href={`/vans/${van.id}`} key={ van.id }>
            <Card
                key={ van.id }
                id={ van.id }
                image={van.imageUrl}
                title={van.name}
                category={van.type}
            >
                Rent this van
            </Card>
        // </Link>
    ))

    return (
        <div>
            <h1>Liked Listings here</h1>
            {
                vans.length ?
                vanElements
                : <h3>You have not currently liked any vans.</h3>
            }
        </div>

    )
}
