// This is a mock service for token economy
// In a real app, this would interact with a blockchain

interface TokenBalance {
  available: number
  staked: number
  rewards: number
}

interface StakingInfo {
  amount: number
  since: Date
  apy: number
  rewards: number
}

export async function getTokenBalance(userId: string): Promise<TokenBalance> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock response
  return {
    available: 450,
    staked: 200,
    rewards: 15,
  }
}

export async function stakeTokens(userId: string, amount: number): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  return true
}

export async function unstakeTokens(userId: string, amount: number): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  return true
}

export async function claimRewards(userId: string): Promise<number> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response - return amount claimed
  return 15
}

export async function getStakingInfo(userId: string): Promise<StakingInfo> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock response
  return {
    amount: 200,
    since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    apy: 12.5,
    rewards: 15,
  }
}

export async function getTokenHistory(userId: string): Promise<any[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock response
  return [
    { type: "stake", amount: 100, timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    { type: "stake", amount: 100, timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { type: "reward", amount: 5, timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { type: "reward", amount: 10, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  ]
}
