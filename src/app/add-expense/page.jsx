import Navbar from "../../components/Navbar"
import ExpenseForm from "../../components/ExpenseForm"

export default function AddExpense(){

 return(
  <div>

   <Navbar/>

   <div className="p-6">

    <h1 className="text-2xl mb-4">
     Add Expense
    </h1>

    <ExpenseForm/>

   </div>

  </div>
 )
}