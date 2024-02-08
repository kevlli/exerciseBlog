import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { accountRouter } from "./routes/accounts.js";
import { exerciseRouter } from "./routes/exercises.js";

dotenv.config();
const pswd = process.env.MONGOPSWD;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", accountRouter);
app.use("/exercise", exerciseRouter);

mongoose.connect(
  `mongodb+srv://kevlli:${pswd}@exercises.z8z7xbu.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(3001, () => console.log("Server is up"));
