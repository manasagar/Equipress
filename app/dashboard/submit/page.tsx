// @ts-nocheck
"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploader } from "@/components/file-uploader"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle, FileText, LinkIcon, Plus, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArticlePreview } from "@/components/article-preview"
import { SubmissionConfirmation } from "@/components/submission-confirmation"
import { useAuth } from "@/contexts/auth-context"
import { Progress } from "@/components/ui/progress"

export default function SubmitArticlePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [sources, setSources] = useState([{ title: "", url: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFactChecking, setIsFactChecking] = useState(false)
  const [factCheckResults, setFactCheckResults] = useState<any>(null)

  // Add state variables for the preview and confirmation
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [activeTab, setActiveTab] = useState("write")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submittedArticleId, setSubmittedArticleId] = useState<string | number>("")

  const addSource = () => {
    setSources([...sources, { title: "", url: "" }])
  }

  const updateSource = (index: number, field: "title" | "url", value: string) => {
    const updatedSources = [...sources]
    updatedSources[index][field] = value
    setSources(updatedSources)
  }

  function parseClaimsResponse(apiResponse: any) {
    if (!apiResponse || !Array.isArray(apiResponse.claims)) {
      throw new Error("Invalid API response format")
    }
    return apiResponse.claims.map((claim: any) => ({
      id: claim.id,
      text: claim.text,
      status: claim.status,
      confidence: claim.confidence,
      evidence: claim.evidence,
    }))
  }

  // Calculate average confidence score from all claims
  const calculateAverageConfidence = (claims) => {
    if (!claims || claims.length === 0) {
      return 0
    }
    
    const totalConfidence = claims.reduce(
      (sum, claim) => sum + (claim.confidence || 0),
      0
    )
    
    return Math.round((totalConfidence / claims.length) * 100)
  }

  const runFactCheck = async () => {
    console.log("randi" + content)

    if (!content.trim()) return
    setIsFactChecking(true)
    setFactCheckResults(null)
    console.log("randi")

    try {
      const response = await axios.post('http://127.0.0.1:8000/echo', { text: content })
      const parsedClaims =  parseClaimsResponse(response.data)
      
      // Calculate average confidence score
      const averageConfidence = calculateAverageConfidence(parsedClaims)
      
      // Set complete results with score and flagged claims
      setFactCheckResults({
        score: averageConfidence,
        flaggedClaims: parsedClaims
      })
    } catch (error) {
      console.error("Error during fact checking:", error)
    } finally {
      setIsFactChecking(false)
    }
  }

  // Update the handleSubmit function
  const handleManas = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFactChecking(true)
    console.log("randi")
    setIsSubmitting(true)
    // Simulate API call
    await runFactCheck();

    // Set a mock article ID (in a real app, this would come from the backend)
    setSubmittedArticleId(Math.floor(Math.random() * 1000) + 1)
    setShowConfirmation(true)
    setIsSubmitting(false)
  }

  // Add a reset function for submitting another article
  const resetForm = () => {
    setTitle("")
    setCategory("")
    setContent("")
    setSources([{ title: "", url: "" }])
    setActiveTab("write")
    setShowConfirmation(false)
    setFactCheckResults(null)
  }

  // Get user initials safely
  const getUserInitials = () => {
    if (user?.username) {
      return user.username.slice(0, 2).toUpperCase()
    }
    return "EQ" // Default fallback for Equipress
  }

  // Update the return statement to include tabs for write/preview and the confirmation dialog
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit News Article</h1>
        <p className="text-muted-foreground">Share factual news with the community for verification</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="fact-check" disabled={!content}>
            Fact Check
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!title || !content}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (content) {
                setActiveTab("fact-check")
                runFactCheck()
              }
            }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    All submitted articles will be reviewed by our community of analyzers and validators. Please ensure
                    your content is factual and includes reliable sources.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear, descriptive title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="content">Article Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your article here..."
                    className="min-h-[300px]"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <FileUploader />
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center justify-between">
                  <Label>Sources</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSource} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Source
                  </Button>
                </div>

                <div className="space-y-4">
                  {sources.map((source, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm">Source {index + 1}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`source-title-${index}`}>Title</Label>
                            <Input
                              id={`source-title-${index}`}
                              placeholder="Source title or description"
                              value={source.title}
                              onChange={(e) => updateSource(index, "title", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`source-url-${index}`}>URL</Label>
                            <div className="flex items-center gap-2">
                              <LinkIcon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`source-url-${index}`}
                                placeholder="https://example.com"
                                value={source.url}
                                onChange={(e) => updateSource(index, "url", e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 md:col-span-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" >
                  Run Fact Check
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="fact-check">
          <div className="mb-6">
            {isFactChecking ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                  <h3 className="text-lg font-medium">Running Fact Check</h3>
                  <p className="text-muted-foreground">Our AI is analyzing your article for factual accuracy...</p>
                </div>
              </div>
            ) : factCheckResults ? (
              <FactCheckResults results={factCheckResults} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No fact check results available. Please run a fact check first.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setActiveTab("write")}>
              Back to Edit
            </Button>
            <Button onClick={() => setActiveTab("preview")} disabled={!factCheckResults || factCheckResults.score < 50}>
              Continue to Preview
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="mb-6">
            <ArticlePreview
              title={title}
              content={content}
              category={category || "Uncategorized"}
              author={{
                name: user?.username || "You",
                avatar: user?.profileImage || "/placeholder.svg?height=40&width=40",
                initials: getUserInitials(),
              }}
              factCheckScore={factCheckResults?.score || 0}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setActiveTab("fact-check")}>
              Back to Fact Check
            </Button>
            <Button  disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Article"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showConfirmation} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="sm:max-w-md">
          <SubmissionConfirmation articleId={submittedArticleId} onClose={resetForm} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// FactCheckResults component embedded in the same file
function FactCheckResults({ results }) {
  // Calculate average confidence from all claims
  const calculateAverageConfidence = () => {
    if (!results?.flaggedClaims || results.flaggedClaims.length === 0) {
      return 0
    }
    
    const totalConfidence = results.flaggedClaims.reduce(
      (sum, claim) => sum + (claim.confidence || 0),
      0
    )
    
    return Math.round((totalConfidence / results.flaggedClaims.length) * 100)
  }
  
  const averageConfidence = results.score || calculateAverageConfidence()
  
  // Helper function to get status icon
  const getStatusIcon = (status) => {
    if (status === "SUPPORTED" || status === "supported") {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (status === "REFUTED" || status === "refuted" || status === "questionable") {
      return <XCircle className="h-5 w-5 text-red-600" />
    } else {
      return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  // Helper function to get status text color
  const getStatusTextColor = (status) => {
    if (status === "SUPPORTED" || status === "supported") {
      return "text-green-600"
    } else if (status === "REFUTED" || status === "refuted" || status === "questionable") {
      return "text-red-600"
    } else {
      return "text-yellow-600"
    }
  }

  // Format status text for display
  const formatStatus = (status) => {
    if (!status) return "Unknown"
    
    const statusMap = {
      "SUPPORTED": "Supported",
      "supported": "Supported",
      "REFUTED": "Refuted",
      "refuted": "Refuted",
      "questionable": "Questionable",
      "UNCERTAIN": "Uncertain",
      "uncertain": "Uncertain"
    }
    
    return statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Fact Check Results</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Average Confidence:</span>
            <span className="font-medium">{averageConfidence}%</span>
          </div>
        </div>
        
        <Progress value={averageConfidence} className="h-2 w-full" />
        
        <div className="mt-4">
          {averageConfidence >= 75 ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Good reliability score</AlertTitle>
              <AlertDescription>
                Your article appears to be well-supported by evidence. You may proceed to submission.
              </AlertDescription>
            </Alert>
          ) : averageConfidence >= 50 ? (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Moderate reliability score</AlertTitle>
              <AlertDescription>
                Some claims may need additional verification. Consider adding more sources or revising questionable content.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-red-50 border-red-200">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Low reliability score</AlertTitle>
              <AlertDescription>
                Your article contains several claims that couldn't be verified or were found to be inaccurate. 
                Please revise before submitting.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Analyzed Claims</h3>
        
        {!results?.flaggedClaims || results.flaggedClaims.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            No claims were analyzed. Please try again.
          </div>
        ) : (
          results.flaggedClaims.map((claim, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  {getStatusIcon(claim.status)}
                  <span>Claim {claim.id || index + 1}</span>
                  <span className={`ml-auto text-sm ${getStatusTextColor(claim.status)}`}>
                    {formatStatus(claim.status)} 
                    {claim.confidence && ` (${Math.round(claim.confidence * 100)}% confidence)`}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-3 text-sm">
                  {claim.text}
                </div>
                
                {claim.evidence && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Evidence:</h4>
                    <div className="rounded-md bg-slate-50 p-3 text-sm">
                      {claim.evidence}
                    </div>
                  </div>
                )}
                
                {claim.sources && claim.sources.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sources:</h4>
                    <ul className="list-disc pl-5 text-sm">
                      {claim.sources.map((source, i) => (
                        <li key={i}>
                          <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {results?.suggestedSources && results.suggestedSources.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggested Additional Sources</h3>
          <div className="rounded-lg border p-4">
            <ul className="space-y-2">
              {results.suggestedSources.map((source, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-sm font-medium">{source.title}:</span>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                    {source.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}