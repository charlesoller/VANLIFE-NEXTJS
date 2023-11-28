"use client"

import { Container, Divider, SimpleGrid, Text } from "@mantine/core";

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
        <Card
            key={ van.id }
            id={ van.id }
            image={van.imageUrl}
            title={van.name}
            category={van.type}
            path={`/vans/${van.id}`}
        >
            Rent this van
        </Card>
    ))

    return (
        <Container my='lg'>
            {
                vans.length ?
                (
                    <div>
                        <Text
                            variant='gradient'
                            gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                            fw={700}
                            style={{fontSize: '2.5rem'}}
                        >
                            Your Liked Vans
                        </Text>
                        <Divider my='lg'/>
                        <SimpleGrid cols={2}>
                            { vanElements }
                        </SimpleGrid>
                    </div>
                )
                :
                <Text
                    variant='gradient'
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    fw={700}
                    style={{fontSize: '2.5rem'}}
                >
                    You have not liked any vans yet.
                </Text>
            }
        </Container>
    )
}
