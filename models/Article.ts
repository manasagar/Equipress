import mongoose, { Schema, type Document } from "mongoose"

export interface IArticle extends Document {
  title: string
  content: string
  summary: string
  author: mongoose.Types.ObjectId
  ipfsHash: string
  status: "pending" | "analyzing" | "validating" | "published" | "rejected"
  category: string
  tags: string[]
  credibilityScore: number
  analyses: mongoose.Types.ObjectId[]
  validations: mongoose.Types.ObjectId[]
  views: number
  language: string
  region: string
  factCheckResults?: {
    score: number
    issues: string[]
    sources: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ipfsHash: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "analyzing", "validating", "published", "rejected"],
      default: "pending",
    },
    category: { type: String, required: true },
    tags: [{ type: String }],
    credibilityScore: { type: Number, default: 0 },
    analyses: [{ type: Schema.Types.ObjectId, ref: "Analysis" }],
    validations: [{ type: Schema.Types.ObjectId, ref: "Validation" }],
    views: { type: Number, default: 0 },
    language: { type: String, default: "en" },
    region: { type: String, default: "global" },
    factCheckResults: {
      score: { type: Number },
      issues: [{ type: String }],
      sources: [{ type: String }],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema)
