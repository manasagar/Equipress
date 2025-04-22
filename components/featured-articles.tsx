import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, MessageSquare, Clock } from "lucide-react"

export function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "New Breakthrough in Renewable Energy Storage",
      description:
        "Scientists have developed a new method for storing renewable energy that could revolutionize the industry.",
      author: "Alex Johnson",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorInitials: "AJ",
      date: "2 hours ago",
      category: "Science",
      status: "Verified",
      upvotes: 128,
      downvotes: 12,
      comments: 34,
    },
    {
      id: 2,
      title: "Global Economic Forum Announces New Climate Initiative",
      description:
        "World leaders have agreed on a new framework to address climate change at the latest economic summit.",
      author: "Maria Rodriguez",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorInitials: "MR",
      date: "5 hours ago",
      category: "Politics",
      status: "Under Review",
      upvotes: 87,
      downvotes: 23,
      comments: 41,
    },
    {
      id: 3,
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      description: "The new AI system can understand and respond to complex human emotions and needs.",
      author: "David Chen",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorInitials: "DC",
      date: "Yesterday",
      category: "Technology",
      status: "Verified",
      upvotes: 215,
      downvotes: 18,
      comments: 76,
    },
  ]

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
          <p className="text-muted-foreground">The latest verified news from our community</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/news/${article.id}`} key={article.id} className="group">
              <Card className="h-full overflow-hidden transition-all hover:border-primary">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={article.status === "Verified" ? "default" : "outline"}>{article.status}</Badge>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 mt-2 text-xl group-hover:text-primary">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={article.authorAvatar} alt={article.author} />
                      <AvatarFallback>{article.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{article.author}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {article.date}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">{article.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">{article.downvotes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">{article.comments}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/news">
            <Button variant="outline">View All Articles</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
