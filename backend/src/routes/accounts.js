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

  if (password.length <= 5) {
    return res.json({ message: "Password must be more than 5 characters." });
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
  // in the case of login, finds if the account is registered.
  if (!account) {
    return res.status(400).json({ message: "Account not found." });
  }
  // compares password with encrypted hash stored in database
  const correctPassword = await bcrypt.compare(password, account.password);
  if (!correctPassword) {
    return res.status(400).json({ message: "Invalid password." });
  }

  dotenv.config();
  // utilizing env variables to hide secret encryption key

  const token = jwt.sign({ id: account._id }, process.env.SECRET);
  res.json({ token, userID: account._id });
});

export { router as accountRouter };

export const verifyJWT = (req, res, next) => {
  // uses middlware to validate token.
  // Runs before every important api request that requires authentification
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
