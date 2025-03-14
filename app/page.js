// "use client"
// import Link from "next/link";

// export default function Home() {

//   return (
//     <div className="z-10 relative h-screen  w-screen flex flex-col gap-6 justify-center items-center bg-gray-100 text-white">

//       <div className="-z-10 absolute top-0 left-0 blur-[2.5px] h-full w-full">
//         <img className="h-full w-full" src="./homebg.jpeg" alt="Niagara College Toronto Mirvish campus" />
//       </div>

//       <h1 className="h1 !text-5xl">Welcome to NCT Scheduling Hub</h1>
//       <Link href="/login" className="btn-primary">
//         Login
//       </Link>
//       {/* <a href='/dashboard' className="btn-primary">Dashboard</a>
//       <a href='/instructors' className="btn-primary">instructors</a>
//       <a href='/roombook' className="btn-primary">Room Book</a> */}
//     </div>
//   );
// }

"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('admin@gmail.com' || "")
  const [password, setPassword] = useState('0000' || "")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

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
      const data = await response.json();

      if (!response.ok) {
        return alert("Incorrect details. Try again!")
      }
      localStorage.setItem('user', JSON.stringify(data));
      // console.log(data);
      router.push('/dashboard')
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* side image */}
      <div className="h-screen relative w-1/2">
        <img className='object-cover w-full h-full' src="homebg.jpeg" alt="" />
        <h2 className='absolute top-1/2 left-1/2 bg-white px-5 py-3 !text-3xl h1 -translate-x-1/2 -translate-y-1/2 rounded-md'>NCT Scheduling Hub</h2>
      </div>

      {/* Login form */}
      <div className="flex-center  mx-auto w-1/3 drop-shadow-lg m-10">
        <div className="bg-n-1 w-full px-5 py-10 rounded-lg ">
          <div>
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
    </div>
  )
}

export default Login
