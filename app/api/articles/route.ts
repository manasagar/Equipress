import { type NextRequest, NextResponse } from "next/server"
import { connectMongo } from "@/lib/mongodb"
import Article from "@/models/Article"
import User from "@/models/User"
import mongoose from "mongoose"

export async function GET(req: NextRequest) {
  try {
    await connectMongo()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const language = searchParams.get("language")
    const region = searchParams.get("region")

    const query: any = {}

    if (status) query.status = status
    if (category) query.category = category
    if (language) query.language = language
    if (region) query.region = region

    const articles = await Article.find(query)
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo()

    const body = await req.json()
    const { title, content, summary, authorId, ipfsHash, category, tags, language, region } = body

    if (!title || !content || !summary || !authorId || !ipfsHash || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify author exists
    const author = await User.findById(authorId)
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    const newArticle = new Article({
      title,
      content,
      summary,
      author: authorId,
      ipfsHash,
      category,
      tags: tags || [],
      language: language || "en",
      region: region || "global",
    })

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await newArticle.save({ session })

      // Update user's articles array
      await User.findByIdAndUpdate(authorId, { $push: { articles: newArticle._id } }, { session })

      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
