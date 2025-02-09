"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
    const { data: session } = useSession();

    return (
        <div className="bg-n-1 min-h-screen flex-center">
            <div className="bg-gray-100 w-4/5 md:w-1/2 lg:w-1/3 px-5 py-10 rounded-lg drop-shadow-lg">
                <div className="">
                    <img alt="NCT Logo" src="./nctLogo-black.png" width={250} className='m-auto' />
                    <h2 className="h1 text-center my-7">
                        Sign in
                    </h2>
                </div>
                <form>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <div className="text-sm mt-3">
                            <a href="#" className="btn-link">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary w-full mt-5">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login