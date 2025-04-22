"use client"

import { useState } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Coins, LockIcon, UnlockIcon, TrendingUp } from "lucide-react"
import { stakeTokens, unstakeTokens } from "@/services/token-service"
import { useToast } from "@/components/ui/use-toast"

export function StakingInterface() {
  const { user } = useWallet()
  const { toast } = useToast()
  const [stakeAmount, setStakeAmount] = useState(0)
  const [unstakeAmount, setUnstakeAmount] = useState(0)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const availableTokens = user?.tokens || 0
  const stakedTokens = user?.stakedTokens || 0

  // Calculate APY based on staked amount (just for demonstration)
  const calculateAPY = (amount: number) => {
    // Base APY is 5%, increases with amount staked
    const baseAPY = 5
    const bonusAPY = Math.min(amount / 100, 10) // Max 10% bonus
    return baseAPY + bonusAPY
  }

  const currentAPY = calculateAPY(stakedTokens)

  const handleStake = async () => {
    if (!user || stakeAmount <= 0 || stakeAmount > availableTokens) return

    setIsStaking(true)
    try {
      const success = await stakeTokens(user._id, stakeAmount)

      if (success) {
        toast({
          title: "Tokens Staked",
          description: `Successfully staked ${stakeAmount} tokens.`,
        })
        setStakeAmount(0)
        // In a real app, you would refresh the user data here
      } else {
        toast({
          title: "Staking Failed",
          description: "There was an error staking your tokens.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error staking tokens:", error)
      toast({
        title: "Staking Failed",
        description: "There was an error staking your tokens.",
        variant: "destructive",
      })
    } finally {
      setIsStaking(false)
    }
  }

  const handleUnstake = async () => {
    if (!user || unstakeAmount <= 0 || unstakeAmount > stakedTokens) return

    setIsUnstaking(true)
    try {
      const success = await unstakeTokens(user._id, unstakeAmount)

      if (success) {
        toast({
          title: "Tokens Unstaked",
          description: `Successfully unstaked ${unstakeAmount} tokens.`,
        })
        setUnstakeAmount(0)
        // In a real app, you would refresh the user data here
      } else {
        toast({
          title: "Unstaking Failed",
          description: "There was an error unstaking your tokens.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error unstaking tokens:", error)
      toast({
        title: "Unstaking Failed",
        description: "There was an error unstaking your tokens.",
        variant: "destructive",
      })
    } finally {
      setIsUnstaking(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LockIcon className="h-5 w-5 text-primary" />
            Stake Tokens
          </CardTitle>
          <CardDescription>Stake your EQP tokens to earn rewards and increase your influence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="stake-amount">Amount to Stake</Label>
              <span className="text-sm text-muted-foreground">Available: {availableTokens} EQP</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="stake-amount"
                type="number"
                min={0}
                max={availableTokens}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
              />
              <Button variant="outline" size="sm" onClick={() => setStakeAmount(availableTokens)}>
                Max
              </Button>
            </div>
            <Slider
              value={[stakeAmount]}
              max={availableTokens}
              step={1}
              onValueChange={(value) => setStakeAmount(value[0])}
              className="py-4"
            />
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">Estimated APY</span>
              <span className="font-medium text-green-600">{calculateAPY(stakeAmount + stakedTokens).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Voting Power Increase</span>
              <span className="font-medium">{(stakeAmount * 2).toFixed(0)} VP</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleStake}
            disabled={stakeAmount <= 0 || stakeAmount > availableTokens || isStaking}
          >
            {isStaking ? "Staking..." : "Stake Tokens"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UnlockIcon className="h-5 w-5 text-primary" />
            Unstake Tokens
          </CardTitle>
          <CardDescription>Withdraw your staked tokens back to your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="unstake-amount">Amount to Unstake</Label>
              <span className="text-sm text-muted-foreground">Staked: {stakedTokens} EQP</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="unstake-amount"
                type="number"
                min={0}
                max={stakedTokens}
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(Number(e.target.value))}
              />
              <Button variant="outline" size="sm" onClick={() => setUnstakeAmount(stakedTokens)}>
                Max
              </Button>
            </div>
            <Slider
              value={[unstakeAmount]}
              max={stakedTokens}
              step={1}
              onValueChange={(value) => setUnstakeAmount(value[0])}
              className="py-4"
            />
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">Current APY</span>
              <span className="font-medium text-green-600">{currentAPY.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">New APY After Unstaking</span>
              <span className="font-medium text-green-600">
                {calculateAPY(stakedTokens - unstakeAmount).toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm">Voting Power Decrease</span>
              <span className="font-medium text-red-500">-{(unstakeAmount * 2).toFixed(0)} VP</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleUnstake}
            disabled={unstakeAmount <= 0 || unstakeAmount > stakedTokens || isUnstaking}
            variant="outline"
          >
            {isUnstaking ? "Unstaking..." : "Unstake Tokens"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Staking Statistics
          </CardTitle>
          <CardDescription>Overview of your staking activity and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <Coins className="mx-auto mb-2 h-8 w-8 text-primary" />
              <h3 className="text-lg font-medium">Total Staked</h3>
              <p className="text-2xl font-bold">{stakedTokens} EQP</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-500" />
              <h3 className="text-lg font-medium">Current APY</h3>
              <p />
              <h3 className="text-lg font-medium">Current APY</h3>
              <p className="text-2xl font-bold">{currentAPY.toFixed(2)}%</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <LockIcon className="mx-auto mb-2 h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-medium">Voting Power</h3>
              <p className="text-2xl font-bold">{(stakedTokens * 2).toFixed(0)} VP</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium">Staking Benefits</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Higher voting power in platform governance decisions</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Earn passive rewards based on your staking amount</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Increased credibility score and reputation</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Access to premium features and early content</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
