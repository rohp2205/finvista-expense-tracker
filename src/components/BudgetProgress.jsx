export default function BudgetProgress({ expenses }) {

const monthlyBudget = 10000

const total =
expenses.reduce((sum,e)=>sum+Number(e.amount),0)

const percentage =
Math.min((total/monthlyBudget)*100,100)

return(

  <div className="bg-white p-6 rounded-xl shadow mb-8">

   <h2 className="text-lg font-semibold mb-3">
    Monthly Budget
   </h2>

   <div className="w-full bg-gray-200 rounded-full h-4">

```
<div
 className="bg-indigo-600 h-4 rounded-full"
 style={{width:`${percentage}%`}}
/>
```

   </div>

   <p className="text-sm text-gray-600 mt-2">
    ₹{total} spent of ₹{monthlyBudget}
   </p>

  </div>

)

}
