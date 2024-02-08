import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  savedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "exercises" }],
});

export const accountModel = mongoose.model("accounts", accountSchema);
