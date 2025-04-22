"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Loader2, Calendar, User, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // In a real app, this would be an API call
        const response = await import("@/data/articles.json")
        const articlesData = response.default
        const foundArticle = articlesData.find((a: any) => a.id === params.id)

        if (foundArticle) {
          setArticle(foundArticle)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching article:", error)
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-bold">Article Not Found</h2>
          <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/news">Back to News</a>
          </Button>
        </div>
      </div>
    )
  }

  // Handle author which could be either a string or an object
  const authorName = typeof article.author === "object" ? article.author.name : article.author
  const authorInitials = authorName ? authorName.substring(0, 2).toUpperCase() : "AU"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{article.category}</Badge>
          <Badge variant={article.status === "Verified" ? "default" : "outline"}>{article.status}</Badge>
          {article.verificationScore >= 90 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> High Credibility
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
        <img src={article.image || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="prose max-w-none">
            {article.content.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="verification">
            <TabsList className="w-full">
              <TabsTrigger value="verification" className="flex-1">
                Verification
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex-1">
                Sources
              </TabsTrigger>
            </TabsList>
            <TabsContent value="verification" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" /> Fact Checks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {article.factChecks.map((check: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="font-medium">"{check.claim}"</div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            check.verdict === "Confirmed"
                              ? "default"
                              : check.verdict === "Partially Confirmed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {check.verdict}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{check.evidence}</p>
                      {index < article.factChecks.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-primary" /> Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {article.sources.map((source: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="font-medium">{source.name}</div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {source.url}
                      </a>
                      {index < article.sources.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> About the Author
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{authorInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{authorName}</div>
                  <div className="text-sm text-muted-foreground">
                    {typeof article.author === "object" && article.author.bio
                      ? article.author.bio
                      : "Equipress verified contributor"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
