"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import logo from "../../public/static/vanlife_logo.png"

export default function NavBar(){
    const pathname = usePathname();
    return (
        <header className="header">
            <Link href="/">
                <Image className="header__logo" src={logo} alt="The text logo of #VANLIFE in bolded, capitalized letters." />
            </Link>
            <nav className="header__nav">
                <Link href="/about" className={pathname.startsWith('/about') ? "active-link" : null}>About</Link>
                <Link href="/vans" className={pathname.startsWith('/vans') ? "active-link" : null}>Vans</Link>
                <Link href="/host" className={pathname.startsWith('/host') ? "active-link" : null}>Host</Link>
            </nav>
        </header>
    )
}
