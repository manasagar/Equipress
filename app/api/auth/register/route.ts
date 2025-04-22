import { NextResponse } from "next/server"
import { connectMongo } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    await connectMongo()

    const { username, email, password, role, bio, expertiseAreas } = await req.json()

    // Validate required fields
    if (!username || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email or username already exists" }, { status: 409 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      bio: bio || "",
      expertiseAreas: expertiseAreas || [],
      credibilityScore: 50, // Default starting score
      reputation: 0,
      tokens: 100, // Starting tokens
      stakedTokens: 0,
      language: "en",
      region: "global",
    })

    await newUser.save()

    // Remove password from response
    const userResponse = newUser.toObject()
    delete userResponse.password

    return NextResponse.json({ message: "User registered successfully", user: userResponse }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
