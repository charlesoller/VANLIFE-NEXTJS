"use client"

import { usePathname } from "next/navigation";
import Link from "next/link"

export default function HostNav(){
    const pathname = usePathname();

    return (
        <nav className="host__nav">
            <Link href="/host" className={pathname === '/host' ? "active-link" : null}>Dashboard</Link>
            <Link href="/host/income" className={pathname.includes('/income') ? "active-link" : null}>Income</Link>
            <Link href="/host/vans" className={pathname.includes('/vans') ? "active-link" : null}>Vans</Link>
            <Link href="/host/reviews" className={pathname.includes('/reviews') ? "active-link" : null}>Reviews</Link>
            <Link href="/host/create-listing" className={pathname.includes('/create-listing') ? "active-link" : null}>Create Listing</Link>
        </nav>
    )
}
