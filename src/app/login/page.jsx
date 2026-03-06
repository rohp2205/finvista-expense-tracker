"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { setSupabaseCookies } from "../../lib/authCookies"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [showPassword,setShowPassword] = useState(false)
 const [loading,setLoading] = useState(false)
 const [errorMessage, setErrorMessage] = useState("")

 const loginUser = async () => {

  setLoading(true)
  setErrorMessage("")

  const { data, error } =
  await supabase.auth.signInWithPassword({
   email,
   password
  })

  setLoading(false)

  if(!error){

   setSupabaseCookies(data?.session)
   // Use full navigation to ensure the cookie is sent on the next request.
   window.location.href = "/dashboard"

  } else {

   setErrorMessage(error.message)

  }

 }

 return(

 <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 relative overflow-hidden">


 {/* BACKGROUND BLUR SHAPES */}

 <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-40 top-10 left-10"></div>
 <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-40 bottom-10 right-10"></div>


 <div className="grid md:grid-cols-2 gap-16 items-center w-full max-w-6xl p-10">


 {/* LEFT SIDE */}

 <div className="text-center md:text-left">

 <h1 className="text-6xl font-extrabold text-indigo-600 mb-6">
 FinVista
 </h1>

 <p className="text-gray-600 text-lg max-w-md">

 Smart expense tracking with powerful financial insights,
 budgeting tools and analytics.

 </p>

 <img
 src="https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg"
 className="rounded-xl shadow-xl mt-10"
 />

 </div>


 {/* LOGIN CARD */}

 <div className="bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md">


 <h2 className="text-3xl font-bold mb-6 text-center">
 Login
 </h2>


 {/* EMAIL */}

 <input
 value={email}
 placeholder="Email"
 className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
 onChange={(e)=>setEmail(e.target.value)}
 />


 {/* PASSWORD */}

 <div className="relative">

 <input
 value={password}
 type={showPassword ? "text":"password"}
 placeholder="Password"
 className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
 onChange={(e)=>setPassword(e.target.value)}
 />

 <button
 type="button"
 onClick={()=>setShowPassword(!showPassword)}
 className="absolute right-3 top-3 text-gray-500 text-sm"
 >
 {showPassword ? "Hide":"Show"}
 </button>

 </div>


 {/* LOGIN BUTTON */}

 <button
 onClick={loginUser}
 disabled={loading}
 className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full p-3 rounded-lg shadow-lg"
 >

 {loading ? "Logging in..." : "Login"}

 </button>

 {errorMessage && (
  <p className="text-sm text-red-600 mt-3">
   {errorMessage}
  </p>
 )}


 {/* REGISTER */}

 <p className="text-sm text-center mt-5 text-gray-600">

 Don't have an account?{" "}

 <Link
 href="/register"
 className="text-indigo-600 font-semibold"
 >
 Register
 </Link>

 </p>

 </div>

 </div>

 </div>

 )
}