import { RegisterForm } from "@/components/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { FileText, Search, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Join Equipress</h1>
        <p className="text-muted-foreground">
          Create your account and start contributing to a more transparent news ecosystem
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_400px]">
        <div>
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About Roles</TabsTrigger>
              <TabsTrigger value="credibility">Credibility System</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Role Wisely</CardTitle>
                  <CardDescription>Each role has unique responsibilities and benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="flex items-center gap-2 font-medium">
                      <FileText className="h-5 w-5 text-primary" /> Reporter
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Submit news articles with sources and evidence. Build your reputation as a reliable news source.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="flex items-center gap-2 font-medium">
                      <Search className="h-5 w-5 text-primary" /> Analyzer
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Review and rate news articles based on accuracy, sources, and quality of reporting.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="flex items-center gap-2 font-medium">
                      <CheckCircle className="h-5 w-5 text-primary" /> Validator
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Vote on the truthfulness of news articles based on evidence and analysis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="credibility" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Credibility System</CardTitle>
                  <CardDescription>How your reputation is built on Equipress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Your credibility score is a measure of your trustworthiness on the platform. It ranges from 0 to
                    100, with higher scores indicating more reliable contributors.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">How to earn credibility:</h3>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li>Submit articles that get verified (Reporters)</li>
                      <li>Provide accurate analyses that align with consensus (Analyzers)</li>
                      <li>Cast votes that match the final verification outcome (Validators)</li>
                      <li>Consistently participate on the platform</li>
                      <li>Receive upvotes on your contributions</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">How you can lose credibility:</h3>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li>Submit articles that get rejected (Reporters)</li>
                      <li>Provide analyses that significantly differ from consensus (Analyzers)</li>
                      <li>Cast votes that contradict the final verification outcome (Validators)</li>
                      <li>Receive downvotes on your contributions</li>
                      <li>Violate platform guidelines</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rewards" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards System</CardTitle>
                  <CardDescription>Benefits of contributing to Equipress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Equipress rewards quality contributions through a combination of reputation benefits and token
                    rewards.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Current benefits:</h3>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li>Higher visibility for high-credibility contributors</li>
                      <li>Badges and recognition on your profile</li>
                      <li>More influence in the verification process</li>
                      <li>Access to exclusive platform features</li>
                      <li>EQP tokens for quality contributions</li>
                    </ul>
                  </div>
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Token Economy</AlertTitle>
                    <AlertDescription>
                      Earn EQP tokens for verified contributions. Stake tokens to increase your influence and earn
                      additional rewards.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
