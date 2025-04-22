"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, TrendingUp, Users, CheckCircle, Award, ThumbsUp, ThumbsDown, Eye, Clock, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"

export default function StatsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState(user?.role || "reporter")

  useEffect(() => {
    if (user?.role) {
      setActiveTab(user.role)
    }
  }, [user])

  const reporterStats = {
    totalArticles: 12,
    verifiedArticles: 9,
    rejectedArticles: 1,
    pendingArticles: 2,
    totalViews: 8742,
    averageRating: 4.2,
    credibilityScore: 87,
    verificationRate: "75%",
    topArticle: {
      title: "New Breakthrough in Renewable Energy Storage",
      views: 1248,
      upvotes: 128,
      downvotes: 12,
    },
    monthlyGrowth: [
      { month: "Jan", articles: 1 },
      { month: "Feb", articles: 2 },
      { month: "Mar", articles: 1 },
      { month: "Apr", articles: 3 },
      { month: "May", articles: 2 },
      { month: "Jun", articles: 3 },
    ],
    categoryBreakdown: [
      { category: "Technology", count: 5 },
      { category: "Science", count: 3 },
      { category: "Politics", count: 2 },
      { category: "Health", count: 1 },
      { category: "Business", count: 1 },
    ],
    rewardHistory: [
      { month: "Jan", rewards: 120 },
      { month: "Feb", rewards: 180 },
      { month: "Mar", rewards: 150 },
      { month: "Apr", rewards: 210 },
      { month: "May", rewards: 190 },
      { month: "Jun", rewards: 230 },
    ],
  }

  const analyzerStats = {
    articlesAnalyzed: 48,
    accuracyScore: 92,
    averageResponseTime: "4.2 hours",
    consensusRate: "88%",
    totalContributions: 52,
    impactScore: 78,
    specialtyCategories: ["Technology", "Science", "Health"],
    topAnalysis: {
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      rating: 9,
      validatorAgreement: "92%",
    },
    monthlyAnalyses: [
      { month: "Jan", analyses: 6 },
      { month: "Feb", analyses: 8 },
      { month: "Mar", analyses: 7 },
      { month: "Apr", analyses: 10 },
      { month: "May", analyses: 9 },
      { month: "Jun", analyses: 8 },
    ],
    categoryExpertise: [
      { category: "Technology", score: 95 },
      { category: "Science", score: 90 },
      { category: "Health", score: 88 },
      { category: "Politics", score: 82 },
      { category: "Business", score: 80 },
    ],
    rewardHistory: [
      { month: "Jan", rewards: 180 },
      { month: "Feb", rewards: 220 },
      { month: "Mar", rewards: 200 },
      { month: "Apr", rewards: 260 },
      { month: "May", rewards: 240 },
      { month: "Jun", rewards: 280 },
    ],
  }

  const validatorStats = {
    articlesValidated: 124,
    consensusRate: "89%",
    validatorRank: "Top 5%",
    accuracyScore: 94,
    totalVotes: 136,
    impactScore: 82,
    specialtyCategories: ["Politics", "Business", "Technology"],
    topValidation: {
      title: "Global Economic Forum Announces New Climate Initiative",
      consensus: "85% True",
      finalStatus: "Verified",
    },
    monthlyValidations: [
      { month: "Jan", validations: 15 },
      { month: "Feb", validations: 18 },
      { month: "Mar", validations: 22 },
      { month: "Apr", validations: 25 },
      { month: "May", validations: 24 },
      { month: "Jun", validations: 20 },
    ],
    categoryAccuracy: [
      { category: "Politics", accuracy: 92 },
      { category: "Business", accuracy: 94 },
      { category: "Technology", accuracy: 90 },
      { category: "Science", accuracy: 88 },
      { category: "Health", accuracy: 86 },
    ],
    rewardHistory: [
      { month: "Jan", rewards: 250 },
      { month: "Feb", rewards: 280 },
      { month: "Mar", rewards: 320 },
      { month: "Apr", rewards: 350 },
      { month: "May", rewards: 340 },
      { month: "Jun", rewards: 310 },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Performance Statistics</h1>
        <p className="text-muted-foreground">Track your contribution metrics and impact on the platform</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="reporter">
            <FileText className="mr-2 h-4 w-4" />
            Reporter Stats
          </TabsTrigger>
          <TabsTrigger value="analyzer">
            <Search className="mr-2 h-4 w-4" />
            Analyzer Stats
          </TabsTrigger>
          <TabsTrigger value="validator">
            <CheckCircle className="mr-2 h-4 w-4" />
            Validator Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reporter">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reporterStats.totalArticles}</div>
                <p className="text-xs text-muted-foreground">
                  {reporterStats.verifiedArticles} verified, {reporterStats.pendingArticles} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credibility Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reporterStats.credibilityScore}/100</div>
                <p className="text-xs text-muted-foreground">+5 points from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reporterStats.totalViews}</div>
                <p className="text-xs text-muted-foreground">Avg. 728 views per article</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reporterStats.averageRating}/5</div>
                <p className="text-xs text-muted-foreground">Based on analyzer ratings</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Verification Rate</CardTitle>
                <CardDescription>Percentage of your articles that get verified</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Rate</span>
                  <span className="text-sm font-medium">{reporterStats.verificationRate}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: reporterStats.verificationRate }} />
                </div>
                <div className="mt-4 grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">Verified</span>
                    </div>
                    <span className="text-sm">{reporterStats.verifiedArticles} articles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="text-sm">{reporterStats.pendingArticles} articles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-destructive" />
                      <span className="text-sm">Rejected</span>
                    </div>
                    <span className="text-sm">{reporterStats.rejectedArticles} articles</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Article</CardTitle>
                <CardDescription>Your most viewed and highly rated article</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-lg font-medium">{reporterStats.topArticle.title}</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Views</span>
                    </div>
                    <span className="text-sm font-medium">{reporterStats.topArticle.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Upvotes</span>
                    </div>
                    <span className="text-sm font-medium">{reporterStats.topArticle.upvotes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Downvotes</span>
                    </div>
                    <span className="text-sm font-medium">{reporterStats.topArticle.downvotes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Article Submissions</CardTitle>
                <CardDescription>Your article submission activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Chart would go here */}
                  <div className="flex h-full items-end gap-2">
                    {reporterStats.monthlyGrowth.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full bg-primary"
                          style={{
                            height: `${(item.articles / 3) * 100}%`,
                            minHeight: "10%",
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Distribution of your articles by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reporterStats.categoryBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="font-medium">{item.count} articles</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(item.count / reporterStats.totalArticles) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Token Rewards History</CardTitle>
                <CardDescription>Your earned tokens over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Chart would go here */}
                  <div className="flex h-full items-end gap-2">
                    {reporterStats.rewardHistory.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full bg-green-500"
                          style={{
                            height: `${(item.rewards / 230) * 100}%`,
                            minHeight: "10%",
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Rewards Earned</span>
                  <span className="font-bold">1,080 EQP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analyzer">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articles Analyzed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyzerStats.articlesAnalyzed}</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyzerStats.accuracyScore}/100</div>
                <p className="text-xs text-muted-foreground">+3 points from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyzerStats.averageResponseTime}</div>
                <p className="text-xs text-muted-foreground">-0.8 hours from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consensus Rate</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyzerStats.consensusRate}</div>
                <p className="text-xs text-muted-foreground">Agreement with other analyzers</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Expertise</CardTitle>
                <CardDescription>Your analysis accuracy by category</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-4">
                  {analyzerStats.categoryExpertise.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="font-medium">{item.score}% accuracy</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Analysis</CardTitle>
                <CardDescription>Your most impactful article analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-lg font-medium">{analyzerStats.topAnalysis.title}</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Your Rating</span>
                    </div>
                    <span className="text-sm font-medium">{analyzerStats.topAnalysis.rating}/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Validator Agreement</span>
                    </div>
                    <span className="text-sm font-medium">{analyzerStats.topAnalysis.validatorAgreement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Analysis Activity</CardTitle>
                <CardDescription>Your analysis activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Chart would go here */}
                  <div className="flex h-full items-end gap-2">
                    {analyzerStats.monthlyAnalyses.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full bg-primary"
                          style={{
                            height: `${(item.analyses / 10) * 100}%`,
                            minHeight: "10%",
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Token Rewards History</CardTitle>
                <CardDescription>Your earned tokens over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Chart would go here */}
                  <div className="flex h-full items-end gap-2">
                    {analyzerStats.rewardHistory.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full bg-green-500"
                          style={{
                            height: `${(item.rewards / 280) * 100}%`,
                            minHeight: "10%",
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Rewards Earned</span>
                  <span className="font-bold">1,380 EQP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validator">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articles Validated</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{validatorStats.articlesValidated}</div>
                <p className="text-xs text-muted-foreground">+18 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consensus Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{validatorStats.consensusRate}</div>
                <p className="text-xs text-muted-foreground">Agreement with final outcomes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validator Rank</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{validatorStats.validatorRank}</div>
                <p className="text-xs text-muted-foreground">Based on accuracy and volume</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Score</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{validatorStats.accuracyScore}/100</div>
                <p className="text-xs text-muted-foreground">+2 points from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Accuracy</CardTitle>
                <CardDescription>Your validation accuracy by category</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-4">
                  {validatorStats.categoryAccuracy.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="font-medium">{item.accuracy}% accuracy</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${item.accuracy}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Validation</CardTitle>
                <CardDescription>Your most impactful article validation</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-lg font-medium">{validatorStats.topValidation.title}</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Consensus</span>
                    </div>
                    <span className="text-sm font-medium">{validatorStats.topValidation.consensus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Final Status</span>
                    </div>
                    <span className="text-sm font-medium">{validatorStats.topValidation.finalStatus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Validation Activity</CardTitle>
                <CardDescription>Your validation activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Chart would go here */}
                  <div className="flex h-full items-end gap-2">
                    {validatorStats.monthlyValidations.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full bg-primary"
                          style={{
                            height: `${(item.validations / 25) * 100}%`,
                            minHeight: "10%",
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Token Rewards History</CardTitle>
                <CardDescription>Your earned tokens over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Chart would go here */}
                  <div className="flex h-full items-end gap-2">
                    {validatorStats.rewardHistory.map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full bg-green-500"
                          style={{
                            height: `${(item.rewards / 350) * 100}%`,
                            minHeight: "10%",
                          }}
                        />
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Rewards Earned</span>
                  <span className="font-bold">1,850 EQP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
