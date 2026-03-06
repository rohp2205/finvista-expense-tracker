"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { clearSupabaseCookies } from "../lib/authCookies"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const avatarRef = useRef(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onClickOutside = (event) => {
      if (menuOpen && avatarRef.current && !avatarRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [menuOpen])

  const logout = async () => {
    await supabase.auth.signOut()
    clearSupabaseCookies()
    router.push("/login")
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Add Expense", href: "/add-expense" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white font-semibold">
            FV
          </span>
          <div className="hidden md:flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              FinVista
            </span>
            <span className="text-xs text-slate-500">Smart expense tracking</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {user &&
            navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={avatarRef}>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                title="Open account menu"
                aria-label="Open account menu"
                className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow hover:bg-indigo-700 transition"
              >
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/add-expense"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Add Expense
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            {user &&
              navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}

            {user ? (
              <button
                onClick={logout}
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
