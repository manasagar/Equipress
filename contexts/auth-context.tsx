"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Mock user data
const mockUsers = [
  {
    id: "1",
    username: "reporter1",
    email: "reporter1@example.com",
    password: "password",
    role: "reporter",
    credibilityScore: 78,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Politics", "Technology"],
    stats: {
      articlesSubmitted: 15,
      articlesVerified: 12,
      articlesRejected: 2,
      pendingArticles: 1,
      averageRating: 4.2,
    },
    earnings: {
      total: 450,
      pending: 25,
    },
    balance: 450,
    staked: 200,
    pendingRewards: 15,
    transactions: [],
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    username: "analyzer1",
    email: "analyzer1@example.com",
    password: "password",
    role: "analyzer",
    credibilityScore: 92,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Science", "Health", "Technology"],
    stats: {
      articlesAnalyzed: 48,
      accuracyScore: 92,
      responseTime: "4.2 hours",
      consensusRate: "88%",
    },
    earnings: {
      total: 680,
      pending: 45,
    },
    balance: 680,
    staked: 350,
    pendingRewards: 45,
    transactions: [],
    joinDate: "2022-11-03",
  },
  {
    id: "3",
    username: "validator1",
    email: "validator1@example.com",
    password: "password",
    role: "validator",
    credibilityScore: 94,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Politics", "Business", "Technology"],
    stats: {
      validationsCompleted: 124,
      consensusRate: "89%",
      accuracyScore: 94,
    },
    earnings: {
      total: 920,
      pending: 60,
    },
    balance: 920,
    staked: 500,
    pendingRewards: 60,
    transactions: [],
    joinDate: "2022-08-22",
  },
  {
    id: "4",
    username: "admin",
    email: "admin@example.com",
    password: "password",
    role: "admin",
    credibilityScore: 100,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["All"],
    stats: {
      articlesSubmitted: 0,
      articlesVerified: 0,
      articlesRejected: 0,
      pendingArticles: 0,
    },
    earnings: {
      total: 0,
      pending: 0,
    },
    balance: 1000,
    staked: 0,
    pendingRewards: 0,
    transactions: [],
    joinDate: "2022-05-10",
  },
  // Add compatibility with the existing user data structure
  {
    id: "user1",
    username: "reporter_user",
    email: "reporter@example.com",
    password: "password",
    role: "reporter",
    credibilityScore: 85,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Technology", "Science", "Environment"],
    stats: {
      articlesSubmitted: 24,
      articlesVerified: 18,
    },
    earnings: {
      total: 1250,
      pending: 350,
    },
    balance: 1250,
    staked: 500,
    pendingRewards: 100,
    joinDate: "2023-01-15",
    activity: [],
  },
  {
    id: "user2",
    username: "analyzer_user",
    email: "analyzer@example.com",
    password: "password",
    role: "analyzer",
    credibilityScore: 92,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Politics", "Economics", "International Relations"],
    stats: {
      articlesAnalyzed: 56,
      accuracyScore: 94,
      responseTime: "6 hours",
    },
    earnings: {
      total: 2340,
      pending: 420,
    },
    balance: 2340,
    staked: 1000,
    pendingRewards: 200,
    joinDate: "2022-11-03",
    activity: [],
  },
  {
    id: "user3",
    username: "validator_user",
    email: "validator@example.com",
    password: "password",
    role: "validator",
    credibilityScore: 97,
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Health", "Medicine", "Nutrition"],
    stats: {
      validationsCompleted: 112,
      consensusRate: 95,
    },
    earnings: {
      total: 3150,
      pending: 580,
    },
    balance: 3150,
    staked: 1500,
    pendingRewards: 300,
    joinDate: "2022-08-22",
    activity: [],
  },
  {
    id: "user4",
    username: "admin_user",
    email: "admin@example.com",
    password: "password",
    role: "admin",
    profileImage: "/placeholder.svg?height=40&width=40",
    expertiseAreas: ["Platform Management", "Content Moderation", "User Support"],
    stats: {},
    earnings: {
      total: 0,
      pending: 0,
    },
    balance: 5000,
    staked: 0,
    pendingRewards: 0,
    joinDate: "2022-05-10",
    activity: [],
  },
]

type User = {
  id: string
  username: string
  email: string
  role: string
  credibilityScore: number
  profileImage?: string
  expertiseAreas?: string[]
  stats: Record<string, any>
  earnings: {
    total: number
    pending: number
  }
  balance: number
  staked: number
  pendingRewards: number
  transactions?: any[]
  joinDate: string
  activity?: any[]
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (updatedUser: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false, message: "Auth context not initialized" }),
  logout: () => {},
  updateUser: () => {},
  loading: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("equipress_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("equipress_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Find user with matching email (case insensitive)
      const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (foundUser) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword as User)
        setIsAuthenticated(true)
        localStorage.setItem("equipress_user", JSON.stringify(userWithoutPassword))

        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.username}!`,
        })

        return { success: true, message: "Login successful" }
      }

      return {
        success: false,
        message: "Invalid email or password. Please check your credentials and try again.",
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: "An error occurred during login. Please try again later.",
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("equipress_user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  const updateUser = (updatedUserData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updatedUserData }
    setUser(updatedUser)
    localStorage.setItem("equipress_user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
