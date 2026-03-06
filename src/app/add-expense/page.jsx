"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"

export default function AddExpense(){

const router = useRouter()

const [expenses,setExpenses] = useState([
{ title:"", amount:"", category:"" }
])

const [loading,setLoading] = useState(false)

/* ADD NEW ROW */

const addRow = ()=>{

setExpenses([
...expenses,
{ title:"", amount:"", category:"" }
])

}

/* REMOVE ROW */

const removeRow = (index)=>{

const updated = [...expenses]

updated.splice(index,1)

setExpenses(updated)

}

/* HANDLE INPUT */

const handleChange = (index,field,value)=>{

const updated = [...expenses]

updated[index][field] = value

setExpenses(updated)

}

/* ADD EXPENSES */

const addExpenses = async()=>{

setLoading(true)

const { data:{user} } =
await supabase.auth.getUser()

const formatted =
expenses.map(e=>({
title:e.title,
amount:e.amount,
category:e.category,
user_id:user.id
}))

const { error } =
await supabase
.from("expenses")
.insert(formatted)

setLoading(false)

if(!error){

alert("Expenses added successfully")

router.push("/dashboard")

}else{

alert(error.message)

}

}

return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

<Navbar/>

<div className="flex justify-center py-16 px-6">

<div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl">

<h1 className="text-3xl font-bold mb-8 text-gray-800">
Add Multiple Expenses
</h1>

{expenses.map((expense,index)=>(

<div key={index} className="grid grid-cols-3 gap-4 mb-4">

<input
placeholder="Title"
className="border p-3 rounded-lg"
value={expense.title}
onChange={(e)=>handleChange(index,"title",e.target.value)}
/>

<input
type="number"
placeholder="Amount"
className="border p-3 rounded-lg"
value={expense.amount}
onChange={(e)=>handleChange(index,"amount",e.target.value)}
/>

<select
className="border p-3 rounded-lg"
value={expense.category}
onChange={(e)=>handleChange(index,"category",e.target.value)}

>

<option value="">Category</option>
<option>Food</option>
<option>Travel</option>
<option>Shopping</option>
<option>Bills</option>
<option>Health</option>
<option>Entertainment</option>
<option>Other</option>

</select>

<button
onClick={()=>removeRow(index)}
className="text-red-500 text-sm mt-1"

>

Remove </button>

</div>

))}

<button
onClick={addRow}
className="bg-gray-200 px-4 py-2 rounded-lg mb-6"

>

* Add Another Expense

  </button>

<button
onClick={addExpenses}
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg"

>

{loading ? "Saving..." : "Save All Expenses"}

</button>

</div>

</div>

</div>

)

}
