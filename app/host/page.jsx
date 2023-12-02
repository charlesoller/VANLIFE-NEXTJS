import React from "react"

import { myCreateServerClient } from "../api/customHooks";

import Card from "../components/VanCard";
import { StatsGroup } from "../components/StatsGroup";

import classes from '../modules/HostDashboard.module.css';


export default async function Dashboard() {
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
        return <Card key={van.id} image={van.imageUrl} title={van.name} category={van.type} path={`/host/manage-listings/${van.id}`}>View your van</Card>
    })
    
    return (
        <>
            <section>
                <StatsGroup />
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                </div>
                <div className={classes.grid}>
                    {hostVans}
                </div>
            </section>
        </>
    )
}
