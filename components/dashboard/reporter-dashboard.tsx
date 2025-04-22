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
import { FileText, Plus, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export function ReporterDashboard() {
  const { user } = useAuth();

  const articles = [
    {
      id: 1,
      title: "New Breakthrough in Renewable Energy Storage",
      date: "2 days ago",
      status: "Verified",
      views: 1248,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Local Community Launches Environmental Initiative",
      date: "1 week ago",
      status: "Under Review",
      views: 567,
      rating: 0,
    },
    {
      id: 3,
      title: "Tech Conference Highlights Future Innovations",
      date: "2 weeks ago",
      status: "Rejected",
      views: 324,
      rating: 2.1,
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
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Verification Rate:{" "}
                <span className="font-medium">
                  {user?.stats.articlesSubmitted && user?.stats.articlesVerified
                    ? Math.round(
                        (user.stats.articlesVerified /
                          user.stats.articlesSubmitted) *
                          100
                      )
                    : 0}
                  %
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
          <CardTitle>Reporter Stats</CardTitle>
          <CardDescription>Your reporting activity and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Total Articles:{" "}
                <span className="font-medium">
                  {user?.stats.articlesSubmitted || 0}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Verified Articles:{" "}
                <span className="font-medium">
                  {user?.stats.articlesVerified || 0}
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

      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Your Articles</CardTitle>
            <CardDescription>
              Manage your submitted news articles
            </CardDescription>
          </div>
          <Link href="/dashboard/submit">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="grid gap-1">
                  <Link
                    href={`/news/${article.id}`}
                    className="font-medium hover:underline"
                  >
                    {article.title}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Submitted {article.date}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Views:</span>{" "}
                    {article.views}
                  </div>
                  {article.rating > 0 && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Rating:</span>{" "}
                      {article.rating}
                    </div>
                  )}
                  <Badge
                    variant={
                      article.status === "Verified"
                        ? "default"
                        : article.status === "Under Review"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/articles" className="w-full">
            <Button variant="outline" className="w-full">
              View All Articles
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
