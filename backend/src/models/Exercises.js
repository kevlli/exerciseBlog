import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  equipment: [{ type: String, required: true }],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  duration: { type: Number, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
});

export const exerciseModel = mongoose.model("exercises", exerciseSchema);
