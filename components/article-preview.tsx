import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ArticlePreviewProps {
  title: string
  content: string
  category: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  factCheckScore?: number
}

export function ArticlePreview({ title, content, category, author, factCheckScore }: ArticlePreviewProps) {
  const now = new Date()
  const formattedDate = formatDistanceToNow(now, { addSuffix: true })

  // Format content with paragraphs
  const formattedContent = content
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "")
    .map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ))

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/50 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                <AvatarFallback>{author.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{author.name}</div>
                <div className="text-xs text-muted-foreground">{formattedDate}</div>
              </div>
            </div>
            <Badge variant="outline">{category}</Badge>
          </div>
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {factCheckScore !== undefined && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Fact Check Score:</span>
                <span
                  className={`text-xs font-medium ${
                    factCheckScore >= 80 ? "text-green-500" : factCheckScore >= 60 ? "text-yellow-500" : "text-red-500"
                  }`}
                >
                  {factCheckScore}%
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="prose max-w-none">{formattedContent}</div>
      </CardContent>
    </Card>
  )
}
