"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Clock, FileText, MessageSquare, Scale, Shield, ThumbsDown, ThumbsUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Dispute {
  id: string
  articleTitle: string
  articleId: string
  status: "open" | "under_review" | "resolved"
  type: "verification" | "analysis" | "bias"
  initiator: {
    name: string
    avatar: string
    role: string
  }
  respondent: {
    name: string
    avatar: string
    role: string
  }
  dateOpened: string
  lastActivity: string
  description: string
  evidence: string[]
  comments: {
    user: string
    avatar: string
    role: string
    text: string
    timestamp: string
  }[]
  resolution?: {
    outcome: "upheld" | "rejected" | "compromise"
    reason: string
    actionTaken: string
    date: string
  }
}

export function DisputeResolution() {
  const [activeTab, setActiveTab] = useState("open")
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)
  const [showResolutionDialog, setShowResolutionDialog] = useState(false)
  const [resolutionOutcome, setResolutionOutcome] = useState<string | null>(null)
  const [resolutionReason, setResolutionReason] = useState("")
  const [newComment, setNewComment] = useState("")

  // Mock disputes data
  const disputes: Dispute[] = [
    {
      id: "disp-1",
      articleTitle: "New Study Challenges Climate Change Consensus",
      articleId: "art-123",
      status: "open",
      type: "verification",
      initiator: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Reporter",
      },
      respondent: {
        name: "Dr. Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Validator",
      },
      dateOpened: "2023-11-10",
      lastActivity: "2023-11-12",
      description:
        "Dispute regarding the verification outcome. The article was rejected despite providing multiple peer-reviewed sources.",
      evidence: [
        "Link to peer-reviewed study in Nature Climate Change",
        "Statement from lead researcher confirming findings",
        "Data visualization showing correlation between variables",
      ],
      comments: [
        {
          user: "James Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Reporter",
          text: "I've provided three peer-reviewed sources that support the main claims in my article. I believe the rejection was made without properly reviewing these sources.",
          timestamp: "2023-11-10 14:32",
        },
        {
          user: "Dr. Sarah Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Validator",
          text: "The sources were reviewed, but the article draws conclusions that go beyond what the research actually states. The headline is particularly misleading.",
          timestamp: "2023-11-11 09:15",
        },
        {
          user: "James Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Reporter",
          text: "I'm willing to revise the headline and clarify the conclusions, but I don't believe a full rejection is warranted.",
          timestamp: "2023-11-12 11:47",
        },
      ],
    },
    {
      id: "disp-2",
      articleTitle: "Government Announces New Economic Policy",
      articleId: "art-456",
      status: "under_review",
      type: "bias",
      initiator: {
        name: "Elena Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Analyzer",
      },
      respondent: {
        name: "Michael Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Reporter",
      },
      dateOpened: "2023-11-08",
      lastActivity: "2023-11-14",
      description:
        "Dispute regarding political bias in the article. The analysis claims the article presents a one-sided view of the economic policy.",
      evidence: [
        "Comparative analysis with similar articles",
        "Highlighted sections showing potential bias",
        "Expert opinion on balanced reporting standards",
      ],
      comments: [
        {
          user: "Elena Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Analyzer",
          text: "The article only presents the benefits of the policy without addressing any potential drawbacks or criticisms from economists.",
          timestamp: "2023-11-08 16:22",
        },
        {
          user: "Michael Thompson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Reporter",
          text: "The article is focused on reporting the announcement, not analyzing the policy. Critical analysis would be appropriate for a separate piece.",
          timestamp: "2023-11-09 10:05",
        },
        {
          user: "Arbitration Team",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Moderator",
          text: "We're reviewing this dispute and have assigned a neutral third-party expert to evaluate both positions.",
          timestamp: "2023-11-14 14:30",
        },
      ],
    },
    {
      id: "disp-3",
      articleTitle: "Tech Company Launches Revolutionary Product",
      articleId: "art-789",
      status: "resolved",
      type: "analysis",
      initiator: {
        name: "Robert Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Reporter",
      },
      respondent: {
        name: "Alicia Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Analyzer",
      },
      dateOpened: "2023-11-05",
      lastActivity: "2023-11-09",
      description:
        "Dispute regarding technical accuracy in the analysis. The analyzer claimed technical specifications were incorrect.",
      evidence: [
        "Official product documentation",
        "Interview with company CTO",
        "Technical comparison with previous models",
      ],
      comments: [
        {
          user: "Robert Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Reporter",
          text: "The technical specifications in my article were taken directly from the company's press release and verified with their CTO.",
          timestamp: "2023-11-05 15:42",
        },
        {
          user: "Alicia Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Analyzer",
          text: "The press release contained preliminary specs that were updated after publication. The article should reflect the most current information.",
          timestamp: "2023-11-06 11:23",
        },
        {
          user: "Robert Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Reporter",
          text: "I wasn't aware of the updated specifications. I'm happy to update the article with the correct information.",
          timestamp: "2023-11-07 09:15",
        },
      ],
      resolution: {
        outcome: "compromise",
        reason:
          "Both parties agreed that the article should be updated with the correct specifications while noting that the original information was based on preliminary data provided by the company.",
        actionTaken: "Article updated with current specifications and a note about the change was added.",
        date: "2023-11-09",
      },
    },
  ]

  const filteredDisputes = disputes.filter((dispute) => {
    if (activeTab === "open") return dispute.status === "open"
    if (activeTab === "under_review") return dispute.status === "under_review"
    if (activeTab === "resolved") return dispute.status === "resolved"
    return true
  })

  const handleSubmitComment = () => {
    if (!newComment.trim() || !selectedDispute) return

    // In a real app, this would send the comment to an API
    console.log("New comment on dispute", selectedDispute.id, newComment)
    setNewComment("")

    // Mock adding the comment to the UI
    const updatedDispute = {
      ...selectedDispute,
      comments: [
        ...selectedDispute.comments,
        {
          user: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Validator",
          text: newComment,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        },
      ],
      lastActivity: new Date().toISOString().split("T")[0],
    }

    setSelectedDispute(updatedDispute)
  }

  const handleResolveDispute = () => {
    if (!resolutionOutcome || !resolutionReason.trim() || !selectedDispute) return

    // In a real app, this would send the resolution to an API
    console.log("Resolving dispute", selectedDispute.id, resolutionOutcome, resolutionReason)

    // Mock resolving the dispute in the UI
    const resolution = {
      outcome: resolutionOutcome as "upheld" | "rejected" | "compromise",
      reason: resolutionReason,
      actionTaken:
        resolutionOutcome === "upheld"
          ? "Original verification decision reversed."
          : resolutionOutcome === "rejected"
            ? "Original verification decision upheld."
            : "Compromise solution implemented with modifications to the article.",
      date: new Date().toISOString().split("T")[0],
    }

    const updatedDispute = {
      ...selectedDispute,
      status: "resolved" as const,
      resolution,
      lastActivity: new Date().toISOString().split("T")[0],
    }

    setSelectedDispute(updatedDispute)
    setShowResolutionDialog(false)
    setResolutionOutcome(null)
    setResolutionReason("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline">Open</Badge>
      case "under_review":
        return <Badge>Under Review</Badge>
      case "resolved":
        return <Badge variant="secondary">Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "verification":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Verification
          </Badge>
        )
      case "analysis":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Analysis
          </Badge>
        )
      case "bias":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Bias
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Dispute Resolution Center</h2>
        <p className="text-muted-foreground">
          Manage and resolve disputes related to article verification and analysis
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Fair and Transparent Resolution</AlertTitle>
        <AlertDescription>
          All disputes are handled by neutral third-party validators who weren't involved in the original verification
          process. Decisions are made based on evidence and platform guidelines.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="under_review">Under Review</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {filteredDisputes.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Scale className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-center text-sm text-muted-foreground">No disputes found in this category</p>
                </CardContent>
              </Card>
            ) : (
              filteredDisputes.map((dispute) => (
                <Card
                  key={dispute.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedDispute?.id === dispute.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedDispute(dispute)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(dispute.status)}
                      {getTypeBadge(dispute.type)}
                    </div>
                    <CardTitle className="line-clamp-1 text-base">{dispute.articleTitle}</CardTitle>
                    <CardDescription className="line-clamp-2">{dispute.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Opened: {dispute.dateOpened}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{dispute.comments.length} comments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          {selectedDispute ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>{selectedDispute.articleTitle}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedDispute.status)}
                    {getTypeBadge(selectedDispute.type)}
                  </div>
                </div>
                <CardDescription>
                  Dispute opened on {selectedDispute.dateOpened} • Last activity: {selectedDispute.lastActivity}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-sm font-medium">Dispute Description</h3>
                  <p className="text-sm">{selectedDispute.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Initiator</h3>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={selectedDispute.initiator.avatar || "/placeholder.svg"}
                          alt={selectedDispute.initiator.name}
                        />
                        <AvatarFallback>{selectedDispute.initiator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{selectedDispute.initiator.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedDispute.initiator.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Respondent</h3>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={selectedDispute.respondent.avatar || "/placeholder.svg"}
                          alt={selectedDispute.respondent.name}
                        />
                        <AvatarFallback>{selectedDispute.respondent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{selectedDispute.respondent.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedDispute.respondent.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Evidence Provided</h3>
                  <ul className="space-y-2">
                    {selectedDispute.evidence.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedDispute.resolution && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Shield className="h-4 w-4 text-green-600" />
                      Resolution
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Outcome:</span>
                        <Badge
                          variant={
                            selectedDispute.resolution.outcome === "upheld"
                              ? "default"
                              : selectedDispute.resolution.outcome === "rejected"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {selectedDispute.resolution.outcome === "upheld"
                            ? "Dispute Upheld"
                            : selectedDispute.resolution.outcome === "rejected"
                              ? "Dispute Rejected"
                              : "Compromise Reached"}
                        </Badge>
                      </div>
                      <p className="text-sm">{selectedDispute.resolution.reason}</p>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Action Taken:</span> {selectedDispute.resolution.actionTaken}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Date:</span> {selectedDispute.resolution.date}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-4 text-sm font-medium">Discussion</h3>
                  <div className="space-y-4">
                    {selectedDispute.comments.map((comment, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                              <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{comment.user}</span>
                            <Badge variant="outline" className="text-xs">
                              {comment.role}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDispute.status !== "resolved" && (
                  <div className="space-y-4">
                    <Separator />
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Add Comment</h3>
                      <Textarea
                        placeholder="Enter your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => setSelectedDispute(null)}>
                  Back to List
                </Button>
                <div className="flex gap-2">
                  {selectedDispute.status !== "resolved" && (
                    <>
                      <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                        Submit Comment
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setShowResolutionDialog(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Resolve Dispute
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12">
                <Scale className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-medium">No Dispute Selected</h3>
                <p className="text-center text-muted-foreground">
                  Select a dispute from the list to view details and participate in the resolution process
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showResolutionDialog} onOpenChange={setShowResolutionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Dispute</DialogTitle>
            <DialogDescription>
              Your decision will be final and will affect the article's status on the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Resolution Outcome</h4>
              <RadioGroup value={resolutionOutcome || ""} onValueChange={setResolutionOutcome}>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="upheld" id="upheld" />
                  <Label htmlFor="upheld" className="flex items-center gap-2 font-normal">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    Uphold Dispute (Reverse Original Decision)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="rejected" id="rejected" />
                  <Label htmlFor="rejected" className="flex items-center gap-2 font-normal">
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                    Reject Dispute (Maintain Original Decision)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="compromise" id="compromise" />
                  <Label htmlFor="compromise" className="flex items-center gap-2 font-normal">
                    <Scale className="h-4 w-4 text-blue-500" />
                    Compromise Solution
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Explanation & Reasoning</Label>
              <Textarea
                id="reason"
                placeholder="Provide a detailed explanation for your decision..."
                value={resolutionReason}
                onChange={(e) => setResolutionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResolutionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleResolveDispute}
              disabled={!resolutionOutcome || !resolutionReason.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
