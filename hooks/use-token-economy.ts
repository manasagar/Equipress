"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

export interface TokenTransaction {
  amount: number
  type: "reward" | "stake" | "unstake" | "transfer"
  timestamp: Date
  description: string
}

export function useTokenEconomy() {
  const { user, updateUser } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate rewards for article submission
  const calculateSubmissionReward = (articleQuality: number, sourcesCount: number) => {
    const baseReward = 10 // Base tokens for submission
    const qualityMultiplier = articleQuality / 10 // Quality score from 0-10
    const sourcesBonus = Math.min(sourcesCount * 0.5, 5) // Bonus for sources, max 5 tokens

    return Math.round((baseReward * qualityMultiplier + sourcesBonus) * 100) / 100
  }

  // Calculate rewards for article analysis
  const calculateAnalysisReward = (rating: number, commentLength: number) => {
    const baseReward = 5 // Base tokens for analysis
    const effortMultiplier = Math.min(commentLength / 500, 2) // Effort based on comment length, max 2x
    const reputationBonus = user?.credibilityScore ? (user.credibilityScore / 100) * 2 : 1 // Reputation bonus

    return Math.round(baseReward * effortMultiplier * reputationBonus * 100) / 100
  }

  // Calculate rewards for article validation
  const calculateValidationReward = (consensusAlignment: number) => {
    const baseReward = 3 // Base tokens for validation
    const stakeBonus = user?.staked ? (user.staked / 100) * 2 : 0 // Bonus for staked tokens
    const consensusMultiplier = 0.5 + consensusAlignment / 2 // 0.5-1.5x based on consensus alignment

    return Math.round((baseReward + stakeBonus) * consensusMultiplier * 100) / 100
  }

  // Stake tokens
  const stakeTokens = async (amount: number) => {
    if (!user || amount <= 0 || amount > (user.balance || 0)) {
      return { success: false, message: "Invalid amount or insufficient balance" }
    }

    setIsProcessing(true)
    try {
      // Simulate API call to blockchain
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user state
      const newBalance = (user.balance || 0) - amount
      const newStaked = (user.staked || 0) + amount

      // Add transaction to history
      const transaction: TokenTransaction = {
        amount,
        type: "stake",
        timestamp: new Date(),
        description: "Tokens staked for increased platform influence",
      }

      const updatedUser = {
        ...user,
        balance: newBalance,
        staked: newStaked,
        transactions: [...(user.transactions || []), transaction],
      }

      updateUser(updatedUser)

      return { success: true, message: "Tokens staked successfully" }
    } catch (error) {
      console.error("Error staking tokens:", error)
      return { success: false, message: "Failed to stake tokens" }
    } finally {
      setIsProcessing(false)
    }
  }

  // Unstake tokens
  const unstakeTokens = async (amount: number) => {
    if (!user || amount <= 0 || amount > (user.staked || 0)) {
      return { success: false, message: "Invalid amount or insufficient staked tokens" }
    }

    setIsProcessing(true)
    try {
      // Simulate API call to blockchain
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user state
      const newBalance = (user.balance || 0) + amount
      const newStaked = (user.staked || 0) - amount

      // Add transaction to history
      const transaction: TokenTransaction = {
        amount,
        type: "unstake",
        timestamp: new Date(),
        description: "Tokens unstaked and returned to balance",
      }

      const updatedUser = {
        ...user,
        balance: newBalance,
        staked: newStaked,
        transactions: [...(user.transactions || []), transaction],
      }

      updateUser(updatedUser)

      return { success: true, message: "Tokens unstaked successfully" }
    } catch (error) {
      console.error("Error unstaking tokens:", error)
      return { success: false, message: "Failed to unstake tokens" }
    } finally {
      setIsProcessing(false)
    }
  }

  // Claim rewards
  const claimReward = async (amount: number, description: string) => {
    if (!user || amount <= 0) {
      return { success: false, message: "Invalid reward amount" }
    }

    setIsProcessing(true)
    try {
      // Simulate API call to blockchain
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user state
      const newBalance = (user.balance || 0) + amount

      // Add transaction to history
      const transaction: TokenTransaction = {
        amount,
        type: "reward",
        timestamp: new Date(),
        description,
      }

      const updatedUser = {
        ...user,
        balance: newBalance,
        transactions: [...(user.transactions || []), transaction],
      }

      updateUser(updatedUser)

      return { success: true, message: "Reward claimed successfully" }
    } catch (error) {
      console.error("Error claiming reward:", error)
      return { success: false, message: "Failed to claim reward" }
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    calculateSubmissionReward,
    calculateAnalysisReward,
    calculateValidationReward,
    stakeTokens,
    unstakeTokens,
    claimReward,
    isProcessing,
  }
}
