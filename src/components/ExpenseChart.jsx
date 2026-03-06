"use client"

import {
PieChart,
Pie,
Cell,
Tooltip,
Legend
} from "recharts"

export default function ExpenseChart({ expenses }){

const categoryTotals = {}

expenses.forEach(e=>{

if(!categoryTotals[e.category]){

categoryTotals[e.category] = 0

}

categoryTotals[e.category] += Number(e.amount)

})

const data =
Object.keys(categoryTotals).map(cat=>({

name: cat,
value: categoryTotals[cat]

}))

const COLORS =
["#6366f1","#22c55e","#f59e0b","#ef4444","#06b6d4"]

return(

<PieChart width={400} height={300}>

<Pie
data={data}
dataKey="value"
nameKey="name"
outerRadius={100}

>

{data.map((entry,index)=>(
<Cell
key={index}
fill={COLORS[index % COLORS.length]}
/>
))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

)

}
