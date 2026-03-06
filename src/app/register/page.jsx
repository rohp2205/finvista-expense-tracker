"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { setSupabaseCookies } from "../../lib/authCookies"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)
const [loading,setLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState("")

const registerUser = async () => {

setLoading(true)
setErrorMessage("")

const { data, error } =
await supabase.auth.signUp({
email,
password
})

setLoading(false)

if(!error){

if (data?.session) setSupabaseCookies(data.session)
alert("Account created successfully! Please check your email.")

window.location.href = "/login"

}else{

setErrorMessage(error.message)

}

}

const signInWithGoogle = async () => {
 setLoading(true)
 setErrorMessage("")

 const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
   redirectTo: window.location.origin + "/dashboard",
  },
 })

 setLoading(false)

 if (error) {
  setErrorMessage(error.message)
 }
}

const signInWithFacebook = async () => {
 setLoading(true)
 setErrorMessage("")

 const { error } = await supabase.auth.signInWithOAuth({
  provider: "facebook",
  options: {
   redirectTo: window.location.origin + "/dashboard",
  },
 })

 setLoading(false)

 if (error) {
  setErrorMessage(error.message)
 }
}

return(

 <div suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 relative overflow-hidden">

{/* Background Blur Shapes */}

 <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-40 top-10 left-10"></div>
 <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-40 bottom-10 right-10"></div>

 <div className="grid md:grid-cols-2 gap-16 items-center w-full max-w-6xl p-10">

{/* LEFT SIDE INFO */}

 <div className="text-center md:text-left">

 <h1 className="text-6xl font-extrabold text-indigo-600 mb-6">
 FinVista
 </h1>

 <p className="text-gray-600 text-lg max-w-md">

Create an account and start tracking your expenses,
managing budgets and gaining financial insights.

 </p>

{/* FINTECH IMAGE */}

<img
src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
alt="financial analytics"
className="rounded-xl shadow-xl mt-10 hover:scale-105 transition duration-500"
/>

 </div>

{/* REGISTER CARD */}

 <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40">

 <h2 className="text-3xl font-bold mb-2 text-center">
 Create your account
 </h2>

 <p className="text-sm text-gray-600 mb-6 text-center">
 Sign up to start tracking expenses, creating budgets, and getting insights.
 </p>

 {errorMessage && (
  <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 mb-4">
   {errorMessage}
  </div>
 )}

 {/* SOCIAL LOGIN */}

 <div className="space-y-3">
  <button
   onClick={signInWithGoogle}
   disabled={loading}
   className="bg-white border border-gray-200 hover:bg-gray-50 transition text-gray-800 w-full p-3 rounded-lg shadow-sm flex items-center justify-center gap-3"
  >
   <svg
    width="20"
    height="20"
    viewBox="0 0 533.5 544.3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
   >
    <path
     d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95.1h146.9c-6.4 34.7-25.3 64.1-53.9 83.8v69.7h87.2c51.1-47 80.3-116.5 80.3-198.4z"
     fill="#4285F4"
    />
    <path
     d="M272 544.3c72.6 0 133.7-24.1 178.2-65.4l-87.2-69.7c-24.2 16.3-55.5 25.8-91 25.8-69.9 0-129.2-47.2-150.4-110.5H30.8v69.3c44.4 88.3 135.1 150.5 241.2 150.5z"
     fill="#34A853"
    />
    <path
     d="M121.6 323.3c-10.9-32.7-10.9-67.9 0-100.6V153.4H30.8c-38.5 76.9-38.5 169.4 0 246.3l90.8-76.4z"
     fill="#FBBC05"
    />
    <path
     d="M272 107.7c39.6 0 75.2 13.6 103.2 40.3l77.3-77.3C400.6 24 345.2 0 272 0 165.9 0 75.2 62.2 30.8 153.4l90.8 69.3c21.2-63.3 80.5-110.5 150.4-110.5z"
     fill="#EA4335"
    />
   </svg>
   {loading ? "Please wait..." : "Continue with Google"}
  </button>

  <button
   onClick={signInWithFacebook}
   disabled={loading}
   className="bg-blue-600 hover:bg-blue-700 transition text-white w-full p-3 rounded-lg shadow-sm flex items-center justify-center gap-3"
  >
   <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-5 h-5"
   >
    <path d="M12 2.04c0-.48-.4-.85-.86-.85H8.48c-.56 0-1.02.45-1.02 1.01v2.05H5.1c-.48 0-.87.4-.87.88v2.5c0 .48.39.87.87.87h2.36v6.25c0 .54.44.98.98.98h2.95c.54 0 .98-.44.98-.98V8.35h2.27c.48 0 .87-.39.87-.87l.01-2.5c0-.48-.39-.88-.87-.88h-2.28V3.05c0-.47.07-.89.37-1.21z"/>
   </svg>
   {loading ? "Please wait..." : "Continue with Facebook"}
  </button>

  <div className="flex items-center gap-3 mb-4">
   <span className="h-px flex-1 bg-gray-200"></span>
   <span className="text-xs text-gray-500 uppercase tracking-wide">
    or sign up with email
   </span>
   <span className="h-px flex-1 bg-gray-200"></span>
  </div>
 </div>

 {/* EMAIL */}

 <label className="block text-sm font-medium text-gray-700 mb-2">
  Email address
 </label>
 <input
  value={email}
  type="email"
  placeholder="you@example.com"
  autoComplete="email"
  className="border border-gray-200 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
  onChange={(e)=>setEmail(e.target.value)}
 />

 {/* PASSWORD */}

 <label className="block text-sm font-medium text-gray-700 mb-2">
  Password
 </label>
 <div className="relative">

 <input
  value={password}
  type={showPassword ? "text":"password"}
  placeholder="Choose a strong password"
  autoComplete="new-password"
  className="border border-gray-200 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
  onChange={(e)=>setPassword(e.target.value)}
 />

 <button
  type="button"
  onClick={()=>setShowPassword(!showPassword)}
  className="absolute right-3 top-3 text-gray-500 text-sm"
 >
  {showPassword ? "Hide" : "Show"}
 </button>

 </div>

 {/* REGISTER BUTTON */}

 <button
  onClick={registerUser}
  disabled={loading}
  className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full p-3 rounded-lg shadow-lg mt-2"
 >
  {loading ? "Creating Account..." : "Create Account"}
 </button>

 <p className="text-sm text-center mt-5 text-gray-600">
  Already have an account?{" "}
  <Link
   href="/login"
   className="text-indigo-600 font-semibold"
  >
   Login
  </Link>
 </p>

 </div>

 </div>

 </div>

)
}
