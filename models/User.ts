import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  address: string
  username: string
  role: "reporter" | "analyzer" | "validator" | "admin"
  credibilityScore: number
  reputation: number
  tokens: number
  stakedTokens: number
  articles: mongoose.Types.ObjectId[]
  analyses: mongoose.Types.ObjectId[]
  validations: mongoose.Types.ObjectId[]
  profileImage?: string
  bio?: string
  email?: string
  language: string
  region: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    address: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["reporter", "analyzer", "validator", "admin"],
      default: "reporter",
    },
    credibilityScore: { type: Number, default: 50 },
    reputation: { type: Number, default: 0 },
    tokens: { type: Number, default: 0 },
    stakedTokens: { type: Number, default: 0 },
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    analyses: [{ type: Schema.Types.ObjectId, ref: "Analysis" }],
    validations: [{ type: Schema.Types.ObjectId, ref: "Validation" }],
    profileImage: { type: String },
    bio: { type: String },
    email: { type: String },
    language: { type: String, default: "en" },
    region: { type: String, default: "global" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
