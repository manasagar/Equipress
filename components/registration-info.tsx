import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function RegistrationInfo() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Join Equipress Today
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Create an account and start contributing to a more transparent news
            ecosystem
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Simple Registration</CardTitle>
              <CardDescription>Get started in just a few steps</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">1.</span>
                  <span>Connect your Web3 wallet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">2.</span>
                  <span>
                    Choose your role (Reporter, Analyzer, or Validator)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">3.</span>
                  <span>Complete your profile information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">4.</span>
                  <span>Start contributing to the platform</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button className="w-full">Register Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credibility System</CardTitle>
              <CardDescription>
                Build your reputation on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>
                    Earn credibility points for accurate contributions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Reporters gain points for verified articles</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Analyzers earn for accurate assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Validators receive points for consensus votes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Higher credibility unlocks more platform features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/about/verification" className="w-full">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain Benefits</CardTitle>
              <CardDescription>
                Why we use blockchain technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Immutable record of all verification activities</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Transparent and tamper-proof verification process</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Decentralized governance of the platform</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>
                    Token rewards for quality contributions (coming soon)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>No central authority controlling the narrative</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/about" className="w-full">
                <Button variant="outline" className="w-full">
                  How It Works
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
