import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { accountModel } from "../models/accounts.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const account = await accountModel.findOne({ username });
  // searches database collection for username

  if (account) {
    // if username is already present, can't re-register
    return res.json({ message: "Username is taken." });
  }

  const encryptedPassword = await bcrypt.hash(password, 15);
  const newAccount = new accountModel({
    username,
    password: encryptedPassword,
  });
  newAccount.save();
  // else, encrypt password and add account details to account database collection

  res.json({ message: "User successfully registered." });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const account = await accountModel.findOne({ username });
  if (!account) {
    return res.json({ message: "Account not found." });
  }

  const correctPassword = await bcrypt.compare(password, account.password);
  if (!correctPassword) {
    return res.json({ message: "Invalid password." });
  }

  dotenv.config();
  const secret = process.env.SECRET;
  const token = jwt.sign({ id: account._id }, secret);
  res.json({ token, userID: account._id });
});

export { router as accountRouter };
