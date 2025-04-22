"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, AlertTriangle, Share2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface VoteInterfaceProps {
  articleId: string
  articleTitle: string
}

export function VoteInterface({ articleId, articleTitle }: VoteInterfaceProps) {
  const { isAuthenticated, user } = useAuth()
  const [voteStatus, setVoteStatus] = useState<"upvoted" | "downvoted" | null>(null)
  const [upvotes, setUpvotes] = useState(42)
  const [downvotes, setDownvotes] = useState(7)

  const handleUpvote = () => {
    if (!isAuthenticated) return

    if (voteStatus === "upvoted") {
      setVoteStatus(null)
      setUpvotes(upvotes - 1)
    } else {
      setVoteStatus("upvoted")
      setUpvotes(upvotes + 1)
      if (voteStatus === "downvoted") {
        setDownvotes(downvotes - 1)
      }
    }
  }

  const handleDownvote = () => {
    if (!isAuthenticated) return

    if (voteStatus === "downvoted") {
      setVoteStatus(null)
      setDownvotes(downvotes - 1)
    } else {
      setVoteStatus("downvoted")
      setDownvotes(downvotes + 1)
      if (voteStatus === "upvoted") {
        setUpvotes(upvotes - 1)
      }
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: articleTitle,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleReport = () => {
    alert("Thank you for reporting this article. Our team will review it.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Article Feedback</CardTitle>
        <CardDescription>Rate this article's accuracy and credibility</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              variant={voteStatus === "upvoted" ? "default" : "outline"}
              className="flex flex-col gap-1 py-6"
              onClick={handleUpvote}
              disabled={!isAuthenticated}
            >
              <ThumbsUp className="h-6 w-6" />
              <span className="text-xs">Accurate ({upvotes})</span>
            </Button>
            <Button
              variant={voteStatus === "downvoted" ? "default" : "outline"}
              className="flex flex-col gap-1 py-6"
              onClick={handleDownvote}
              disabled={!isAuthenticated}
            >
              <ThumbsDown className="h-6 w-6" />
              <span className="text-xs">Inaccurate ({downvotes})</span>
            </Button>
          </div>

          {!isAuthenticated && (
            <div className="mt-2 text-center text-sm text-muted-foreground">
              <a href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </a>{" "}
              to vote on this article
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm" onClick={handleReport}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report
        </Button>
      </CardFooter>
    </Card>
  )
}
