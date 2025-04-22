import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, CheckCircle, Clock, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Activity {
  id: number
  type:
    | "article_submitted"
    | "article_verified"
    | "article_rejected"
    | "analysis_submitted"
    | "validation_submitted"
    | "upvote_received"
    | "downvote_received"
    | "comment_received"
  title: string
  date: string
  link?: string
}

interface ActivityHistoryProps {
  activities: Activity[]
}

export function ActivityHistory({ activities }: ActivityHistoryProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "article_submitted":
      case "article_verified":
      case "article_rejected":
        return <FileText className="h-4 w-4" />
      case "analysis_submitted":
        return <Search className="h-4 w-4" />
      case "validation_submitted":
        return <CheckCircle className="h-4 w-4" />
      case "upvote_received":
        return <ThumbsUp className="h-4 w-4" />
      case "downvote_received":
        return <ThumbsDown className="h-4 w-4" />
      case "comment_received":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityLabel = (type: Activity["type"]) => {
    switch (type) {
      case "article_submitted":
        return "You submitted an article"
      case "article_verified":
        return "Your article was verified"
      case "article_rejected":
        return "Your article was rejected"
      case "analysis_submitted":
        return "You analyzed an article"
      case "validation_submitted":
        return "You validated an article"
      case "upvote_received":
        return "You received an upvote"
      case "downvote_received":
        return "You received a downvote"
      case "comment_received":
        return "You received a comment"
      default:
        return "Activity"
    }
  }

  const getActivityBadge = (type: Activity["type"]) => {
    switch (type) {
      case "article_verified":
      case "upvote_received":
        return <Badge variant="default">+2 Points</Badge>
      case "article_rejected":
      case "downvote_received":
        return <Badge variant="destructive">-1 Point</Badge>
      case "analysis_submitted":
      case "validation_submitted":
        return <Badge variant="outline">+1 Point</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <CardDescription>Your recent actions and events on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{getActivityLabel(activity.type)}</p>
                    {getActivityBadge(activity.type)}
                  </div>
                  {activity.link ? (
                    <Link href={activity.link} className="text-sm text-muted-foreground hover:underline">
                      {activity.title}
                    </Link>
                  ) : (
                    <p className="text-sm text-muted-foreground">{activity.title}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <p className="text-muted-foreground">No activity yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
