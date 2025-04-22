import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, CheckCircle, Star, Award, Clock, TrendingUp, Eye } from "lucide-react"

interface RoleMetricsProps {
  role: "reporter" | "analyzer" | "validator"
  metrics: {
    reporter?: {
      articlesSubmitted: number
      articlesVerified: number
      verificationRate: number
      averageViews: number
      topCategory: string
    }
    analyzer?: {
      analysesCompleted: number
      averageRating: number
      consensusRate: number
      responseTime: string
      specialtyCategory: string
    }
    validator?: {
      validationsCompleted: number
      consensusRate: number
      validatorRank: string
      decisiveVotes: number
      specialtyCategory: string
    }
  }
}

export function RoleMetrics({ role, metrics }: RoleMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {role === "reporter" && <FileText className="h-5 w-5 text-primary" />}
          {role === "analyzer" && <Search className="h-5 w-5 text-primary" />}
          {role === "validator" && <CheckCircle className="h-5 w-5 text-primary" />}
          {role.charAt(0).toUpperCase() + role.slice(1)} Metrics
        </CardTitle>
        <CardDescription>Your performance statistics for this role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {role === "reporter" && metrics.reporter && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Articles Submitted</span>
                <span className="font-medium">{metrics.reporter.articlesSubmitted}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Rate</span>
                  <span className="font-medium">{metrics.reporter.verificationRate}%</span>
                </div>
                <Progress value={metrics.reporter.verificationRate} className="h-2" />
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Article Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Average Views</span>
                  </div>
                  <span className="font-medium">{metrics.reporter.averageViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Top Category</span>
                  </div>
                  <Badge variant="outline">{metrics.reporter.topCategory}</Badge>
                </div>
              </div>
            </div>
          </>
        )}

        {role === "analyzer" && metrics.analyzer && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Analyses Completed</span>
                <span className="font-medium">{metrics.analyzer.analysesCompleted}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consensus Rate</span>
                  <span className="font-medium">{metrics.analyzer.consensusRate}%</span>
                </div>
                <Progress value={metrics.analyzer.consensusRate} className="h-2" />
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Analysis Quality</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Average Rating</span>
                  </div>
                  <span className="font-medium">{metrics.analyzer.averageRating}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Response Time</span>
                  </div>
                  <span className="font-medium">{metrics.analyzer.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Specialty</span>
                  </div>
                  <Badge variant="outline">{metrics.analyzer.specialtyCategory}</Badge>
                </div>
              </div>
            </div>
          </>
        )}

        {role === "validator" && metrics.validator && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Validations Completed</span>
                <span className="font-medium">{metrics.validator.validationsCompleted}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consensus Rate</span>
                  <span className="font-medium">{metrics.validator.consensusRate}%</span>
                </div>
                <Progress value={metrics.validator.consensusRate} className="h-2" />
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Validation Impact</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Validator Rank</span>
                  </div>
                  <span className="font-medium">{metrics.validator.validatorRank}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Decisive Votes</span>
                  </div>
                  <span className="font-medium">{metrics.validator.decisiveVotes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Specialty</span>
                  </div>
                  <Badge variant="outline">{metrics.validator.specialtyCategory}</Badge>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="rounded-lg bg-muted p-3 text-center text-sm">
          <p>Complete more actions as a {role} to improve your metrics</p>
        </div>
      </CardContent>
    </Card>
  )
}
