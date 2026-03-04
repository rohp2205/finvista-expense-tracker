"use client"

import Navbar from "../../components/Navbar"
import ExpenseList from "../../components/ExpenseList"

export default function Dashboard(){

 return(
  <div>

   <Navbar/>

   <div className="p-6">

    <h1 className="text-2xl font-bold mb-4">
     Expense Dashboard
    </h1>

    <ExpenseList/>

   </div>

  </div>
 )
}