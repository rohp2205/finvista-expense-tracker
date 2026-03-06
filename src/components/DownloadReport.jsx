"use client"

import jsPDF from "jspdf"

export default function DownloadReport({expenses}){

 const downloadPDF = () =>{

  const doc = new jsPDF()

  doc.text("FinVista Expense Report",20,20)

  let y = 40

  expenses.forEach(e=>{
   doc.text(`${e.title} - ₹${e.amount}`,20,y)
   y += 10
  })

  doc.save("expense-report.pdf")

 }

 return(

  <button
   onClick={downloadPDF}
   className="bg-blue-600 text-white p-2 rounded"
  >
   Download Report
  </button>

 )
}