"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Flag, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Comment {
  id: number
  author: {
    name: string
    avatar?: string
    initials: string
  }
  content: string
  date: string
  likes: number
  dislikes: number
  userLiked?: boolean
  userDisliked?: boolean
}

interface CommentsProps {
  articleId: string
}

export function CommentsSection({ articleId }: CommentsProps) {
  const { isAuthenticated, user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      content: "This is a really insightful article. I appreciate the detailed research and balanced perspective.",
      date: "2 days ago",
      likes: 15,
      dislikes: 2,
    },
    {
      id: 2,
      author: {
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SR",
      },
      content:
        "I'm not sure about the claim regarding efficiency rates. The study cited seems to have some methodological issues that weren't addressed here.",
      date: "1 day ago",
      likes: 8,
      dislikes: 3,
    },
    {
      id: 3,
      author: {
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "TK",
      },
      content: "Has anyone found additional sources that confirm these findings? I'd be interested in reading more.",
      date: "12 hours ago",
      likes: 5,
      dislikes: 0,
    },
  ])
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: comments.length + 1,
      author: {
        name: user?.username || "Anonymous User",
        avatar: user?.profileImage || "/placeholder.svg?height=40&width=40",
        initials: user?.username?.substring(0, 2).toUpperCase() || "AU",
      },
      content: newComment,
      date: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleLike = (id: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          if (comment.userLiked) {
            return { ...comment, likes: comment.likes - 1, userLiked: false }
          } else {
            // If the user had disliked, remove the dislike
            const dislikes = comment.userDisliked ? comment.dislikes - 1 : comment.dislikes
            return { ...comment, likes: comment.likes + 1, userLiked: true, dislikes, userDisliked: false }
          }
        }
        return comment
      }),
    )
  }

  const handleDislike = (id: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          if (comment.userDisliked) {
            return { ...comment, dislikes: comment.dislikes - 1, userDisliked: false }
          } else {
            // If the user had liked, remove the like
            const likes = comment.userLiked ? comment.likes - 1 : comment.likes
            return { ...comment, dislikes: comment.dislikes + 1, userDisliked: true, likes, userLiked: false }
          }
        }
        return comment
      }),
    )
  }

  const handleReport = (id: number) => {
    alert(`Comment ${id} reported. Our moderators will review it.`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{comment.author.name}</div>
                    <div className="text-sm text-muted-foreground">{comment.date}</div>
                    <div className="mt-2">{comment.content}</div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleReport(comment.id)}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={comment.userLiked ? "text-primary" : ""}
                  onClick={() => handleLike(comment.id)}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {comment.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={comment.userDisliked ? "text-primary" : ""}
                  onClick={() => handleDislike(comment.id)}
                >
                  <ThumbsDown className="mr-1 h-4 w-4" />
                  {comment.dislikes}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          {isAuthenticated ? (
            <>
              <Textarea
                placeholder="Add your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] w-full"
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </>
          ) : (
            <div className="w-full rounded-lg border border-dashed p-6 text-center">
              <p className="mb-2 text-muted-foreground">You need to be logged in to comment</p>
              <Button asChild>
                <a href="/login">Sign In</a>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
