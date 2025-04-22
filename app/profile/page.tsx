"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Search, CheckCircle, User, BarChart2, Clock, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ActivityHistory } from "@/components/activity-history"
import { ReputationGraph } from "@/components/reputation-graph"
import { RoleMetrics } from "@/components/role-metrics"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (user) {
      setFormData({
        username: user.username,
        email: user.email || "",
        bio: user.bio || "",
      })
    }
  }, [isAuthenticated, loading, router, user])

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would update the user profile here
    setIsEditing(false)
  }

  const roleIcons = {
    reporter: <FileText className="h-5 w-5" />,
    analyzer: <Search className="h-5 w-5" />,
    validator: <CheckCircle className="h-5 w-5" />,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "metrics" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("metrics")}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Metrics
                </Button>
                <Button
                  variant={activeTab === "activity" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("activity")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Activity
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Credibility Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative mb-2 h-24 w-24">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle className="stroke-muted" cx="50" cy="50" r="40" fill="transparent" strokeWidth="10" />
                    <circle
                      className="stroke-primary"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeWidth="10"
                      strokeDasharray={`${(user.credibilityScore / 100) * 251.2} 251.2`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{user.credibilityScore}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {user.credibilityScore >= 90
                    ? "Excellent"
                    : user.credibilityScore >= 80
                      ? "Very Good"
                      : user.credibilityScore >= 70
                        ? "Good"
                        : user.credibilityScore >= 60
                          ? "Fair"
                          : "Needs Improvement"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" value={formData.username} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{user.username}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {roleIcons[user.role as keyof typeof roleIcons]}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 pt-4">
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Email</h4>
                        <p className="text-sm text-muted-foreground">{user.email || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Bio</h4>
                        <p className="text-sm text-muted-foreground">{user.bio || "No bio provided"}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Joined</h4>
                        <p className="text-sm text-muted-foreground">{user.joinedDate}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.expertiseAreas?.map((area) => (
                            <span
                              key={area}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                            >
                              {area}
                            </span>
                          )) || "None specified"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your activity and impact on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleMetrics user={user} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Credibility Over Time</CardTitle>
                  <CardDescription>Track your reputation growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReputationGraph />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "activity" && (
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Your recent actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityHistory activities={user.activity} />
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="en"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notify-articles" className="h-4 w-4 rounded" defaultChecked />
                      <Label htmlFor="notify-articles" className="text-sm font-normal">
                        New articles to review
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notify-comments" className="h-4 w-4 rounded" defaultChecked />
                      <Label htmlFor="notify-comments" className="text-sm font-normal">
                        Comments on your articles
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notify-validation" className="h-4 w-4 rounded" defaultChecked />
                      <Label htmlFor="notify-validation" className="text-sm font-normal">
                        Validation results
                      </Label>
                    </div>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
