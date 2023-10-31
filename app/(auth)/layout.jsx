import Link from "next/link"

export default function AuthLayout({ children }){
    return (
        <div>
            <nav>
                <h1>Van Life</h1>
                <Link href="/signup">Sign up</Link>
                <Link href="/login">Log in</Link>
            </nav>
            {children}
        </div>
    )
}
