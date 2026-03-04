"use client"

import { useEffect,useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function ExpenseList(){

 const [expenses,setExpenses] = useState([])

 useEffect(()=>{
   fetchExpenses()
 },[])

 const fetchExpenses = async()=>{
   const {data} = await supabase
   .from("expenses")
   .select("*")

   setExpenses(data)
 }

 return (
  <div>

   {expenses.map((exp)=>(
     <div
      key={exp.id}
      className="border p-3 flex justify-between"
     >
       <p>{exp.title}</p>
       <p>₹{exp.amount}</p>
       <p>{exp.category}</p>
     </div>
   ))}

  </div>
 )
}