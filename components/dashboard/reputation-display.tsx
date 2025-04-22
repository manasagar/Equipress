import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award, Star, Clock, CheckCircle, FileText, Search } from "lucide-react"

interface ReputationDisplayProps {
  role: "reporter" | "analyzer" | "validator"
  credibilityScore: number
  level: string
  earnings?: {
    total: number
    pending: number
    currency: string
  }
  stats: {
    articlesSubmitted?: number
    articlesVerified?: number
    analysesCompleted?: number
    validationsCompleted?: number
    consensusRate?: number
    averageRating?: number
    responseTime?: string
  }
}

export function ReputationDisplay({ role, credibilityScore, level, earnings, stats }: ReputationDisplayProps) {
  const getNextLevel = () => {
    switch (level) {
      case "Novice":
        return "Contributor"
      case "Contributor":
        return "Expert"
      case "Expert":
        return "Authority"
      case "Authority":
        return "Master"
      default:
        return "Next Level"
    }
  }

  const getProgressToNextLevel = () => {
    // This is a simplified calculation - in a real app, this would be more complex
    if (credibilityScore < 30) return (credibilityScore / 30) * 100
    if (credibilityScore < 50) return ((credibilityScore - 30) / 20) * 100
    if (credibilityScore < 75) return ((credibilityScore - 50) / 25) * 100
    if (credibilityScore < 90) return ((credibilityScore - 75) / 15) * 100
    return 100
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Reputation & Earnings</CardTitle>
          <Badge variant="outline" className="font-normal">
            {level}
          </Badge>
        </div>
        <CardDescription>Your performance metrics and rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Credibility Score</span>
            <span className="text-sm font-medium">{credibilityScore}/100</span>
          </div>
          <Progress value={credibilityScore} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress to {getNextLevel()}</span>
            <span className="text-sm font-medium">{Math.round(getProgressToNextLevel())}%</span>
          </div>
          <Progress value={getProgressToNextLevel()} className="h-2" />
        </div>

        {earnings && (
          <div className="rounded-lg border p-3">
            <h4 className="mb-2 text-sm font-medium">Earnings</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-muted-foreground">Total Earned</div>
                <div className="text-lg font-bold">
                  {earnings.total} {earnings.currency}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Pending</div>
                <div className="text-lg font-bold">
                  {earnings.pending} {earnings.currency}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Performance Metrics</h4>
          <div className="grid gap-2">
            {role === "reporter" && (
              <>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Articles Submitted</span>
                  </div>
                  <span className="font-medium">{stats.articlesSubmitted}</span>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Verification Rate</span>
                  </div>
                  <span className="font-medium">
                    {stats.articlesVerified && stats.articlesSubmitted
                      ? Math.round((stats.articlesVerified / stats.articlesSubmitted) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </>
            )}

            {role === "analyzer" && (
              <>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Analyses Completed</span>
                  </div>
                  <span className="font-medium">{stats.analysesCompleted}</span>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Average Rating</span>
                  </div>
                  <span className="font-medium">{stats.averageRating}/10</span>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Avg. Response Time</span>
                  </div>
                  <span className="font-medium">{stats.responseTime}</span>
                </div>
              </>
            )}

            {role === "validator" && (
              <>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Validations Completed</span>
                  </div>
                  <span className="font-medium">{stats.validationsCompleted}</span>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Consensus Rate</span>
                  </div>
                  <span className="font-medium">{stats.consensusRate}%</span>
                </div>
              </>
            )}

            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Achievements</span>
              </div>
              <Badge>3 Unlocked</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
