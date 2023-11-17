import { Skeleton } from "@mantine/core";

export default function VansLoading(){
    return (
        <div className="vans__grid">
            <Skeleton height={400} radius="xl"/>
            <Skeleton height={400} radius="xl"/>
            <Skeleton height={400} radius="xl"/>
        </div>
    )
}
