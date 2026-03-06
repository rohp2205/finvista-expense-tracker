"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"

import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

import { motion } from "framer-motion"

import Navbar from "../../components/Navbar"
import ExpenseList from "../../components/ExpenseList"
import ExpenseChart from "../../components/ExpenseChart"
import MonthlyChart from "../../components/MonthlyChart"
import BudgetAlert from "../../components/BudgetAlert"
import DashboardHeader from "../../components/DashboardHeader"
import Footer from "../../components/Footer"

export default function Dashboard(){

const router = useRouter()

const [expenses,setExpenses] = useState([])
const [loading,setLoading] = useState(true)

/* ---------------- AUTH CHECK ---------------- */

useEffect(()=>{
checkUser()
},[])

const checkUser = async ()=>{

const { data:{session} } =
await supabase.auth.getSession()

if(!session){

router.push("/login")

}else{

await fetchExpenses()
setLoading(false)

}

}

/* ---------------- FETCH EXPENSES ---------------- */

const fetchExpenses = async ()=>{

const { data:{user} } =
await supabase.auth.getUser()

const { data,error } =
await supabase
.from("expenses")
.select("*")
.eq("user_id",user.id)
.order("created_at",{ascending:false})

if(!error){

setExpenses(data)

}

}

/* ---------------- EXPORT EXCEL ---------------- */

const exportExcel = ()=>{

if(expenses.length === 0) return

const worksheet =
XLSX.utils.json_to_sheet(expenses)

const workbook =
XLSX.utils.book_new()

XLSX.utils.book_append_sheet(
workbook,
worksheet,
"Expenses"
)

const excelBuffer =
XLSX.write(workbook,{
bookType:"xlsx",
type:"array"
})

const file =
new Blob([excelBuffer])

saveAs(
file,
`finvista-expenses-${Date.now()}.xlsx`
)

}

/* ---------------- AI INSIGHTS ---------------- */

const getInsights = ()=>{

if(expenses.length === 0)
return "No expenses recorded yet."

const total =
expenses.reduce(
(sum,e)=> sum + Number(e.amount),0
)

const avg =
total / expenses.length

if(avg > 1000)
return "⚠ Your average spending is high. Consider reducing non-essential expenses."

if(avg > 500)
return "💡 Moderate spending detected. Monitor categories carefully."

return "✅ Great! Your spending is well controlled."

}

/* ---------------- LOADING SCREEN ---------------- */

if(loading){

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">

<div className="flex flex-col items-center">

<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

<p className="text-lg font-medium text-gray-700">
Loading your dashboard...
</p>

</div>

</div>

)

}

/* ---------------- STATS ---------------- */

const totalExpense =
expenses.reduce(
(sum,e)=> sum + Number(e.amount),0
)

const averageExpense =
expenses.length
? (totalExpense / expenses.length).toFixed(2)
: 0

/* ---------------- UI ---------------- */

return(

<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

<Navbar/>

<div className="max-w-7xl mx-auto px-8 py-10">

{/* HEADER */}

<DashboardHeader/>

{/* BUDGET ALERT */}

<BudgetAlert expenses={expenses}/>

{/* KPI CARDS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-l-4 border-blue-500">

<p className="text-gray-500 text-sm">
Total Expense
</p>

<h2 className="text-3xl font-bold text-blue-600 mt-2">
₹{totalExpense}
</h2>

</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-l-4 border-green-500">

<p className="text-gray-500 text-sm">
Transactions
</p>

<h2 className="text-3xl font-bold text-green-600 mt-2">
{expenses.length}
</h2>

</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-l-4 border-purple-500">

<p className="text-gray-500 text-sm">
Average Expense
</p>

<h2 className="text-3xl font-bold text-purple-600 mt-2">
₹{averageExpense}
</h2>

</div>

</div>

{/* AI INSIGHTS */}

<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-lg font-semibold mb-2">
AI Spending Insight
</h2>

<p className="text-gray-600">
{getInsights()}
</p>

</div>

{/* EXPORT BUTTON */}

<button
onClick={exportExcel}
className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow mb-8 transition"

>

Export Excel </button>

{/* ANALYTICS */}

<div className="grid md:grid-cols-2 gap-8 mb-10">

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
className="bg-white p-6 rounded-xl shadow hover:shadow-xl"

>

<h2 className="text-lg font-semibold mb-4 text-gray-700">
Category Insights
</h2>

<ExpenseChart expenses={expenses}/>

</motion.div>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="bg-white p-6 rounded-xl shadow hover:shadow-xl"

>

<h2 className="text-lg font-semibold mb-4 text-gray-700">
Monthly Trend
</h2>

<MonthlyChart expenses={expenses}/>

</motion.div>

</div>

{/* EXPENSE TABLE */}

<div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

<h2 className="text-lg font-semibold mb-4 text-gray-700">
Recent Expenses
</h2>

<ExpenseList expenses={expenses}/>

</div>

</div>

<Footer/>

</div>

)

}
