import Link from 'next/link'
import Image from 'next/image'
import logo from "../../public/static/vanlife_logo.png"

export default function NavBar(){
    return (
        <header className="header">
            <Link href="/">
                <Image className="header__logo" src={logo} alt="The text logo of #VANLIFE in bolded, capitalized letters." />
            </Link>
            <nav className="header__nav">
                <Link href="/about">About</Link>
                <Link href="/vans">Vans</Link>
                <Link href="/host">Host</Link>
            </nav>
        </header>
    )
}
