import { type NextRequest, NextResponse } from "next/server"
import { connectMongo } from "@/lib/mongodb"
import Article from "@/models/Article"
import User from "@/models/User"
import Validation from "@/models/Validation"
import mongoose from "mongoose"

export async function POST(req: NextRequest) {
  try {
    await connectMongo()

    const { articleId, userId, vote, comment } = await req.json()

    if (!articleId || !userId || !vote) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify article and user exist
    const article = await Article.findById(articleId)
    const user = await User.findById(userId)

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user has already voted on this article
    const existingVote = await Validation.findOne({
      article: articleId,
      validator: userId,
    })

    if (existingVote) {
      return NextResponse.json({ error: "You have already voted on this article" }, { status: 400 })
    }

    // Calculate reward based on user's reputation and staked tokens
    const baseReward = 3
    const reputationBonus = (user.credibilityScore / 100) * 1.5
    const stakeBonus = (user.stakedTokens / 100) * 2
    const calculatedReward = Math.round((baseReward + stakeBonus) * reputationBonus * 100) / 100

    // Create new validation
    const validation = new Validation({
      article: articleId,
      validator: userId,
      vote,
      comment: comment || "",
      reward: calculatedReward,
    })

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await validation.save({ session })

      // Update article's validations array
      await Article.findByIdAndUpdate(articleId, { $push: { validations: validation._id } }, { session })

      // Update user's validations array and add pending reward
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { validations: validation._id },
          $inc: { tokens: calculatedReward },
        },
        { session },
      )

      // Check if article has enough validations to update status
      const validations = await Validation.find({ article: articleId })

      if (validations.length >= 5) {
        // Count approve and reject votes
        const approveCount = validations.filter((v) => v.vote === "approve").length
        const rejectCount = validations.filter((v) => v.vote === "reject").length
        const totalVotes = validations.length

        // If 75% or more approve, mark as published
        if (approveCount / totalVotes >= 0.75) {
          await Article.findByIdAndUpdate(articleId, { status: "published" }, { session })
        }
        // If 75% or more reject, mark as rejected
        else if (rejectCount / totalVotes >= 0.75) {
          await Article.findByIdAndUpdate(articleId, { status: "rejected" }, { session })
        }
      }

      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }

    return NextResponse.json({
      message: "Vote recorded successfully",
      reward: calculatedReward,
      validation,
    })
  } catch (error) {
    console.error("Error recording vote:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
