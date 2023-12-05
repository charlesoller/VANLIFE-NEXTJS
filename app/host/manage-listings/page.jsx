import { Text, Button, Flex, Divider } from "@mantine/core";

import CreateListing from "@/app/components/AddListing";
import ManageListingsOptions from "@/app/components/ManageListingsOptions"
import Card from "@/app/components/VanCard";
import classes from "../../modules/ManageListings.module.css"

import { myCreateServerClient } from "@/app/api/customHooks";
import Link from "next/link";

export default async function ManageListings(){
    const supabase = await myCreateServerClient();

    async function getHostVans(){
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if(sessionError) console.log(sessionError)
        const userEmail = sessionData.session.user.email

        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('id, email')
            .eq('email', userEmail)

        if(userError) console.log(userError)
        const userId = userData[0].id

        const {data: vanData, error: vanError} = await supabase
            .from('vans')
            .select()
            .eq('hostId', userId)
        if(vanError) console.log(vanError)

        return vanData
    }

    const vans = await getHostVans();
    const hostVans = vans.map(van => {
        return <Card key={van.id} image={van.imageUrl} title={van.name} category={van.type} path={`/vans/${van.id}`}>View this van</Card>
    })

    return (
        <div className={classes.body}>
            <Flex justify='space-between' align='center'>
                <Text
                    variant='gradient'
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    fw={700}
                    style={{fontSize: '2.5rem'}}
                >
                    Your Listed Vans
                </Text>
                <Button
                    variant='gradient'
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    radius='xl'
                    size='xl'
                    component={Link}
                    href='/host/manage-listings/create-listing'
                >
                    Add a Van
                </Button>
            </Flex>
            <Divider my='lg'/>
            {
                hostVans.length ?
                <div className={classes.grid}>
                    { hostVans }
                </div>
                :
                <Text>You currently have no listed vans.</Text>
            }
        </div>
    )
}
