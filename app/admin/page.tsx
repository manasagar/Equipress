"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Users,
  FileText,
  AlertTriangle,
  Settings,
  BarChart3,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Shield,
  Bell,
  Globe,
  Database,
  Coins,
} from "lucide-react"
import { users } from "@/data/users"

export default function AdminPage() {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [platformSettings, setPlatformSettings] = useState({
    enableNewRegistrations: true,
    enableArticleSubmissions: true,
    minimumStakeAmount: 50,
    validationThreshold: 75,
    enableAIFactChecking: true,
    enableDisputeResolution: true,
    enableRewardsDistribution: true,
  })

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/")
    }
  }, [isAuthenticated, loading, router, user])

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleSettingChange = (setting, value) => {
    setPlatformSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const reportedArticles = [
    {
      id: 1,
      title: "Controversial Climate Change Study",
      reporter: "user123",
      reason: "Misleading information",
      status: "Under Review",
    },
    {
      id: 2,
      title: "Political Figure Makes Disputed Claim",
      reporter: "factchecker",
      reason: "Factual inaccuracy",
      status: "Resolved",
    },
    {
      id: 3,
      title: "New Medical Treatment Claims",
      reporter: "healthexpert",
      reason: "Unverified sources",
      status: "Under Review",
    },
  ]

  const platformStats = {
    totalUsers: 1248,
    activeUsers: 876,
    totalArticles: 3542,
    pendingVerification: 124,
    verifiedArticles: 2876,
    rejectedArticles: 542,
    totalStaked: "125,000 EQP",
    disputesResolved: 87,
    averageVerificationTime: "18 hours",
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Manage platform content, users, and settings</p>

      <Tabs defaultValue="users">
        <TabsList className="mb-8">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="articles">
            <FileText className="mr-2 h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="reports">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage platform users</CardDescription>
              <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="reporter">Reporters</SelectItem>
                      <SelectItem value="analyzer">Analyzers</SelectItem>
                      <SelectItem value="validator">Validators</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Users
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Credibility</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>{user.credibilityScore}</TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-1 h-3 w-3" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="mr-1 h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Review and moderate platform content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending Review</TabsTrigger>
                  <TabsTrigger value="verified">Verified</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  <TabsTrigger value="disputed">Disputed</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">Pending Article {i}</TableCell>
                            <TableCell>author{i}</TableCell>
                            <TableCell>Politics</TableCell>
                            <TableCell>
                              {i} day{i !== 1 ? "s" : ""} ago
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                Pending
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="mr-1 h-3 w-3" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm" className="text-green-600">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm" className="text-destructive">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="verified">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Verified On</TableHead>
                          <TableHead>Consensus</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3].map((i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">Verified Article {i}</TableCell>
                            <TableCell>author{i}</TableCell>
                            <TableCell>Technology</TableCell>
                            <TableCell>
                              {i * 2} day{i * 2 !== 1 ? "s" : ""} ago
                            </TableCell>
                            <TableCell>{85 + i}% True</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="mr-1 h-3 w-3" />
                                  View
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="rejected">
                  <p>Rejected articles would be listed here</p>
                </TabsContent>

                <TabsContent value="disputed">
                  <p>Disputed articles would be listed here</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
              <CardDescription>Review and handle reported articles and users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedArticles.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.status === "Resolved"
                                ? "bg-green-50 text-green-700"
                                : "bg-yellow-50 text-yellow-700"
                            }
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-3 w-3" />
                              Review
                            </Button>
                            {report.status !== "Resolved" && (
                              <Button variant="outline" size="sm">
                                <Shield className="mr-1 h-3 w-3" />
                                Resolve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enable-registrations" className="flex flex-col space-y-1">
                    <span>Enable New Registrations</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow new users to register on the platform
                    </span>
                  </Label>
                  <Switch
                    id="enable-registrations"
                    checked={platformSettings.enableNewRegistrations}
                    onCheckedChange={(checked) => handleSettingChange("enableNewRegistrations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enable-submissions" className="flex flex-col space-y-1">
                    <span>Enable Article Submissions</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow users to submit new articles
                    </span>
                  </Label>
                  <Switch
                    id="enable-submissions"
                    checked={platformSettings.enableArticleSubmissions}
                    onCheckedChange={(checked) => handleSettingChange("enableArticleSubmissions", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimum-stake">Minimum Stake Amount (EQP)</Label>
                  <Input
                    id="minimum-stake"
                    type="number"
                    value={platformSettings.minimumStakeAmount}
                    onChange={(e) => handleSettingChange("minimumStakeAmount", Number.parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">Minimum amount of tokens required for staking</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validation-threshold">Validation Threshold (%)</Label>
                  <Input
                    id="validation-threshold"
                    type="number"
                    value={platformSettings.validationThreshold}
                    onChange={(e) => handleSettingChange("validationThreshold", Number.parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentage of consensus required for article verification
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Settings</CardTitle>
                <CardDescription>Enable or disable platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enable-ai" className="flex flex-col space-y-1">
                    <span>AI Fact Checking</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Enable AI-assisted fact checking for articles
                    </span>
                  </Label>
                  <Switch
                    id="enable-ai"
                    checked={platformSettings.enableAIFactChecking}
                    onCheckedChange={(checked) => handleSettingChange("enableAIFactChecking", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enable-disputes" className="flex flex-col space-y-1">
                    <span>Dispute Resolution</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Enable the dispute resolution system
                    </span>
                  </Label>
                  <Switch
                    id="enable-disputes"
                    checked={platformSettings.enableDisputeResolution}
                    onCheckedChange={(checked) => handleSettingChange("enableDisputeResolution", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enable-rewards" className="flex flex-col space-y-1">
                    <span>Rewards Distribution</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Enable automatic token rewards distribution
                    </span>
                  </Label>
                  <Switch
                    id="enable-rewards"
                    checked={platformSettings.enableRewardsDistribution}
                    onCheckedChange={(checked) => handleSettingChange("enableRewardsDistribution", checked)}
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full">Save Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Perform system maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Database className="mb-2 h-5 w-5" />
                    <span>Backup Database</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Bell className="mb-2 h-5 w-5" />
                    <span>Send System Notification</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Globe className="mb-2 h-5 w-5" />
                    <span>Update Content Cache</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Coins className="mb-2 h-5 w-5" />
                    <span>Recalculate Token Balances</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Users className="mb-2 h-5 w-5" />
                    <span>Recalculate User Reputation</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto flex-col items-center justify-center py-4 text-destructive"
                  >
                    <AlertTriangle className="mb-2 h-5 w-5" />
                    <span>System Reset</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key platform metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{platformStats.totalUsers}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">{platformStats.activeUsers}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Articles</p>
                      <p className="text-2xl font-bold">{platformStats.totalArticles}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Pending Verification</p>
                      <p className="text-2xl font-bold">{platformStats.pendingVerification}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Verified Articles</p>
                      <p className="text-2xl font-bold">{platformStats.verifiedArticles}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rejected Articles</p>
                      <p className="text-2xl font-bold">{platformStats.rejectedArticles}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Economy</CardTitle>
                <CardDescription>Token distribution and staking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Staked</p>
                    <p className="text-2xl font-bold">{platformStats.totalStaked}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Staking Distribution</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Reporters</span>
                        <span>25%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: "25%" }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Analyzers</span>
                        <span>35%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: "35%" }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Validators</span>
                        <span>40%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: "40%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Avg. Verification Time</p>
                    <p className="text-2xl font-bold">{platformStats.averageVerificationTime}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Disputes Resolved</p>
                    <p className="text-2xl font-bold">{platformStats.disputesResolved}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                    <p className="text-2xl font-bold">99.8%</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">API Response Time</p>
                    <p className="text-2xl font-bold">245ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Download Reports</CardTitle>
                <CardDescription>Export platform data for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Users className="mb-2 h-5 w-5" />
                    <span>User Report</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <FileText className="mb-2 h-5 w-5" />
                    <span>Content Report</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <Coins className="mb-2 h-5 w-5" />
                    <span>Token Economy Report</span>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col items-center justify-center py-4">
                    <BarChart3 className="mb-2 h-5 w-5" />
                    <span>Full Analytics Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
