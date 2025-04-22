"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleCard } from "@/components/article-card"
import { Loader2, Search, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [statusFilter, setStatusFilter] = useState<string[]>(["Verified", "Under Review"])
  const [articles, setArticles] = useState<any[]>([])
  const [filteredArticles, setFilteredArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])

  useEffect(() => {
    // Fetch articles from JSON
    const fetchArticles = async () => {
      try {
        // In a real app, this would be an API call
        const response = await import("@/data/articles.json")
        const articlesData = response.default
        setArticles(articlesData)

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(articlesData.map((article: any) => article.category))]
        setCategories(uniqueCategories)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching articles:", error)
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    // Filter articles based on search query, category, and status
    let filtered = [...articles]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((article) => {
        const authorName = typeof article.author === "object" ? article.author.name : article.author
        return (
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          authorName.toLowerCase().includes(query)
        )
      })
    }

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((article) => article.category === activeCategory)
    }

    // Filter by status
    if (statusFilter.length > 0 && statusFilter.length < 2) {
      filtered = filtered.filter((article) => statusFilter.includes(article.status))
    }

    setFilteredArticles(filtered)
  }, [searchQuery, activeCategory, statusFilter, articles])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">News Articles</h1>
        <p className="text-muted-foreground">Browse and verify the latest news articles</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("Verified")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "Verified"])
                  } else {
                    setStatusFilter(statusFilter.filter((status) => status !== "Verified"))
                  }
                }}
              >
                Verified
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("Under Review")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "Under Review"])
                  } else {
                    setStatusFilter(statusFilter.filter((status) => status !== "Under Review"))
                  }
                }}
              >
                Under Review
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="All" onValueChange={setActiveCategory}>
        <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-2">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            {filteredArticles.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="mb-2 text-lg font-medium">No articles found</p>
                  <p className="text-center text-muted-foreground">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
