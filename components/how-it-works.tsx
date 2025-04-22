import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Search, CheckCircle, Award, Coins, Shield, BarChart } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Submit News",
      description: "Reporters submit news articles with sources and evidence to the platform.",
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "Analyze Content",
      description: "Analyzers review the content and provide detailed ratings on accuracy and quality.",
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Validate Truth",
      description: "Validators vote on the truthfulness of the article based on evidence and analysis.",
    },
    {
      icon: <Coins className="h-10 w-10" />,
      title: "Stake & Earn",
      description: "Users stake tokens to increase their influence and earn rewards for quality contributions.",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Build Reputation",
      description: "Users earn credibility scores based on the accuracy of their contributions.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Dispute Resolution",
      description: "Contested verifications undergo a transparent dispute resolution process.",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Analytics & Insights",
      description: "Track platform metrics and your personal contribution statistics.",
    },
  ]

  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Our blockchain-powered verification process ensures transparency, accuracy, and rewards for quality
            contributions
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="bg-background">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
