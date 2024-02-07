import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
});

export const accountModel = mongoose.model("accounts", accountSchema);
