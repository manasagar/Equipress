import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Search, CheckCircle } from "lucide-react";

export default function RolesPage() {
  const roles = [
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Reporter",
      description:
        "Submit news articles and provide sources. Build your reputation as a reliable news source.",
      responsibilities: [
        "Research and write factual news articles",
        "Provide credible sources for all claims",
        "Submit articles for community verification",
        "Respond to feedback from analyzers",
        "Build a portfolio of verified content",
      ],
      benefits: [
        "Earn credibility for accurate reporting",
        "Gain visibility for quality journalism",
        "Contribute to a more informed society",
        "Receive feedback from expert analyzers",
      ],
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "Analyzer",
      description:
        "Review and rate news articles based on accuracy, sources, and quality of reporting.",
      responsibilities: [
        "Evaluate the accuracy of submitted articles",
        "Check sources for credibility and relevance",
        "Provide detailed ratings and feedback",
        "Identify potential biases or omissions",
        "Help improve the quality of reporting",
      ],
      benefits: [
        "Develop expertise in fact-checking",
        "Earn reputation for quality analysis",
        "Shape the standards for quality journalism",
        "Help combat misinformation",
      ],
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Validator",
      description:
        "Vote on the truthfulness of news articles based on evidence and analysis.",
      responsibilities: [
        "Review analyzer ratings and comments",
        "Cast votes on article truthfulness",
        "Help establish consensus on controversial topics",
        "Maintain platform integrity",
        "Identify potential conflicts of interest",
      ],
      benefits: [
        "Contribute to platform governance",
        "Earn reputation for accurate validation",
        "Help establish truth in a decentralized manner",
        "Be part of a community of truth-seekers",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Roles</h1>
        <p className="text-muted-foreground">
          Learn about the different roles in the Equipress ecosystem
        </p>
      </div>

      <div className="grid gap-8">
        {roles.map((role, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {role.icon}
              </div>
              <CardTitle className="text-2xl">{role.title}</CardTitle>
              <CardDescription className="text-lg">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-medium">Responsibilities</h3>
                <ul className="grid gap-2">
                  {role.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium">Benefits</h3>
                <ul className="grid gap-2">
                  {role.benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
