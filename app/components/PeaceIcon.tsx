import { useMantineTheme, ActionIcon, Tooltip, rem } from "@mantine/core";

import { useState } from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import classes from '../modules/ExploreVanCard.module.css';

import { createBrowserClient } from "@supabase/ssr";

export default function PeaceButton({ vanId }){
    const theme = useMantineTheme();
    const [selected, setSelected] = useState(false)
    const [color, setColor] = useState(false)

    async function handleClick(){
        setColor(prevColor => !prevColor)

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

        setSelected(prevSelected => !prevSelected);
    }

    return (
        <Tooltip label={selected ? "Remove from Liked" : "Add to Liked"}>
            <ActionIcon onClick={handleClick} style={{ width: rem(52), height: rem(52)}} variant="transparent" className={classes.peace}>
                {
                    color ?
                    <IconHeartFilled
                        style={{ width: rem(52), height: rem(52), opacity: 1, color: "#ff922b"}}
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
