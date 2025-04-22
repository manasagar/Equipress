"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, CheckCircle, Wallet, Award } from "lucide-react";

export function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Check if the user has seen the tutorial before
    const tutorialSeen = localStorage.getItem("tutorialSeen");
    if (!tutorialSeen) {
      setIsOpen(true);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem("tutorialSeen", "true");
    setHasSeenTutorial(true);
    setIsOpen(false);
  };

  const steps = [
    {
      title: "Welcome to Equipress",
      description:
        "Let's take a quick tour of our decentralized news verification platform.",
      content: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <p className="text-center">
            Equipress is a blockchain-based platform that enables
            community-driven verification and rating of news articles. Our
            mission is to create a more transparent and trustworthy news
            ecosystem.
          </p>
        </div>
      ),
    },
    {
      title: "Connect Your Wallet",
      description:
        "First, you'll need to connect your Web3 wallet to get started.",
      content: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Wallet className="h-12 w-12 text-primary" />
          </div>
          <p className="text-center">
            Click the "Connect Wallet" button in the top right corner to connect
            your Web3 wallet. This will allow you to interact with the platform
            and build your reputation.
          </p>
        </div>
      ),
    },
    {
      title: "Choose Your Role",
      description: "Select how you want to contribute to the platform.",
      content: (
        <div className="py-6">
          <Tabs defaultValue="reporter">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reporter">Reporter</TabsTrigger>
              <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
              <TabsTrigger value="validator">Validator</TabsTrigger>
            </TabsList>
            <TabsContent value="reporter" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Reporter</CardTitle>
                  <CardDescription>
                    Submit news articles with sources and evidence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    As a Reporter, you can submit original news articles or
                    share existing ones with proper attribution. Include
                    reliable sources to increase your verification rate.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analyzer" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Analyzer</CardTitle>
                  <CardDescription>
                    Review and rate news articles for accuracy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Analyzers review submitted articles, check sources, and
                    provide detailed ratings on accuracy and quality. Your
                    analysis helps validators make informed decisions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="validator" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Validator</CardTitle>
                  <CardDescription>
                    Vote on the truthfulness of articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Validators review analyses and vote on whether an article is
                    true or false. Your votes contribute to the final
                    verification status of articles.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
    {
      title: "Build Your Reputation",
      description: "Earn credibility through quality contributions.",
      content: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <p className="text-center mb-4">
            Every quality contribution increases your credibility score. Higher
            scores unlock more platform features and increase the weight of your
            votes and analyses.
          </p>
          <div className="w-full rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Credibility Score</span>
              <span className="text-sm font-medium">50/100</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary" style={{ width: "50%" }} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              New users start with a score of 50. Contribute quality content to
              increase your score!
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "You're All Set!",
      description: "Start exploring and contributing to Equipress.",
      content: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <p className="text-center">
            You're now ready to start using Equipress! Browse the news feed,
            connect your wallet, and begin contributing to a more transparent
            news ecosystem.
          </p>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (hasSeenTutorial) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        {steps[currentStep].content}
        <DialogFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="mr-auto"
            >
              Skip Tutorial
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
