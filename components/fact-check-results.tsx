import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"

interface FactCheckResultsProps {
  results: {
    score: number
    confidence: number
    flaggedClaims: {
      text: string
      veracity: string
      sources: string[]
    }[]
    suggestedSources: {
      title: string
      url: string
    }[]
  }
}

export function FactCheckResults({ results }: FactCheckResultsProps) {
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fact Check Results</CardTitle>
          <CardDescription>AI-powered analysis of your article's factual accuracy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium">Factual Accuracy Score</h3>
              <div className="flex items-center gap-2">
                <span className={`text-4xl font-bold ${getScoreColor(results.score)}`}>{results.score}%</span>
                <div className="text-sm text-muted-foreground">
                  <div>Confidence: {results.confidence}%</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      results.score >= 80 ? "bg-green-500" : results.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${results.score}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 text-sm">
                {results.score >= 80 ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <span>This article appears to be highly factual</span>
                  </div>
                ) : results.score >= 60 ? (
                  <div className="flex items-center gap-2 text-yellow-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Some claims may need additional verification</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Significant factual issues detected</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Recommendations</h3>
              <ul className="space-y-2 text-sm">
                {results.score < 80 && (
                  <li className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                    <span>Review flagged claims and consider adding more reliable sources</span>
                  </li>
                )}
                {results.score < 60 && (
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
                    <span>Significant revisions recommended before submission</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                  <span>Consider adding the suggested sources to strengthen your article</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claim Analysis</CardTitle>
          <CardDescription>Detailed analysis of specific claims in your article</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.flaggedClaims.map((claim, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">Claim {index + 1}</h4>
                  <Badge
                    variant={claim.veracity === "supported" ? "default" : "outline"}
                    className={claim.veracity === "supported" ? "bg-green-500" : "text-yellow-500"}
                  >
                    {claim.veracity === "supported" ? "Supported" : "Questionable"}
                  </Badge>
                </div>
                <p className="mb-3 text-sm">{claim.text}</p>
                {claim.sources.length > 0 && (
                  <div>
                    <h5 className="mb-1 text-xs font-medium text-muted-foreground">Related Sources:</h5>
                    <ul className="space-y-1">
                      {claim.sources.map((source, sourceIndex) => (
                        <li key={sourceIndex} className="text-xs text-blue-500 hover:underline">
                          <a href={source} target="_blank" rel="noopener noreferrer">
                            {source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggested Sources</CardTitle>
          <CardDescription>Additional sources that may strengthen your article</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.suggestedSources.map((source, index) => (
              <li key={index}>
                <a href={source.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
