"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, Clock, AlertCircle, Coins } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";

export default function AnalyzePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { translate } = useLanguage();
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTokenReward, setShowTokenReward] = useState(false);
  const [tokenReward, setTokenReward] = useState(0);

  // This would normally fetch the article data based on the ID
  const article = {
    id: params.id,
    title: "Global Economic Forum Announces New Climate Initiative",
    content: `
      <p>World leaders have agreed on a new framework to address climate change at the latest economic summit held in Geneva last week.</p>
      
      <p>The initiative, dubbed "Global Climate Action 2030," aims to reduce carbon emissions by 50% before the end of the decade through a combination of regulatory measures and financial incentives.</p>
      
      <p>"This is a historic moment for international cooperation on climate change," said Emma Rodriguez, the UN Special Envoy for Climate Action. "For the first time, we have a comprehensive framework that balances economic growth with environmental protection."</p>
      
      <p>The agreement includes provisions for carbon pricing, renewable energy subsidies, and a new international fund to help developing nations transition to cleaner energy sources.</p>
      
      <p>Critics, however, have questioned whether the targets are ambitious enough to prevent the worst effects of climate change, and whether enforcement mechanisms are sufficient to ensure compliance.</p>
    `,
    author: "Maria Rodriguez",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorInitials: "MR",
    date: "5 days ago",
    category: "Politics",
    status: "Under Review",
    sources: [
      {
        title: "United Nations Press Release",
        url: "https://www.un.org/press/en/2023/climate-initiative.html",
      },
      {
        title: "Global Economic Forum Official Statement",
        url: "https://www.globaleconomicforum.org/statements/climate2030",
      },
      {
        title: "Interview with Emma Rodriguez",
        url: "https://example.com/interview-rodriguez",
      },
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Calculate token reward based on rating, user reputation, and article complexity
    const baseReward = 5; // Base tokens for analysis
    const qualityMultiplier = rating / 5; // Higher ratings require more effort
    const reputationBonus = user?.credibilityScore
      ? (user.credibilityScore / 100) * 2
      : 1; // Reputation bonus

    const calculatedReward =
      Math.round(baseReward * qualityMultiplier * reputationBonus * 100) / 100;
    setTokenReward(calculatedReward);
    setShowTokenReward(true);
    setIsSubmitting(false);
  };

  const handleClaimReward = () => {
    // In a real app, this would call a smart contract to transfer tokens
    router.push("/dashboard?analyzed=true");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {translate("dashboard")}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <Link
          href="/dashboard/queue"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {translate("analysisQueue")}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm">{translate("analyzeArticle")}</span>
      </div>

      {showTokenReward ? (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              {translate("analysisSubmitted")}
            </CardTitle>
            <CardDescription className="text-center">
              {translate("yourAnalysisHasBeenSubmitted")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Coins className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">{translate("youEarned")}</p>
                <p className="text-3xl font-bold">{tokenReward} ETH</p>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{translate("stakingOpportunity")}</AlertTitle>
                <AlertDescription>
                  {translate("stakeTokensForMoreInfluence")}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button onClick={handleClaimReward} className="w-full">
              {translate("claimReward")}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard/queue")}
            >
              {translate("analyzeAnotherArticle")}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge
                    variant={
                      article.status === "Verified" ? "default" : "outline"
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-2xl">{article.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={article.authorAvatar || "/placeholder.svg"}
                      alt={article.author}
                    />
                    <AvatarFallback>{article.authorInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{article.author}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {article.date}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-medium">
                    {translate("sources")}
                  </h3>
                  <div className="grid gap-2">
                    {article.sources.map((source, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          {source.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{translate("analyzeThisArticle")}</CardTitle>
                <CardDescription>
                  {translate("rateArticleAccuracy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {translate("accuracyRating")} (1-10)
                    </label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[rating]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => setRating(value[0])}
                        className="flex-1"
                      />
                      <span className="w-8 text-center font-bold">
                        {rating}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{translate("inaccurate")}</span>
                      <span>{translate("accurate")}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {translate("analysisComments")}
                    </label>
                    <Textarea
                      placeholder={translate("provideDetailedAnalysis")}
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {translate("sourceEvaluation")}
                    </label>
                    <Textarea
                      placeholder={translate("evaluateSourceCredibility")}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <Alert>
                    <Coins className="h-4 w-4" />
                    <AlertTitle>{translate("earnTokens")}</AlertTitle>
                    <AlertDescription>
                      {translate("qualityAnalysisRewards")}
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? translate("submittingAnalysis")
                      : translate("submitAnalysis")}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-xs text-muted-foreground">
                <p>{translate("analysisVisibleToValidators")}</p>
                <p>{translate("beThoroughAndObjective")}</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
