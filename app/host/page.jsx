import React from "react"
import Link from "next/link";

import { Flex, Grid } from '@mantine/core'
import { BsStarFill } from "react-icons/bs"
import { myCreateServerClient } from "../api/customHooks";

import Card from "../components/CarouselCard";
import { StatsGroup } from "../components/StatsGroup";

import classes from '../modules/HostDashboard.module.css';

const supabase = await myCreateServerClient();

export default async function Dashboard() {
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
        return <Card key={van.id} image={van.imageUrl} title={van.name} category={van.type}>View your van</Card>
    })
    return (
        <>
            <section>
                <StatsGroup />
                {/* <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>

                <BsStarFill className="star" />

                <p>
                    <span>5.0</span>/5
                </p> */}
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
