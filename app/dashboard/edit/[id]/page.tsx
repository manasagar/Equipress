"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploader } from "@/components/file-uploader"
import { AlertCircle, FileText, LinkIcon, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [sources, setSources] = useState([
    { title: "United Nations Press Release", url: "https://www.un.org/press/en/2023/climate-initiative.html" },
    {
      title: "Global Economic Forum Official Statement",
      url: "https://www.globaleconomicforum.org/statements/climate2030",
    },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addSource = () => {
    setSources([...sources, { title: "", url: "" }])
  }

  const updateSource = (index: number, field: "title" | "url", value: string) => {
    const updatedSources = [...sources]
    updatedSources[index][field] = value
    setSources(updatedSources)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard
    router.push("/dashboard?updated=true")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <Link href="/dashboard/articles" className="text-sm text-muted-foreground hover:text-foreground">
          Articles
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm">Edit Article</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <p className="text-muted-foreground">Update your news article</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Edited articles will need to go through the verification process again. Please ensure your content is
                factual and includes reliable sources.
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-4 md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input id="title" defaultValue="Global Economic Forum Announces New Climate Initiative" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="politics">
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
                className="min-h-[300px]"
                required
                defaultValue={`World leaders have agreed on a new framework to address climate change at the latest economic summit held in Geneva last week.
                
The initiative, dubbed "Global Climate Action 2030," aims to reduce carbon emissions by 50% before the end of the decade through a combination of regulatory measures and financial incentives.

"This is a historic moment for international cooperation on climate change," said Emma Rodriguez, the UN Special Envoy for Climate Action. "For the first time, we have a comprehensive framework that balances economic growth with environmental protection."

The agreement includes provisions for carbon pricing, renewable energy subsidies, and a new international fund to help developing nations transition to cleaner energy sources.

Critics, however, have questioned whether the targets are ambitious enough to prevent the worst effects of climate change, and whether enforcement mechanisms are sufficient to ensure compliance.`}
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Article"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
