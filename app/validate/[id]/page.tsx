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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  LinkIcon,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Coins,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";

export default function ValidatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { translate } = useLanguage();
  const [vote, setVote] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTokenReward, setShowTokenReward] = useState(false);
  const [tokenReward, setTokenReward] = useState(0);

  // This would normally fetch the article data based on the ID
  const article = {
    id: params.id,
    title: "Tech Giant Unveils Revolutionary AI Assistant",
    content: `
      <p>Silicon Valley's leading tech company has announced a groundbreaking new AI assistant that promises to transform how we interact with technology.</p>
      
      <p>The system, named "Nexus," can understand and respond to complex human emotions and needs, according to the company's press release issued yesterday.</p>
      
      <p>"Nexus represents a quantum leap in artificial intelligence," said CEO James Chen during the product launch. "It's not just about understanding commands, but about truly comprehending human context and emotional states."</p>
      
      <p>The AI assistant reportedly uses a new type of neural network architecture that allows it to process emotional cues from voice, text, and even facial expressions when used with compatible devices.</p>
      
      <p>Industry analysts have expressed both excitement and caution about the new technology, with some raising concerns about privacy implications and the potential for emotional manipulation.</p>
    `,
    author: "David Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorInitials: "DC",
    date: "Yesterday",
    category: "Technology",
    status: "Under Review",
    sources: [
      {
        title: "Company Press Release",
        url: "https://example.com/tech-company/press/nexus-announcement",
      },
      {
        title: "Product Launch Video",
        url: "https://example.com/tech-company/launch-event",
      },
      {
        title: "Interview with James Chen",
        url: "https://techjournal.com/interviews/james-chen-nexus",
      },
    ],
    analyses: [
      {
        id: 1,
        analyst: "Dr. Robert Miller",
        analystAvatar: "/placeholder.svg?height=40&width=40",
        analystInitials: "RM",
        analystCredibility: 96,
        date: "12 hours ago",
        rating: 8,
        comment:
          "The article accurately reports the company's claims about the AI assistant. However, it could benefit from more technical details about how the emotional recognition actually works.",
      },
      {
        id: 2,
        analyst: "Jennifer Park",
        analystAvatar: "/placeholder.svg?height=40&width=40",
        analystInitials: "JP",
        analystCredibility: 88,
        date: "8 hours ago",
        rating: 9,
        comment:
          "The reporting is factual and balanced, including both the company's claims and analysts' concerns. The sources are credible and directly relevant to the story.",
      },
      {
        id: 3,
        analyst: "Thomas Wright",
        analystAvatar: "/placeholder.svg?height=40&width=40",
        analystInitials: "TW",
        analystCredibility: 91,
        date: "4 hours ago",
        rating: 7,
        comment:
          "While the core facts are accurate, the article could do more to explain the limitations of emotional AI technology and provide context about previous similar claims in the industry.",
      },
    ],
    consensus: "85% True",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vote) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Calculate token reward based on stake, consensus alignment, and validator reputation
    const baseReward = 3; // Base tokens for validation
    const stakeBonus = user?.staked ? (user.staked / 100) * 2 : 0; // Bonus for staked tokens
    const reputationBonus = user?.credibilityScore
      ? (user.credibilityScore / 100) * 1.5
      : 1; // Reputation bonus

    const calculatedReward =
      Math.round((baseReward + stakeBonus) * reputationBonus * 100) / 100;
    setTokenReward(calculatedReward);
    setShowTokenReward(true);
    setIsSubmitting(false);
  };

  const handleClaimReward = () => {
    // In a real app, this would call a smart contract to transfer tokens
    router.push("/dashboard?validated=true");
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
          href="/dashboard/validations"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {translate("validationQueue")}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm">{translate("validateArticle")}</span>
      </div>

      {showTokenReward ? (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              {translate("validationSubmitted")}
            </CardTitle>
            <CardDescription className="text-center">
              {translate("yourVoteHasBeenRecorded")}
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
                  {translate("stakeMoreTokensForGreaterRewards")}
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
              onClick={() => router.push("/dashboard/validations")}
            >
              {translate("validateAnotherArticle")}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
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

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {translate("expertAnalyses")}
              </h3>
              {article.analyses.map((analysis) => (
                <Card key={analysis.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={analysis.analystAvatar || "/placeholder.svg"}
                            alt={analysis.analyst}
                          />
                          <AvatarFallback>
                            {analysis.analystInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{analysis.analyst}</div>
                          <div className="text-xs text-muted-foreground">
                            {translate("credibilityScore")}:{" "}
                            {analysis.analystCredibility}/100
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          {analysis.rating}/10
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {translate("rating")}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm">{analysis.comment}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {translate("analyzed")} {analysis.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{translate("castYourVote")}</CardTitle>
                <CardDescription>
                  {translate("basedOnArticleAndAnalyses")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {translate("currentConsensus")}
                      </label>
                      <span className="text-sm font-medium">
                        {article.consensus}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>

                  <RadioGroup
                    value={vote || ""}
                    onValueChange={setVote}
                    className="grid gap-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="true" id="true" />
                      <Label
                        htmlFor="true"
                        className="flex items-center gap-2 font-normal"
                      >
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        {translate("trueArticleAccurate")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="false" id="false" />
                      <Label
                        htmlFor="false"
                        className="flex items-center gap-2 font-normal"
                      >
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        {translate("falseArticleInaccurate")}
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {translate("additionalComments")} ({translate("optional")}
                      )
                    </label>
                    <Textarea
                      placeholder={translate("provideAdditionalComments")}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Alert>
                    <Coins className="h-4 w-4" />
                    <AlertTitle>{translate("earnTokens")}</AlertTitle>
                    <AlertDescription>
                      {translate("validationRewardsExplanation")}
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!vote || isSubmitting}
                  >
                    {isSubmitting
                      ? translate("submittingVote")
                      : translate("submitVote")}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-xs text-muted-foreground">
                <p>{translate("voteContributesToVerification")}</p>
                <p>{translate("considerAllEvidence")}</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
