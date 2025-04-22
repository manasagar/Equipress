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
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export function ValidatorDashboard() {
  const { user } = useAuth();

  const pendingValidations = [
    {
      id: 1,
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      category: "Technology",
      analyzers: 5,
      consensus: "85% True",
      timeLeft: "6 hours",
    },
    {
      id: 2,
      title: "Major Sports Team Announces New Stadium Plans",
      category: "Sports",
      analyzers: 3,
      consensus: "Divided",
      timeLeft: "1 day",
    },
    {
      id: 3,
      title: "Government Passes New Environmental Regulations",
      category: "Politics",
      analyzers: 7,
      consensus: "92% True",
      timeLeft: "2 days",
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
                Consensus Rate:{" "}
                <span className="font-medium">
                  {user?.stats.consensusRate || 0}%
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
          <CardTitle>Impact Statistics</CardTitle>
          <CardDescription>Your influence on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Articles Influenced</h4>
              <div className="text-2xl font-bold">
                {user?.stats.validationsCompleted || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Your votes have helped determine the status of{" "}
                {user?.stats.validationsCompleted || 0} articles
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <h4 className="mb-2 text-sm font-medium">Community Impact</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm">Decisive Votes:</span>
                <span className="font-medium">
                  {user?.stats.validationsCompleted
                    ? Math.round(user.stats.validationsCompleted * 0.34)
                    : 0}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Your vote was the deciding factor in
                {user?.stats.validationsCompleted
                  ? Math.round(user.stats.validationsCompleted * 0.34)
                  : 0}{" "}
                validations
              </p>
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
          <CardTitle>Pending Validations</CardTitle>
          <CardDescription>
            Articles waiting for your validation vote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {pendingValidations.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="grid gap-1">
                  <Link
                    href={`/validate/${article.id}`}
                    className="font-medium hover:underline"
                  >
                    {article.title}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{article.category}</Badge>
                    <span>{article.analyzers} analyzers contributed</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Consensus:</span>{" "}
                    {article.consensus}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Time left:</span>{" "}
                    {article.timeLeft}
                  </div>
                  <Link href={`/validate/${article.id}`}>
                    <Button size="sm">Validate</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/validations" className="w-full">
            <Button variant="outline" className="w-full">
              View All Pending
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
