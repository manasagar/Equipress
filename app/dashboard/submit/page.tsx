"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploader } from "@/components/file-uploader"
import { useRouter } from "next/navigation"
import { AlertCircle, FileText, LinkIcon, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArticlePreview } from "@/components/article-preview"
import { SubmissionConfirmation } from "@/components/submission-confirmation"
import { useAuth } from "@/contexts/auth-context"
import { FactCheckResults } from "@/components/fact-check-results"

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

  // Function to run ML fact-checking
  const runFactCheck = async () => {
    if (!content.trim()) {
      return
    }

    setIsFactChecking(true)

    try {
      // Simulate API call to ML service
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock response from fact-checking service
      const results = {
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        confidence: Math.floor(Math.random() * 20) + 75, // Random confidence between 75-95
        flaggedClaims: [
          {
            text: content.split(". ")[0] + ".",
            veracity: Math.random() > 0.7 ? "questionable" : "supported",
            sources: ["https://example.com/source1", "https://example.com/source2"],
          },
          {
            text: content.split(". ").length > 1 ? content.split(". ")[1] + "." : "",
            veracity: Math.random() > 0.5 ? "supported" : "questionable",
            sources: ["https://example.com/source3"],
          },
        ],
        suggestedSources: [
          { title: "Academic Research Paper", url: "https://example.edu/research" },
          { title: "Government Data Repository", url: "https://data.gov/example" },
        ],
      }

      setFactCheckResults(results)
    } catch (error) {
      console.error("Error during fact checking:", error)
    } finally {
      setIsFactChecking(false)
    }
  }

  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

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
                <Button type="submit" disabled={!content}>
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
            <Button onClick={handleSubmit} disabled={isSubmitting}>
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
