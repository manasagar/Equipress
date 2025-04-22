"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Search, CheckCircle, InfoIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "reporter",
    bio: "",
    expertiseAreas: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setFormData((prev) => {
      if (checked) {
        return { ...prev, expertiseAreas: [...prev.expertiseAreas, value] }
      } else {
        return { ...prev, expertiseAreas: prev.expertiseAreas.filter((area) => area !== value) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          bio: formData.bio,
          expertiseAreas: formData.expertiseAreas,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Please log in.",
      })

      router.push("/login?registered=true")
    } catch (error: any) {
      setError(error.message || "An error occurred during registration")
    } finally {
      setIsSubmitting(false)
    }
  }

  const roleIcons = {
    reporter: <FileText className="h-5 w-5" />,
    analyzer: <Search className="h-5 w-5" />,
    validator: <CheckCircle className="h-5 w-5" />,
  }

  const expertiseOptions = [
    "Politics",
    "Technology",
    "Science",
    "Health",
    "Business",
    "Sports",
    "Entertainment",
    "Environment",
    "Education",
    "International",
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Join Equipress and start contributing to verified news</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Select your primary role *</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="grid gap-2">
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="reporter" id="reporter" />
                <Label htmlFor="reporter" className="flex items-center gap-2 font-normal">
                  {roleIcons.reporter}
                  Reporter
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="analyzer" id="analyzer" />
                <Label htmlFor="analyzer" className="flex items-center gap-2 font-normal">
                  {roleIcons.analyzer}
                  Analyzer
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="validator" id="validator" />
                <Label htmlFor="validator" className="flex items-center gap-2 font-normal">
                  {roleIcons.validator}
                  Validator
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself and your expertise"
              className="min-h-[100px]"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Areas of Expertise (optional)</Label>
            <div className="grid grid-cols-2 gap-2">
              {expertiseOptions.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`area-${area.toLowerCase()}`}
                    value={area}
                    checked={formData.expertiseAreas.includes(area)}
                    onChange={handleExpertiseChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor={`area-${area.toLowerCase()}`} className="text-sm font-normal">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Creating Account..." : "Complete Registration"}
        </Button>
      </CardFooter>
    </Card>
  )
}
