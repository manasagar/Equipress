// This is a mock authentication service for demonstration purposes
// In a real application, this would connect to a backend service

interface User {
  address: string
  username: string
  role: "reporter" | "analyzer" | "validator"
  credibilityScore: number
  joinedDate: string
}

// Mock user database
const users = [
  { address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", username: "JohnDoe", role: "reporter" },
  { address: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF", username: "JaneSmith", role: "analyzer" },
  { address: "0x6E0d01A76C3Cf4288372a29124A26D4353EE51BE", username: "BobJohnson", role: "validator" },
  { address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", username: "AliceWilliams", role: "reporter" },
  { address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0", username: "CharlieBrown", role: "analyzer" },
  { address: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E", username: "DianaDavis", role: "validator" },
  { address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30", username: "EvanMiller", role: "reporter" },
  { address: "0xcd3B766CCDd6AE721141F452C550Ca635964ce71", username: "FionaClark", role: "analyzer" },
  { address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", username: "GeorgeWilson", role: "validator" },
  { address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", username: "HannahMoore", role: "reporter" },
]

export function authenticateUser(address: string) {
  // Convert address to lowercase for case-insensitive comparison
  const normalizedAddress = address.toLowerCase()

  // Find user by address (case-insensitive)
  const user = users.find((u) => u.address.toLowerCase() === normalizedAddress)

  return {
    user,
    isNewUser: !user,
  }
}

export function createUser(address: string, username: string, role: string) {
  // In a real app, this would add the user to a database
  const newUser = { address, username, role }
  users.push(newUser)
  return newUser
}

export function getUserByAddress(address: string) {
  if (!address) return null

  // Convert address to lowercase for case-insensitive comparison
  const normalizedAddress = address.toLowerCase()

  return users.find((u) => u.address.toLowerCase() === normalizedAddress) || null
}

export function getAllUsers() {
  return [...users]
}

export function updateUser(address: string, updates: Partial<Omit<User, "address">>): User | null {
  const user = getUserByAddress(address)
  if (!user) return null

  // Not implemented in the updated code, so keeping the original logic but adapting to the new user structure
  // This part would need to be adjusted based on how the user object is intended to be updated
  // For now, it's a placeholder to avoid breaking the original functionality
  return null
}
