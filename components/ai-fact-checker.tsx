"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  ExternalLink,
  Search,
  Info,
} from "lucide-react";

export function AIFactChecker() {
  const [claimText, setClaimText] = useState("");
  const [articleText, setArticleText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("claim");
  const [results, setResults] = useState<any>(null);

  const analyzeClaim = async () => {
    if (!claimText.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    // Simulate API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock response from AI fact-checking service
    const mockResults = {
      veracity:
        Math.random() > 0.7
          ? "true"
          : Math.random() > 0.5
          ? "false"
          : "partially true",
      confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-100
      explanation:
        "Based on our analysis of multiple reliable sources, this claim appears to be " +
        (Math.random() > 0.7
          ? "supported by evidence. Multiple credible sources confirm this information."
          : Math.random() > 0.5
          ? "false. This contradicts information from reliable sources and contains factual errors."
          : "partially true. While some aspects are accurate, other parts are misleading or lack context."),
      sources: [
        {
          title: "Research Study on the Topic",
          url: "https://example.edu/research-paper",
          reliability: "High",
        },
        {
          title: "Official Government Data",
          url: "https://government.gov/official-statistics",
          reliability: "High",
        },
        {
          title: "Expert Analysis",
          url: "https://expert-analysis.org/topic",
          reliability: "Medium",
        },
      ],
      relatedClaims: [
        {
          text: "A related claim that provides additional context",
          veracity: Math.random() > 0.5 ? "true" : "false",
        },
        {
          text: "Another claim that is often mentioned alongside this one",
          veracity: Math.random() > 0.5 ? "true" : "false",
        },
      ],
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const analyzeArticle = async () => {
    if (!articleText.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    // Simulate API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Mock response from AI fact-checking service for article
    const mockResults = {
      overallScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-100
      summary:
        "This article " +
        (Math.random() > 0.7
          ? "presents information that is largely accurate and well-supported by evidence."
          : Math.random() > 0.5
          ? "contains several factual errors and misleading statements that require correction."
          : "mixes accurate information with some misleading or context-lacking statements."),
      claimAnalysis: [
        {
          claim: articleText.split(". ")[0] + ".",
          veracity:
            Math.random() > 0.7
              ? "true"
              : Math.random() > 0.5
              ? "false"
              : "partially true",
          confidence: Math.floor(Math.random() * 20) + 80,
          explanation:
            "This statement is " +
            (Math.random() > 0.6 ? "supported by" : "contradicted by") +
            " evidence.",
        },
        {
          claim:
            articleText.split(". ").length > 1
              ? articleText.split(". ")[1] + "."
              : "",
          veracity:
            Math.random() > 0.7
              ? "true"
              : Math.random() > 0.5
              ? "false"
              : "partially true",
          confidence: Math.floor(Math.random() * 20) + 80,
          explanation:
            "Our analysis indicates this is " +
            (Math.random() > 0.6 ? "accurate based on" : "inconsistent with") +
            " reliable sources.",
        },
        {
          claim:
            articleText.split(". ").length > 2
              ? articleText.split(". ")[2] + "."
              : "",
          veracity:
            Math.random() > 0.7
              ? "true"
              : Math.random() > 0.5
              ? "false"
              : "partially true",
          confidence: Math.floor(Math.random() * 20) + 80,
          explanation:
            "This claim " +
            (Math.random() > 0.6
              ? "aligns with expert consensus"
              : "contradicts expert consensus") +
            " on this topic.",
        },
      ],
      suggestedSources: [
        {
          title: "Comprehensive Research Study",
          url: "https://example.edu/comprehensive-study",
          reliability: "High",
        },
        {
          title: "Official Statistics Database",
          url: "https://statistics.gov/official-data",
          reliability: "High",
        },
        {
          title: "Expert Analysis Report",
          url: "https://expert-institute.org/analysis-report",
          reliability: "Medium",
        },
      ],
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getVeracityColor = (veracity: string) => {
    switch (veracity.toLowerCase()) {
      case "true":
        return "bg-green-500";
      case "false":
        return "bg-red-500";
      case "partially true":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getVeracityIcon = (veracity: string) => {
    switch (veracity.toLowerCase()) {
      case "true":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "false":
        return <X className="h-4 w-4 text-red-500" />;
      case "partially true":
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">AI Fact Checker</h2>
        <p className="text-muted-foreground">
          Leverage artificial intelligence to verify claims and analyze article
          accuracy
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AI-Assisted Verification</AlertTitle>
        <AlertDescription>
          This tool uses machine learning to help with fact-checking. While
          powerful, AI analysis should be used as a supplement to human
          verification, not a replacement.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="claim">Check Claim</TabsTrigger>
          <TabsTrigger value="article">Analyze Article</TabsTrigger>
        </TabsList>
        <TabsContent value="claim">
          <Card>
            <CardHeader>
              <CardTitle>Fact Check a Specific Claim</CardTitle>
              <CardDescription>
                Enter a statement to verify its accuracy against reliable
                sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter a claim to fact-check (e.g., 'Global temperatures have risen by 1.1°C since pre-industrial times')"
                  value={claimText}
                  onChange={(e) => setClaimText(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button
                  onClick={analyzeClaim}
                  disabled={isAnalyzing || !claimText.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Claim
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="mt-6 space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Analyzing claim against multiple sources...
                  </div>
                  <Progress value={45} className="h-2 w-full" />
                </div>
              )}

              {results && activeTab === "claim" && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getVeracityIcon(results.veracity)}
                        <span className="font-medium capitalize">
                          {results.veracity}
                        </span>
                      </div>
                      <Badge variant="outline">
                        Confidence: {results.confidence}%
                      </Badge>
                    </div>
                    <p className="text-sm">{results.explanation}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">Sources</h3>
                    <div className="space-y-2">
                      {results.sources.map((source: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md border p-2"
                        >
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{source.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {source.reliability} Reliability
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">Related Claims</h3>
                    <div className="space-y-2">
                      {results.relatedClaims.map(
                        (claim: any, index: number) => (
                          <div key={index} className="rounded-md border p-2">
                            <div className="flex items-center gap-2">
                              {getVeracityIcon(claim.veracity)}
                              <span className="text-sm">{claim.text}</span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                Powered by Equipress&apos;s machine learning algorithms
              </p>
              {results && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setResults(null)}
                >
                  Clear Results
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="article">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Full Article</CardTitle>
              <CardDescription>
                Submit an entire article to identify factual claims and verify
                their accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste the full text of an article to analyze..."
                  value={articleText}
                  onChange={(e) => setArticleText(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={analyzeArticle}
                    disabled={isAnalyzing || !articleText.trim()}
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze Article
                      </>
                    )}
                  </Button>
                  <Input
                    placeholder="Or enter article URL"
                    className="flex-1"
                  />
                </div>
              </div>

              {isAnalyzing && (
                <div className="mt-6 space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Analyzing article content and extracting claims...
                  </div>
                  <Progress value={65} className="h-2 w-full" />
                </div>
              )}

              {results && activeTab === "article" && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium">Overall Assessment</h3>
                      <Badge variant="outline">
                        Score: {results.overallScore}/100
                      </Badge>
                    </div>
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Accuracy</span>
                        <span>{results.overallScore}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full ${
                            results.overallScore > 80
                              ? "bg-green-500"
                              : results.overallScore > 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${results.overallScore}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm">{results.summary}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">Claim Analysis</h3>
                    <div className="space-y-3">
                      {results.claimAnalysis.map(
                        (claim: any, index: number) => (
                          <div key={index} className="rounded-md border p-3">
                            <div className="mb-2 flex items-center gap-2">
                              <div
                                className={`h-3 w-3 rounded-full ${getVeracityColor(
                                  claim.veracity
                                )}`}
                              ></div>
                              <span className="font-medium">{claim.claim}</span>
                            </div>
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-xs capitalize">
                                {claim.veracity}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                Confidence: {claim.confidence}%
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {claim.explanation}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">
                      Suggested Sources
                    </h3>
                    <div className="space-y-2">
                      {results.suggestedSources.map(
                        (source: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-md border p-2"
                          >
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{source.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {source.reliability} Reliability
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                AI analysis should be verified by human reviewers for accuracy
              </p>
              {results && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setResults(null)}
                >
                  Clear Results
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
