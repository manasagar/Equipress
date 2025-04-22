import { type NextRequest, NextResponse } from "next/server"
import { connectMongo } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  try {
    await connectMongo()

    const { userId, amount, action } = await req.json()

    if (!userId || !amount || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (action !== "stake" && action !== "unstake") {
      return NextResponse.json({ error: "Invalid action. Must be 'stake' or 'unstake'" }, { status: 400 })
    }

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (action === "stake") {
      // Check if user has enough tokens
      if (user.tokens < amount) {
        return NextResponse.json({ error: "Insufficient tokens" }, { status: 400 })
      }

      // Update user's tokens and staked tokens
      await User.findByIdAndUpdate(userId, {
        $inc: {
          tokens: -amount,
          stakedTokens: amount,
        },
      })

      return NextResponse.json({
        message: "Tokens staked successfully",
        stakedAmount: amount,
        newStakedTotal: user.stakedTokens + amount,
        newTokenBalance: user.tokens - amount,
      })
    } else {
      // Check if user has enough staked tokens
      if (user.stakedTokens < amount) {
        return NextResponse.json({ error: "Insufficient staked tokens" }, { status: 400 })
      }

      // Update user's tokens and staked tokens
      await User.findByIdAndUpdate(userId, {
        $inc: {
          tokens: amount,
          stakedTokens: -amount,
        },
      })

      return NextResponse.json({
        message: "Tokens unstaked successfully",
        unstakedAmount: amount,
        newStakedTotal: user.stakedTokens - amount,
        newTokenBalance: user.tokens + amount,
      })
    }
  } catch (error) {
    console.error("Error processing stake/unstake:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
