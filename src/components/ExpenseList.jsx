"use client"

import { useEffect,useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function ExpenseList(){

const [expenses,setExpenses] = useState([])
const [editId,setEditId] = useState(null)
const [title,setTitle] = useState("")
const [amount,setAmount] = useState("")
const [category,setCategory] = useState("")

useEffect(()=>{
fetchExpenses()
},[])

const fetchExpenses = async()=>{

const {data} =
await supabase
.from("expenses")
.select("*")
.order("id",{ascending:false})

if(data) setExpenses(data)

}

const deleteExpense = async(id)=>{

const confirmDelete = confirm("Delete this expense?")

if(!confirmDelete) return

await supabase
.from("expenses")
.delete()
.eq("id",id)

fetchExpenses()

}

const startEdit = (expense)=>{

setEditId(expense.id)
setTitle(expense.title)
setAmount(expense.amount)
setCategory(expense.category)

}

const updateExpense = async()=>{

await supabase
.from("expenses")
.update({
title,
amount,
category
})
.eq("id",editId)

setEditId(null)
fetchExpenses()

}

return(

<div className="overflow-x-auto">

<table className="w-full border text-left">

<thead className="bg-gray-100">

<tr>

<th className="p-3">Title</th>
<th className="p-3">Amount</th>
<th className="p-3">Category</th>
<th className="p-3">Date</th>
<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{expenses.map((expense)=>{

if(editId===expense.id){

return(

<tr key={expense.id}>

<td className="p-2">
<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-1"
/>
</td>

<td className="p-2">
<input
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="border p-1"
/>
</td>

<td className="p-2">
<input
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-1"
/>
</td>

<td className="p-2">
{expense.created_at?.split("T")[0]}
</td>

<td className="p-2">

<button
onClick={updateExpense}
className="bg-green-500 text-white px-3 py-1 rounded mr-2"

>

Save </button>

<button
onClick={()=>setEditId(null)}
className="bg-gray-400 text-white px-3 py-1 rounded"

>

Cancel </button>

</td>

</tr>

)

}

return(

<tr key={expense.id} className="border-t">

<td className="p-3">{expense.title}</td>

<td className="p-3">₹{expense.amount}</td>

<td className="p-3">{expense.category}</td>

<td className="p-3">
{expense.created_at?.split("T")[0]}
</td>

<td className="p-3 space-x-2">

<button
onClick={()=>startEdit(expense)}
className="bg-blue-500 text-white px-3 py-1 rounded"

>

Edit </button>

<button
onClick={()=>deleteExpense(expense.id)}
className="bg-red-500 text-white px-3 py-1 rounded"

>

Delete </button>

</td>

</tr>

)

})}

</tbody>

</table>

</div>

)

}
