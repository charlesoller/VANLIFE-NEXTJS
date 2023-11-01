"use client"

import { useState } from 'react'

export default function AuthForm({ handleSubmit }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form onSubmit={(e) => handleSubmit(e, email, password)} className='login-form'>
            {/* <label> */}
                {/* <span>Email:</span> */}
                <input
                    className="login__email"
                    type="email"
                    placeholder="Email address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            {/* </label> */}
            {/* <label> */}
                {/* <span>Password:</span> */}
                <input
                    className="login__password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            {/* </label> */}
            <button className="login__button">Submit</button>
        </form>
    )
}
