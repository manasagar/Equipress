import { getUserByAddress, type User } from "@/data/users"

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
  isNewUser?: boolean
}

export async function authenticateUser(address: string): Promise<AuthResult> {
  try {
    // Check if the user exists in our database
    const user = getUserByAddress(address)

    if (user) {
      return {
        success: true,
        user,
        isNewUser: false,
      }
    } else {
      // In a real app, we would create a new user here
      // For demo purposes, we'll return an error since we're using a fixed set of users
      return {
        success: false,
        error: "User not found. Please use one of the demo accounts.",
        isNewUser: true,
      }
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown authentication error",
    }
  }
}

// Function to verify a signature (would be used in a real app)
export async function verifySignature(address: string, message: string, signature: string): Promise<boolean> {
  // In a real app, we would verify the signature here
  // For demo purposes, we'll just return true
  return true
}
