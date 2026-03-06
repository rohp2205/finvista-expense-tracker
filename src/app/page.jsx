"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"

export default function Home() {

return (

<main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">

<Navbar />

{/* HERO SECTION */}

<section className="grid md:grid-cols-2 gap-16 items-center px-12 pt-24">

<div>

<h1 className="text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
Smart Expense Tracking
</h1>

<p className="text-gray-600 text-lg mt-6 max-w-xl">
Track expenses, analyze spending habits and gain powerful financial insights with FinVista.
</p>

<div className="flex gap-4 mt-8">

<Link
href="/dashboard"
className="bg-indigo-600 text-white px-7 py-3 rounded-lg shadow-lg hover:scale-105 transition"
>
Open Dashboard
</Link>

<Link
href="/add-expense"
className="bg-green-500 text-white px-7 py-3 rounded-lg shadow-lg hover:scale-105 transition"
>
Add Expense
</Link>

</div>

</div>

{/* HERO IMAGE */}

<div className="relative">

<img
src="https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg"
className="rounded-2xl shadow-2xl"
/>

<div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

</div>

</section>

{/* STATS */}

<section className="grid md:grid-cols-3 gap-8 px-12 mt-28">

<div className="bg-white p-8 rounded-xl shadow text-center">
<h2 className="text-4xl font-bold text-indigo-600">10K+</h2>
<p className="text-gray-500 mt-2">Expenses Tracked</p>
</div>

<div className="bg-white p-8 rounded-xl shadow text-center">
<h2 className="text-4xl font-bold text-indigo-600">5K+</h2>
<p className="text-gray-500 mt-2">Active Users</p>
</div>

<div className="bg-white p-8 rounded-xl shadow text-center">
<h2 className="text-4xl font-bold text-indigo-600">₹2M+</h2>
<p className="text-gray-500 mt-2">Money Managed</p>
</div>

</section>

{/* FEATURES */}

<section className="grid md:grid-cols-3 gap-10 px-12 mt-28">

<div className="bg-white rounded-xl shadow hover:-translate-y-2 transition">

<img
src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
className="rounded-t-xl"
/>

<div className="p-6">
<h2 className="text-xl font-semibold">Expense Tracking</h2>
<p className="text-gray-600 mt-3">
Manage your daily expenses quickly with our clean interface.
</p>
</div>

</div>

<div className="bg-white rounded-xl shadow hover:-translate-y-2 transition">

<img
src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg"
className="rounded-t-xl"
/>

<div className="p-6">
<h2 className="text-xl font-semibold">Financial Insights</h2>
<p className="text-gray-600 mt-3">
Understand your spending with visual charts and analytics.
</p>
</div>

</div>

<div className="bg-white rounded-xl shadow hover:-translate-y-2 transition">

<img
src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
className="rounded-t-xl"
/>

<div className="p-6">
<h2 className="text-xl font-semibold">Smart Budgeting</h2>
<p className="text-gray-600 mt-3">
Stay within budget and receive alerts when spending grows.
</p>
</div>

</div>

</section>

{/* CTA */}

<section className="text-center mt-32">

<h2 className="text-4xl font-bold">
Start Managing Your Finances Today
</h2>

<p className="text-gray-600 mt-4">
Join thousands of users using FinVista.
</p>

<Link
href="/dashboard"
className="inline-block mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg shadow hover:scale-105 transition"
>
Get Started
</Link>

</section>

<Footer />

</main>
)
}
