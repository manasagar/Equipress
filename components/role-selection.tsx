import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Search, CheckCircle } from "lucide-react"
import Link from "next/link"

export function RoleSelection() {
  const roles = [
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Reporter",
      description: "Submit news articles and provide sources. Build your reputation as a reliable news source.",
      benefits: [
        "Submit original content",
        "Earn credibility for accurate reporting",
        "Build a portfolio of verified articles",
      ],
      cta: "Become a Reporter",
      href: "/register?role=reporter",
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "Analyzer",
      description: "Review and rate news articles based on accuracy, sources, and quality of reporting.",
      benefits: ["Analyze article credibility", "Provide detailed ratings", "Earn reputation for quality analysis"],
      cta: "Become an Analyzer",
      href: "/register?role=analyzer",
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Validator",
      description: "Vote on the truthfulness of news articles based on evidence and analysis.",
      benefits: [
        "Vote on article truthfulness",
        "Help maintain platform integrity",
        "Earn reputation for accurate validation",
      ],
      cta: "Become a Validator",
      href: "/register?role=validator",
    },
  ]

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Choose Your Role</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Join our community and contribute to a more transparent news ecosystem
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {role.icon}
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="grid gap-2">
                  {role.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={role.href} className="w-full">
                  <Button className="w-full">{role.cta}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
