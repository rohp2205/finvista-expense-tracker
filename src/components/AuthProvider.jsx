"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { setSupabaseCookies, clearSupabaseCookies } from "../lib/authCookies"

export default function AuthProvider({ children }) {

 const [session, setSession] = useState(null)

 useEffect(() => {

  supabase.auth.getSession().then(({ data }) => {
   setSession(data.session)
   if (data.session) setSupabaseCookies(data.session)
  })

  const { data: listener } =
   supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
    if (session) {
     setSupabaseCookies(session)
    } else {
     clearSupabaseCookies()
    }
   })

  return () => {
   listener.subscription.unsubscribe()
  }

 }, [])

 if (session === undefined) return null

 return children
}