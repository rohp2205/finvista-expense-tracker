"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function ExpenseForm() {

 const [title,setTitle] = useState("")
 const [amount,setAmount] = useState("")
 const [category,setCategory] = useState("")

 const addExpense = async () => {

   const { error } = await supabase
   .from("expenses")
   .insert([{title,amount,category}])

   if(!error){
     alert("Expense Added")
   }
 }

 return (
  <div className="flex flex-col gap-4 max-w-md">

   <input
    placeholder="Title"
    className="border p-2"
    onChange={(e)=>setTitle(e.target.value)}
   />

   <input
    placeholder="Amount"
    className="border p-2"
    onChange={(e)=>setAmount(e.target.value)}
   />

   <input
    placeholder="Category"
    className="border p-2"
    onChange={(e)=>setCategory(e.target.value)}
   />

   <button
    onClick={addExpense}
    className="bg-blue-600 text-white p-2"
   >
    Add Expense
   </button>

  </div>
 )
}