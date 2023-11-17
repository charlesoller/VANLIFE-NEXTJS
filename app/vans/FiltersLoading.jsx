import { Skeleton } from "@mantine/core";

export default function FiltersLoading(){
    return (
        <div className="vans__filters">
            <Skeleton height={45} width={121} radius="xl"/>
            <Skeleton height={45} width={121} radius="xl"/>
            <Skeleton height={45} width={121} radius="xl"/>
        </div>
    )
}
