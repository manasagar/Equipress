import { type NextRequest, NextResponse } from "next/server"
import { connectMongo } from "@/lib/mongodb"
import Article from "@/models/Article"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo()

    const id = params.id

    const article = await Article.findById(id)
      .populate("author", "username profileImage")
      .populate({
        path: "analyses",
        populate: {
          path: "analyzer",
          select: "username profileImage credibilityScore",
        },
      })
      .populate({
        path: "validations",
        populate: {
          path: "validator",
          select: "username profileImage credibilityScore",
        },
      })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Increment view count
    await Article.findByIdAndUpdate(id, { $inc: { views: 1 } })

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo()

    const id = params.id
    const body = await req.json()

    // Don't allow changing author or ipfsHash
    delete body.author
    delete body.ipfsHash

    const article = await Article.findByIdAndUpdate(id, { $set: body }, { new: true })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
