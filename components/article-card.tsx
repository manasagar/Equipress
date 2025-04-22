import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Article {
  id: string
  title: string
  excerpt: string
  author:
    | {
        name: string
        id: string
      }
    | string
  date: string
  category: string
  status: string
  verificationScore: number
  image: string
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Handle author which could be either a string or an object
  const authorName = typeof article.author === "object" ? article.author.name : article.author
  const authorInitials = authorName ? authorName.substring(0, 2).toUpperCase() : "AU"

  return (
    <Link href={`/news/${article.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img src={article.image || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{article.category}</Badge>
            <Badge variant={article.status === "Verified" ? "default" : "outline"} className="ml-auto">
              {article.status}
            </Badge>
          </div>
          <h3 className="mt-2 line-clamp-2 text-xl font-bold">{article.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{authorName}</span>
          </div>
          <span className="text-xs text-muted-foreground">{article.date}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
