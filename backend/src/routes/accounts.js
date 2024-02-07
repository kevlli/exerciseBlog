import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

  const hashedPassword = await bcrypt.hash(password, 15);
  const newAccount = new accountModel({ username, password: hashedPassword });
  newAccount.save();
  // else, encrypt password and add account details to account database collection

  res.json({ message: "User successfully registered." });
});

router.post("/login");

export { router as accountRouter };
