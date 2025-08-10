"use client"

import { useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { Expense } from "@/lib/data"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

export function SpendingChart({ data }: { data: Expense[] }) {
  const chartData = useMemo(() => {
    const categorySpending = data.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categorySpending).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
  }, [data])

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} accessibilityLayer>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
            content={<ChartTooltipContent
              formatter={(value) => `₹${Number(value).toLocaleString()}`}
              indicator="dot"
            />}
          />
          <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
