"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function BudgetAlert({ expenses }){

const [budget,setBudget] = useState(0)
const [input,setInput] = useState("")
const [loading,setLoading] = useState(false)

/* FETCH USER BUDGET */

useEffect(()=>{
fetchBudget()
},[])

const fetchBudget = async()=>{

const { data:{user} } =
await supabase.auth.getUser()

const { data } =
await supabase
.from("budgets")
.select("*")
.eq("user_id",user.id)
.single()

if(data){

setBudget(data.monthly_budget)

}

}

/* SAVE BUDGET */

const saveBudget = async () => {
  setLoading(true)

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from("budgets")
    .upsert({
      user_id: user.id,
      monthly_budget: Number(input),
    })

  if (!error) {
    setBudget(Number(input))
    setInput("")
  }

  setLoading(false)
}

/* CALCULATE SPENDING */

const totalExpense =
expenses.reduce(
(sum,e)=>sum + Number(e.amount),
0
)

const remaining =
budget - totalExpense

return(

<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-lg font-semibold mb-4">
Monthly Budget
</h2>

{budget === 0 ? (

<div className="flex gap-3">

<input
type="number"
placeholder="Enter monthly budget"
className="border p-2 rounded-lg"
value={input}
onChange={(e)=>setInput(e.target.value)}
/>

<button
onClick={saveBudget}
className="bg-indigo-600 text-white px-4 py-2 rounded-lg"

>

{loading ? "Saving..." : "Set Budget"}

</button>

</div>

) : (

<div>

<p className="text-gray-600">
Budget: <b>₹{budget}</b>
</p>

<p className="text-gray-600">
Spent: <b>₹{totalExpense}</b>
</p>

<p className={`font-semibold mt-2 ${
remaining < 0 ? "text-red-500" : "text-green-600"
}`}>

{remaining < 0
? `⚠ Budget exceeded by ₹${Math.abs(remaining)}`
: `Remaining ₹${remaining}`}

</p>

</div>

)}

</div>

)

}
