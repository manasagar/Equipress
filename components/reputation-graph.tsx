"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

interface ReputationGraphProps {
  data: {
    daily: { date: string; score: number }[]
    weekly: { date: string; score: number }[]
    monthly: { date: string; score: number }[]
  }
}

export function ReputationGraph({ data }: ReputationGraphProps) {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("weekly")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reputation Growth</CardTitle>
          <CardDescription>Track your credibility score over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading graph...</div>
        </CardContent>
      </Card>
    )
  }

  const currentData = data[period as keyof typeof data]
  const maxScore = Math.max(...currentData.map((d) => d.score))
  const minScore = Math.min(...currentData.map((d) => d.score))
  const range = maxScore - minScore

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reputation Growth</CardTitle>
            <CardDescription>Track your credibility score over time</CardDescription>
          </div>
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="800" y2="0" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="75" x2="800" y2="75" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="225" x2="800" y2="225" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="299" x2="800" y2="299" stroke="#e5e7eb" strokeWidth="1" />

            {/* Line chart */}
            <path
              d={currentData
                .map((point, i) => {
                  const x = (i / (currentData.length - 1)) * 800
                  const y = 300 - ((point.score - minScore) / (range || 1)) * 280
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`
                })
                .join(" ")}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />

            {/* Area under the line */}
            <path
              d={
                currentData
                  .map((point, i) => {
                    const x = (i / (currentData.length - 1)) * 800
                    const y = 300 - ((point.score - minScore) / (range || 1)) * 280
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`
                  })
                  .join(" ") + ` L 800 300 L 0 300 Z`
              }
              fill="hsl(var(--primary) / 0.1)"
            />

            {/* Data points */}
            {currentData.map((point, i) => {
              const x = (i / (currentData.length - 1)) * 800
              const y = 300 - ((point.score - minScore) / (range || 1)) * 280
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="hsl(var(--primary))" />
                  <title>{`${point.date}: ${point.score}`}</title>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          {currentData
            .filter((_, i) => i % Math.ceil(currentData.length / 5) === 0 || i === currentData.length - 1)
            .map((point, i) => (
              <div key={i}>{point.date}</div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
