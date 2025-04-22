import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Search,
  CheckCircle,
  Award,
  AlertTriangle,
} from "lucide-react";

export default function VerificationPage() {
  const steps = [
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Article Submission",
      description: "Reporters submit news articles with sources and evidence.",
      details:
        "When a reporter submits an article, they must include at least one credible source to support their claims. The article is then queued for analysis.",
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "Expert Analysis",
      description: "Analyzers review the content and provide detailed ratings.",
      details:
        "At least three analyzers must review each article. They evaluate the accuracy, sources, and quality of the reporting, providing a rating out of 10 and detailed feedback.",
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Community Validation",
      description: "Validators vote on the truthfulness of the article.",
      details:
        "Based on the analysis, validators cast their votes on whether the article is true or false. A minimum of 10 votes is required to establish consensus.",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Verification Status",
      description: "The article receives its final verification status.",
      details:
        "If more than 75% of validators agree, the article is marked as 'Verified' or 'Disputed'. Otherwise, it remains 'Under Review' until more votes are cast.",
    },
  ];

  const statuses = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Verified",
      description:
        "The article has been verified as accurate by the community.",
      criteria: "At least 75% of validators agree that the article is true.",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
      title: "Under Review",
      description: "The article is still being analyzed and validated.",
      criteria:
        "Either not enough validators have voted, or there is no clear consensus yet.",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      title: "Disputed",
      description:
        "The article has been found to contain significant inaccuracies.",
      criteria:
        "At least 75% of validators agree that the article contains false information.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Verification Process</h1>
        <p className="text-muted-foreground">
          How articles are verified on the Equipress platform
        </p>
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{step.details}</p>
              {index < steps.length - 1 && (
                <div className="mt-4 hidden h-0.5 w-12 bg-muted lg:block lg:absolute lg:right-[-2rem] lg:top-[5rem]" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold">Verification Statuses</h2>
        <p className="text-muted-foreground">
          What each status means for an article
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {statuses.map((status, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {status.icon}
                <CardTitle>{status.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {status.description}
              </CardDescription>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <strong>Criteria:</strong> {status.criteria}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-muted p-6">
        <h2 className="mb-4 text-xl font-bold">Blockchain Transparency</h2>
        <p className="mb-4">
          All verification activities are recorded on the blockchain, creating
          an immutable record of the process. This ensures that the verification
          history cannot be altered or deleted.
        </p>
        <p>
          Users can view the complete verification history of any article,
          including all analyzer ratings and validator votes, providing full
          transparency into how the verification status was determined.
        </p>
      </div>
    </div>
  );
}
