"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import { ReporterDashboard } from "@/components/dashboard/reporter-dashboard"
import { AnalyzerDashboard } from "@/components/dashboard/analyzer-dashboard"
import { ValidatorDashboard } from "@/components/dashboard/validator-dashboard"

export default function Dashboard() {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  // Render the appropriate dashboard based on user role
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
        <p className="text-muted-foreground">
          Your role: <span className="font-medium capitalize">{user.role}</span> | Credibility Score:{" "}
          <span className="font-medium">{user.credibilityScore}</span>
        </p>
      </div>

      {user.role === "reporter" && <ReporterDashboard />}
      {user.role === "analyzer" && <AnalyzerDashboard />}
      {user.role === "validator" && <ValidatorDashboard />}
    </div>
  )
}
