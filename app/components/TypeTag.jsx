"use client"

import { Button } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useSearchParams } from 'next/navigation'

export default function TypeTag({ type }){
    const searchParams = useSearchParams();
    const search = searchParams.get('type')

    return (
        <Button variant="filled" color={search === type ? "orange" : "yellow"} size="md" radius="xl">
            { upperFirst(type) }
        </Button>
    )
}
