"use client"

import { usePathname } from "next/navigation";
import Link from "next/link"

export default function HostVanDetailNav({ id }){
    const pathname = usePathname();

    return (
        <nav className='host-van--detail__nav'>
            <Link href={`/host/vans/${id}`} className={pathname === `/host/vans/${id}` ? "active-link" : null} >Details</Link>
            <Link href={`/host/vans/${id}/pricing`} className={pathname.includes('/pricing') ? "active-link" : null}>Pricing</Link>
            <Link href={`/host/vans/${id}/photos`} className={pathname.includes('/photos') ? "active-link" : null}>Photos</Link>
        </nav>
    )
}
