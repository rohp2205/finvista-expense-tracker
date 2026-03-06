"use client"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function MonthlyChart({ expenses }) {

const monthlyTotals = {}

expenses.forEach((e) => {

const date = new Date(e.created_at)

const month = date.toLocaleString("default", { month: "short" })

if (!monthlyTotals[month]) {
monthlyTotals[month] = 0
}

monthlyTotals[month] += Number(e.amount)

})

/* Convert object → array for recharts */

const chartData = Object.keys(monthlyTotals).map((month) => ({
month,
amount: monthlyTotals[month]
}))

return (

<ResponsiveContainer width="100%" height={300}>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="month" />

<YAxis />

<Tooltip />

<Line
type="monotone"
dataKey="amount"
stroke="#4F46E5"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

)

}
