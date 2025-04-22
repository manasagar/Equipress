"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AnalysisQueuePage() {
  const [filter, setFilter] = useState("all")

  const articles = [
    {
      id: 1,
      title: "Global Economic Forum Announces New Climate Initiative",
      category: "Politics",
      timeEstimate: "15 min",
      deadline: "12 hours",
      priority: "High",
    },
    {
      id: 2,
      title: "New Study Reveals Benefits of Mediterranean Diet",
      category: "Health",
      timeEstimate: "10 min",
      deadline: "1 day",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Space Agency Announces Plans for New Mission",
      category: "Science",
      timeEstimate: "20 min",
      deadline: "2 days",
      priority: "Low",
    },
    {
      id: 4,
      title: "Major Sports Team Announces New Stadium Plans",
      category: "Sports",
      timeEstimate: "12 min",
      deadline: "1 day",
      priority: "Medium",
    },
    {
      id: 5,
      title: "Tech Startup Secures Record Funding Round",
      category: "Business",
      timeEstimate: "8 min",
      deadline: "6 hours",
      priority: "High",
    },
    {
      id: 6,
      title: "New Film Festival Celebrates Independent Cinema",
      category: "Entertainment",
      timeEstimate: "15 min",
      deadline: "3 days",
      priority: "Low",
    },
  ]

  const filteredArticles =
    filter === "all" ? articles : articles.filter((article) => article.priority.toLowerCase() === filter.toLowerCase())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analysis Queue</h1>
        <p className="text-muted-foreground">Articles waiting for your expert analysis</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Filter Queue</CardTitle>
          <CardDescription>Find specific articles by priority, category, or title</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by title..." className="pl-9" />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge
                    variant={
                      article.priority === "High"
                        ? "destructive"
                        : article.priority === "Medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {article.priority} Priority
                  </Badge>
                </div>
                <Link href={`/analyze/${article.id}`} className="group">
                  <h2 className="mb-2 text-xl font-bold group-hover:text-primary group-hover:underline">
                    {article.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Est. time: {article.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Due in: {article.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t bg-muted/50 p-4 md:border-l md:border-t-0">
                <Link href={`/analyze/${article.id}`}>
                  <Button>Analyze Now</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Search className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 text-lg font-medium">No articles found</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {filter === "all"
              ? "There are no articles in the queue at the moment."
              : `There are no ${filter} priority articles in the queue.`}
          </p>
          <Button variant="outline" onClick={() => setFilter("all")}>
            View All Articles
          </Button>
        </div>
      )}
    </div>
  )
}
