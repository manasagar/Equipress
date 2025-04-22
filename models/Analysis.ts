import mongoose, { Schema, type Document } from "mongoose"

export interface IAnalysis extends Document {
  article: mongoose.Types.ObjectId
  analyzer: mongoose.Types.ObjectId
  content: string
  score: number
  issues: string[]
  sources: string[]
  status: "pending" | "approved" | "rejected"
  reward: number
  createdAt: Date
  updatedAt: Date
}

const AnalysisSchema = new Schema<IAnalysis>(
  {
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    analyzer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    issues: [{ type: String }],
    sources: [{ type: String }],
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reward: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Analysis || mongoose.model<IAnalysis>("Analysis", AnalysisSchema)
