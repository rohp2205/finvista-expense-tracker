"use client"

export default function AIInsights({ expenses }){

if(expenses.length === 0){

return(

<div className="bg-white p-6 rounded-xl shadow mb-6">

<h2 className="text-lg font-semibold mb-2">
AI Spending Insight
</h2>

<p className="text-gray-600">
No expenses recorded yet.
</p>

</div>

)

}

const total =
expenses.reduce((sum,e)=>sum+Number(e.amount),0)

const avg =
total / expenses.length

let message = ""

if(avg > 1000){

message =
"⚠ Your average spending is high. Consider reducing unnecessary purchases."

}else if(avg > 500){

message =
"💡 Moderate spending detected. Track categories carefully."

}else{

message =
"✅ Great! Your spending is well controlled."

}

return(

<div className="bg-white p-6 rounded-xl shadow mb-6">

<h2 className="text-lg font-semibold mb-2">
AI Spending Insight
</h2>

<p className="text-gray-700">
{message}
</p>

</div>

)

}
