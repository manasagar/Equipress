import mongoose, { Schema, type Document } from "mongoose"

export interface IToken extends Document {
  user: mongoose.Types.ObjectId
  amount: number
  type: "reward" | "stake" | "unstake" | "transfer"
  description: string
  relatedEntity?: mongoose.Types.ObjectId
  createdAt: Date
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["reward", "stake", "unstake", "transfer"],
  },
  description: { type: String, required: true },
  relatedEntity: { type: Schema.Types.ObjectId, refPath: "onModel" },
  onModel: {
    type: String,
    enum: ["Article", "Analysis", "Validation", "User"],
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Token || mongoose.model<IToken>("Token", TokenSchema)
