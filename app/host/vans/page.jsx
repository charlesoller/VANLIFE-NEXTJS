import Link from "next/link"

export default function HostVans(){
    return (
        <>
            <h1>Host Vans Here</h1>
            <Link href="/host">Go dashboard</Link>
            <Link href="/host/vans/detail">Go van detail</Link>
        </>
    )
}
