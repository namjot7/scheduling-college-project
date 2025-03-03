"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('admin@gmail.com' || "")
    const [password, setPassword] = useState('0000' || "")

    const verifyUser = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to verify user');
            }
            const data = await response.json();
            // Store user data in localStorage (or use cookies for better security)
            localStorage.setItem('user', JSON.stringify(data));
            console.log(data);
            router.push('/dashboard')

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-n-1 min-h-screen flex-center invert">
            <div className="bg-gray-100 w-4/5 md:w-1/2 lg:w-1/3 px-5 py-10 rounded-lg drop-shadow-lg">
                <div className="">
                    <img alt="NCT Logo" src="./nctLogo-black.png" width={220} className='m-auto' />
                    <h2 className="h1 text-center my-7">
                        Log in
                    </h2>
                </div>
                <form onSubmit={e => verifyUser(e)}>
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="">
                            <input id="email" name="email" type="email" required autoComplete="email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className=""
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Password
                        </label>
                        <input id="password" name="password" type="password" required autoComplete="current-password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className=""
                        />
                        <div className="text-sm mt-1.5">
                            <a href="#" className="btn-link">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary w-full mt-5">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
