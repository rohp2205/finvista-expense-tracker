"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ExpenseChart({expenses}){

 const categories = {}

 expenses.forEach(e=>{
   categories[e.category] =
   (categories[e.category] || 0) + Number(e.amount)
 })

 const data = {
  labels:Object.keys(categories),
  datasets:[
   {
    data:Object.values(categories)
   }
  ]
 }

 return (
  <div className="w-96">
   <Pie data={data}/>
  </div>
 )
}