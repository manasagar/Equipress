"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Plus, Clock, Eye, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function ArticlesPage() {
  const [filter, setFilter] = useState("all")

  const articles = [
    {
      id: 1,
      title: "New Breakthrough in Renewable Energy Storage",
      date: "2 days ago",
      status: "Verified",
      views: 1248,
      rating: 4.8,
      upvotes: 128,
      downvotes: 12,
    },
    {
      id: 2,
      title: "Local Community Launches Environmental Initiative",
      date: "1 week ago",
      status: "Under Review",
      views: 567,
      rating: 0,
      upvotes: 45,
      downvotes: 5,
    },
    {
      id: 3,
      title: "Tech Conference Highlights Future Innovations",
      date: "2 weeks ago",
      status: "Rejected",
      views: 324,
      rating: 2.1,
      upvotes: 18,
      downvotes: 32,
    },
    {
      id: 4,
      title: "New Study Reveals Benefits of Mediterranean Diet",
      date: "3 weeks ago",
      status: "Verified",
      views: 892,
      rating: 4.5,
      upvotes: 76,
      downvotes: 8,
    },
    {
      id: 5,
      title: "Global Economic Trends for the Coming Decade",
      date: "1 month ago",
      status: "Verified",
      views: 1567,
      rating: 4.2,
      upvotes: 112,
      downvotes: 24,
    },
    {
      id: 6,
      title: "The Impact of Social Media on Mental Health",
      date: "1 month ago",
      status: "Under Review",
      views: 423,
      rating: 0,
      upvotes: 35,
      downvotes: 18,
    },
  ]

  const filteredArticles =
    filter === "all" ? articles : articles.filter((article) => article.status.toLowerCase() === filter)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Articles</h1>
          <p className="text-muted-foreground">Manage and track your submitted news articles</p>
        </div>
        <Link href="/dashboard/submit">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Filter Articles</CardTitle>
          <CardDescription>Find specific articles by status, title, or date</CardDescription>
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
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Articles</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
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
                  <Badge
                    variant={
                      article.status === "Verified"
                        ? "default"
                        : article.status === "Under Review"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {article.status}
                  </Badge>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {article.date}
                  </span>
                </div>
                <Link href={`/news/${article.id}`} className="group">
                  <h2 className="mb-2 text-xl font-bold group-hover:text-primary group-hover:underline">
                    {article.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>{article.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span>{article.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                    <span>{article.downvotes}</span>
                  </div>
                  {article.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{article.rating}/5</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t bg-muted/50 p-4 md:border-l md:border-t-0">
                <Link href={`/news/${article.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href={`/dashboard/edit/${article.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 text-lg font-medium">No articles found</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {filter === "all" ? "You haven't submitted any articles yet." : `You don't have any ${filter} articles.`}
          </p>
          <Link href="/dashboard/submit">
            <Button>Submit Your First Article</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
