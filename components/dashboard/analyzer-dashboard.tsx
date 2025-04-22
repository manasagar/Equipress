"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export function AnalyzerDashboard() {
  const { user } = useAuth();

  const pendingArticles = [
    {
      id: 1,
      title: "Global Economic Forum Announces New Climate Initiative",
      category: "Politics",
      timeEstimate: "15 min",
      deadline: "12 hours",
      priority: "High",
    },
    {
      id: 2,
      title: "New Study Reveals Benefits of Mediterranean Diet",
      category: "Health",
      timeEstimate: "10 min",
      deadline: "1 day",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Space Agency Announces Plans for New Mission",
      category: "Science",
      timeEstimate: "20 min",
      deadline: "2 days",
      priority: "Low",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Reputation & Earnings</CardTitle>
          <CardDescription>Your current standing and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Credibility Score:{" "}
                <span className="font-medium">
                  {user?.credibilityScore || 0}/100
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Accuracy Score:{" "}
                <span className="font-medium">
                  {user?.stats.accuracyScore || 0}/100
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Earnings</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Earned:</span>
                <span className="font-medium">
                  {user?.earnings.total || 0} ETH
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm">Pending:</span>
                <span className="font-medium">
                  {user?.earnings.pending || 0} ETH
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/stats" className="w-full">
            <Button variant="outline" className="w-full">
              View Detailed Stats
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Analyzer Stats</CardTitle>
          <CardDescription>Your analysis activity and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Articles Analyzed:{" "}
                <span className="font-medium">
                  {user?.stats.articlesAnalyzed || 0}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Avg. Response Time:{" "}
                <span className="font-medium">
                  {user?.stats.responseTime || "N/A"}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Expertise Areas</h4>
              <div className="flex flex-wrap gap-2">
                {user?.expertiseAreas?.map((area) => (
                  <Badge key={area} variant="outline">
                    {area}
                  </Badge>
                )) || (
                  <span className="text-sm text-muted-foreground">
                    No expertise areas specified
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Pending Analysis</CardTitle>
          <CardDescription>
            Articles waiting for your expert analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {pendingArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="grid gap-1">
                  <Link
                    href={`/analyze/${article.id}`}
                    className="font-medium hover:underline"
                  >
                    {article.title}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{article.category}</Badge>
                    <span>Est. time: {article.timeEstimate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Due in:</span>{" "}
                    {article.deadline}
                  </div>
                  <Badge
                    variant={
                      article.priority === "High"
                        ? "destructive"
                        : article.priority === "Medium"
                        ? "default"
                        : "outline"
                    }
                  >
                    {article.priority}
                  </Badge>
                  <Link href={`/analyze/${article.id}`}>
                    <Button size="sm">Analyze</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/queue" className="w-full">
            <Button variant="outline" className="w-full">
              View Full Queue
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
