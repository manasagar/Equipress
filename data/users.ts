export interface User {
  id: string
  username: string
  email: string
  role: "reporter" | "analyzer" | "validator" | "admin"
  profileImage?: string
  credibilityScore: number
  expertiseAreas?: string[]
  stats: {
    articlesSubmitted?: number
    articlesVerified?: number
    articlesAnalyzed?: number
    validationsCompleted?: number
    accuracyScore?: number
    responseTime?: string
    consensusRate?: number
  }
  earnings: {
    total: number
    pending: number
  }
  joinDate: string
  activity?: any[]
  balance?: number
  staked?: number
  pendingRewards?: number
}

export const users: User[] = [
  {
    id: "user1",
    username: "reporter_user",
    email: "reporter@example.com",
    role: "reporter",
    profileImage: "/placeholder.svg?height=40&width=40",
    credibilityScore: 85,
    expertiseAreas: ["Technology", "Science", "Environment"],
    stats: {
      articlesSubmitted: 15,
      articlesVerified: 12,
    },
    earnings: {
      total: 1250,
      pending: 350,
    },
    joinDate: "2023-01-15",
    activity: [],
    balance: 100,
    staked: 50,
    pendingRewards: 10,
  },
  {
    id: "user2",
    username: "analyzer_user",
    email: "analyzer@example.com",
    role: "analyzer",
    profileImage: "/placeholder.svg?height=40&width=40",
    credibilityScore: 92,
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
    joinDate: "2022-11-03",
    activity: [],
    balance: 100,
    staked: 50,
    pendingRewards: 10,
  },
  {
    id: "user3",
    username: "validator_user",
    email: "validator@example.com",
    role: "validator",
    profileImage: "/placeholder.svg?height=40&width=40",
    credibilityScore: 97,
    expertiseAreas: ["Health", "Medicine", "Nutrition"],
    stats: {
      validationsCompleted: 112,
      consensusRate: 95,
    },
    earnings: {
      total: 3150,
      pending: 580,
    },
    joinDate: "2022-08-22",
    activity: [],
    balance: 100,
    staked: 50,
    pendingRewards: 10,
  },
  {
    id: "user4",
    username: "admin_user",
    email: "admin@example.com",
    role: "admin",
    profileImage: "/placeholder.svg?height=40&width=40",
    credibilityScore: 99,
    expertiseAreas: ["Platform Management", "Content Moderation", "User Support"],
    stats: {},
    earnings: {
      total: 0,
      pending: 0,
    },
    joinDate: "2022-05-10",
    activity: [],
    balance: 100,
    staked: 50,
    pendingRewards: 10,
  },
]

// Function to get a user by username (case insensitive)
export function getUserByUsername(username: string): User | undefined {
  return users.find((user) => user.username.toLowerCase() === username.toLowerCase())
}

// Function to get a user by ID
export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

// Function to get users by role
export function getUsersByRole(role: "reporter" | "analyzer" | "validator" | "admin"): User[] {
  return users.filter((user) => user.role === role)
}

// Function to get a user by address (case insensitive)
export function getUserByAddress(address: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === address.toLowerCase())
}
