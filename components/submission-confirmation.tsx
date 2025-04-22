"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SubmissionConfirmationProps {
  articleId: string | number
  onClose: () => void
}

export function SubmissionConfirmation({ articleId, onClose }: SubmissionConfirmationProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Article Submitted Successfully!</CardTitle>
        <CardDescription>Your article has been submitted for verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="mb-2">What happens next?</p>
          <ol className="ml-4 list-decimal space-y-1">
            <li>Analyzers will review your article for accuracy and quality</li>
            <li>Validators will vote on the truthfulness of your content</li>
            <li>You'll receive notifications as your article progresses through verification</li>
            <li>Once verified, your article will be published to the news feed</li>
          </ol>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>Article ID: {articleId}</p>
          <p>Estimated verification time: 24-48 hours</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Submit Another
        </Button>
        <Link href={`/news/${articleId}`}>
          <Button className="gap-2">
            View Article <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
