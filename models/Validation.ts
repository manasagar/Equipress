import mongoose, { Schema, type Document } from "mongoose"

export interface IValidation extends Document {
  article: mongoose.Types.ObjectId
  validator: mongoose.Types.ObjectId
  vote: "approve" | "reject"
  comment: string
  reward: number
  createdAt: Date
  updatedAt: Date
}

const ValidationSchema = new Schema<IValidation>(
  {
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    validator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vote: {
      type: String,
      required: true,
      enum: ["approve", "reject"],
    },
    comment: { type: String },
    reward: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Validation || mongoose.model<IValidation>("Validation", ValidationSchema)
