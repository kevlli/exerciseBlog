import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://kevlli:fullStackTIME@recipes.8mnryir.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server is up"));
