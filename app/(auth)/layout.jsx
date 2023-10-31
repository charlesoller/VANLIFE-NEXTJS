import Link from "next/link"

export default function AuthLayout({ children }){
    return (
        <div className="auth__container">
            {children}
        </div>
    )
}
