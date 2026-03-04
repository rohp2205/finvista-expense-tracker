"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold">FinVista</h1>

      <div className="flex gap-6">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/add-expense">Add Expense</Link>
      </div>
    </div>
  )
}