"use client"

import { useState } from "react"

export default function BudgetTracker({expenses}){

 const [budget,setBudget] = useState(0)

 const total =
 expenses.reduce((sum,e)=>sum+Number(e.amount),0)

 const remaining = budget-total

 return(

  <div className="bg-white p-6 rounded shadow">

   <h2 className="text-xl font-semibold mb-4">
    Monthly Budget
   </h2>

   <input
    type="number"
    placeholder="Enter budget"
    className="border p-2 mb-3"
    onChange={(e)=>setBudget(e.target.value)}
   />

   <p>Total Spent: ₹{total}</p>

   <p className={remaining < 0 ? "text-red-600":"text-green-600"}>
    Remaining: ₹{remaining}
   </p>

  </div>

 )
}