"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ValidationsQueuePage() {
  const [filter, setFilter] = useState("all")

  const articles = [
    {
      id: 1,
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      category: "Technology",
      analyzers: 5,
      consensus: "85% True",
      timeLeft: "6 hours",
    },
    {
      id: 2,
      title: "Major Sports Team Announces New Stadium Plans",
      category: "Sports",
      analyzers: 3,
      consensus: "Divided",
      timeLeft: "1 day",
    },
    {
      id: 3,
      title: "Government Passes New Environmental Regulations",
      category: "Politics",
      analyzers: 7,
      consensus: "92% True",
      timeLeft: "2 days",
    },
    {
      id: 4,
      title: "New Medical Treatment Shows Promise in Clinical Trials",
      category: "Health",
      analyzers: 4,
      consensus: "78% True",
      timeLeft: "12 hours",
    },
    {
      id: 5,
      title: "Financial Markets React to Central Bank Announcement",
      category: "Business",
      analyzers: 6,
      consensus: "Divided",
      timeLeft: "8 hours",
    },
    {
      id: 6,
      title: "Award-Winning Film Director Announces New Project",
      category: "Entertainment",
      analyzers: 2,
      consensus: "90% True",
      timeLeft: "3 days",
    },
  ]

  const filteredArticles =
    filter === "all" ? articles : articles.filter((article) => article.category.toLowerCase() === filter.toLowerCase())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Validation Queue</h1>
        <p className="text-muted-foreground">Articles waiting for your validation vote</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Filter Queue</CardTitle>
          <CardDescription>Find specific articles by category, consensus, or title</CardDescription>
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
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by consensus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Consensus</SelectItem>
                  <SelectItem value="strong-true">Strong True (>80%)</SelectItem>
                  <SelectItem value="leaning-true">Leaning True (60-80%)</SelectItem>
                  <SelectItem value="divided">Divided</SelectItem>
                  <SelectItem value="leaning-false">Leaning False (60-80%)</SelectItem>
                  <SelectItem value="strong-false">Strong False (>80%)</SelectItem>
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
                      article.consensus.includes("True")
                        ? "default"
                        : article.consensus === "Divided"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {article.consensus}
                  </Badge>
                </div>
                <Link href={`/validate/${article.id}`} className="group">
                  <h2 className="mb-2 text-xl font-bold group-hover:text-primary group-hover:underline">
                    {article.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{article.analyzers} analyzers contributed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Time left: {article.timeLeft}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t bg-muted/50 p-4 md:border-l md:border-t-0">
                <Link href={`/validate/${article.id}`}>
                  <Button>Validate Now</Button>
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
              ? "There are no articles in the validation queue at the moment."
              : `There are no ${filter} articles in the validation queue.`}
          </p>
          <Button variant="outline" onClick={() => setFilter("all")}>
            View All Articles
          </Button>
        </div>
      )}
    </div>
  )
}
