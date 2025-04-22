"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import {
  Coins,
  ArrowUpRight,
  LockKeyhole,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { useTokenEconomy } from "@/hooks/use-token-economy";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/language-context";

export function TokenEconomy() {
  const { user } = useAuth();
  const { translate } = useLanguage();
  const { stakeTokens, unstakeTokens, claimReward, isProcessing } =
    useTokenEconomy();
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Token data from user
  const tokenData = {
    balance: user?.balance || 0,
    staked: user?.staked || 0,
    rewards: user?.pendingRewards || 0,
    stakingAPY: 12.5, // This could be fetched from a contract or API
  };

  const handleStake = async () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) return;

    const result = await stakeTokens(Number.parseFloat(stakeAmount));
    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setStakeAmount("");
    } else {
      setMessage({ type: "error", text: result.message });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || Number.parseFloat(unstakeAmount) <= 0) return;

    const result = await unstakeTokens(Number.parseFloat(unstakeAmount));
    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setUnstakeAmount("");
    } else {
      setMessage({ type: "error", text: result.message });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleClaimRewards = async () => {
    if (tokenData.rewards <= 0) return;

    const result = await claimReward(
      tokenData.rewards,
      translate("pendingRewardsClaimed")
    );

    if (result.success) {
      setMessage({ type: "success", text: result.message });
    } else {
      setMessage({ type: "error", text: result.message });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" /> {translate("tokenEconomy")}
        </CardTitle>
        <CardDescription>{translate("manageTokensAndStaking")}</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert
            className={`mb-6 ${
              message.type === "success"
                ? "bg-green-500/10"
                : "bg-destructive/10"
            }`}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {message.type === "success"
                ? translate("success")
                : translate("error")}
            </AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">
              {translate("balance")}
            </div>
            <div className="mt-1 flex items-center gap-1 text-2xl font-bold">
              {tokenData.balance}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ETH
              </span>
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">
              {translate("staked")}
            </div>
            <div className="mt-1 flex items-center gap-1 text-2xl font-bold">
              {tokenData.staked}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ETH
              </span>
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">
              {translate("rewards")}
            </div>
            <div className="mt-1 flex items-center gap-1 text-2xl font-bold">
              {tokenData.rewards}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ETH
              </span>
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">
              {translate("stakingAPY")}
            </div>
            <div className="mt-1 flex items-center gap-1 text-2xl font-bold">
              {tokenData.stakingAPY}%
            </div>
          </div>
        </div>

        <Tabs defaultValue="stake">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stake">{translate("stake")}</TabsTrigger>
            <TabsTrigger value="unstake">{translate("unstake")}</TabsTrigger>
            <TabsTrigger value="rewards">{translate("rewards")}</TabsTrigger>
          </TabsList>
          <TabsContent value="stake" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stake-amount">{translate("amountToStake")}</Label>
              <div className="flex gap-2">
                <Input
                  id="stake-amount"
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <Button
                  onClick={handleStake}
                  disabled={
                    isProcessing ||
                    !stakeAmount ||
                    Number.parseFloat(stakeAmount) <= 0 ||
                    Number.parseFloat(stakeAmount) > tokenData.balance
                  }
                >
                  <LockKeyhole className="mr-2 h-4 w-4" /> {translate("stake")}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {translate("stakingIncreasesInfluence")}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="unstake" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unstake-amount">
                {translate("amountToUnstake")}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="unstake-amount"
                  type="number"
                  placeholder="0.00"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                />
                <Button
                  onClick={handleUnstake}
                  disabled={
                    isProcessing ||
                    !unstakeAmount ||
                    Number.parseFloat(unstakeAmount) <= 0 ||
                    Number.parseFloat(unstakeAmount) > tokenData.staked
                  }
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />{" "}
                  {translate("unstake")}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {translate("unstakingReducesInfluence")}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="rewards" className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">{translate("availableRewards")}</h3>
                <p className="mt-2 text-2xl font-bold">
                  {tokenData.rewards} ETH
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {translate("rewardsEarnedBasedOn")}
                </p>
                <Button
                  className="mt-4"
                  onClick={handleClaimRewards}
                  disabled={isProcessing || tokenData.rewards <= 0}
                >
                  {translate("claimRewards")}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          {translate("lastUpdated")}: {new Date().toLocaleString()}
        </div>
        <Button variant="outline" size="sm">
          <BarChart3 className="mr-2 h-4 w-4" /> {translate("viewHistory")}
        </Button>
      </CardFooter>
    </Card>
  );
}
