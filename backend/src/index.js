import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { accountRouter } from "./routes/accounts.js";

dotenv.config();
const pswd = process.env.MONGOPSWD;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", accountRouter);

mongoose.connect(
  `mongodb+srv://kevlli:${pswd}@recipes.8mnryir.mongodb.net/recipes?retryWrites=true&w=majority`
);

app.listen(3001, () => console.log("Server is up"));
