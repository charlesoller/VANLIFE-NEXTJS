"use client"

import { Button } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useSearchParams } from 'next/navigation'

import { IconChristmasTree, IconMountain, IconCoin } from '@tabler/icons-react';

export default function TypeTag({ type, disabled, className }){
    const searchParams = useSearchParams();
    const search = searchParams.get('type')

    function getIcon(){
        if(type === 'rugged'){
            return <IconMountain size={18} />
        }
        if(type === 'simple'){
            return <IconChristmasTree size={18} />
        }
        if(type === 'luxury'){
            return <IconCoin size={18} />
        }
    }

    return (
        <Button leftSection={getIcon()} variant={search === type ? "filled" : "outline"} color="yellow" size="md" radius="xl" disabled={disabled} className={className}>
            { upperFirst(type) }
        </Button>
    )
}
