"use client"

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", amount: 2000 },
  { month: "Feb", amount: 4000 },
  { month: "Mar", amount: 3000 },
  { month: "Apr", amount: 5000 },
  { month: "May", amount: 7000 },
  { month: "Jun", amount: 6200 },
]

export default function SpendingChart() {
  return (
    <div className="border rounded-lg p-6 bg-white">

      <div className="mb-6">
        <h3 className="font-semibold text-lg">
          Monthly Spending Trend
        </h3>
        <p className="text-sm text-muted-foreground">
          Expenditure overview for the last 6 months
        </p>
      </div>

      <ChartContainer
        config={{ amount: { label: "Amount" } }}
        className="h-62.5 w-full"
      >

        <LineChart data={chartData}>

          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <ChartTooltip />

          <Line
            dataKey="amount"
            stroke="#0e7a5f"
            strokeWidth={3}
          />

        </LineChart>

      </ChartContainer>

    </div>
  )
}