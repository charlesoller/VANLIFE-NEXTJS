import { useMantineTheme, ActionIcon, Tooltip, rem } from "@mantine/core";

import { useState, useEffect } from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import classes from '../modules/ExploreVanCard.module.css';

import { createBrowserClient } from "@supabase/ssr";

export default function LikeButton({ vanId }){
    const theme = useMantineTheme();
    const [selected, setSelected] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        async function isLiked(){
            //This only handles color on initial load
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            )
            const { data } = await supabase.auth.getSession()
            const email = data.session.user.email;
            //Get current user and pull their liked vans
            const {data: vanData, error: vanError} = await supabase
                .from('users')
                .select('email, liked_vans')
                .eq('email', email)

            if(vanError){
                console.log(vanError)
            }

            if(!vanData[0].liked_vans){
                return false;
            } else {
                let likedVans = vanData[0].liked_vans;
                if(likedVans.includes(vanId)){
                    setSelected(true)
                } else {
                    return false;
                }
            }
        }

        isLiked();
    },[])


    async function handleClick(event){
        event.preventDefault();
        setSelected(prevColor => !prevColor)

        setDisabled(true)
        setTimeout(() => setDisabled(false), 1000)

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
        const { data } = await supabase.auth.getSession()
        const email = data.session.user.email;
        //Get current user and pull their liked vans
        const {data: vanData, error: vanError} = await supabase
            .from('users')
            .select('email, liked_vans')
            .eq('email', email)

        if(vanError){
            console.log(vanError)
        }

        let likedVans = vanData[0].liked_vans;
        if(!likedVans) likedVans = [];
        if(!selected){
            const { error: updateError } = await supabase
                .from('users')
                .update({ liked_vans: [...likedVans, vanId]})
                .eq('email', email)

            if(updateError){
                console.log(updateError)
            }
        } else {
            const removalIndex = likedVans.indexOf(vanId)
            likedVans.splice(removalIndex, 1)
            const { error: updateError } = await supabase
                .from('users')
                .update({ liked_vans: likedVans})
                .eq('email', email)

            if(updateError){
                console.log(updateError)
            }
        }

    }

    return (
        <Tooltip label={selected ? "Remove from Liked" : "Add to Liked"}>
            <ActionIcon onClick={handleClick} style={{ width: rem(52), height: rem(52) }} variant="transparent" disabled={disabled} className={classes.like}>
                {
                    selected ?
                    <IconHeartFilled
                        style={{ width: rem(52), height: rem(52), opacity: 0.9, color: "#FFD43B"}}
                        className={classes.peace}
                    />
                  :
                    <IconHeart
                        style={{ width: rem(52), height: rem(52), opacity: 0.5 }}
                        stroke={2.5}
                        color={theme.colors.gray[0]}
                        className={classes.peace}
                    />
                }
            </ActionIcon>
        </Tooltip>
    )
}
