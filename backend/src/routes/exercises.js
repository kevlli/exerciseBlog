import { exerciseModel } from "../models/Exercises.js";
import { accountModel } from "../models/accounts.js";
import mongoose from "mongoose";
import express from "express";
import { verifyJWT } from "./accounts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // home page lists all exercises
    const response = await exerciseModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyJWT, async (req, res) => {
  const exercise = new exerciseModel(req.body);
  try {
    const response = await exercise.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verifyJWT, async (req, res) => {
  try {
    const exercise = await exerciseModel.findById(req.body.exerciseID);
    const account = await accountModel.findById(req.body.userID);
    // adds this exercise to the account's saved exercises array
    account.savedExercises.push(exercise);
    await account.save();
    res.json({ savedExercises: account.savedExercises });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedExercises/ids/:userID", async (req, res) => {
  try {
    const account = await accountModel.findById(req.params.userID);
    // retrieves the saved exercises of the account with that user id
    res.json({ savedExercises: account?.savedExercises });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedExercises/:userID", async (req, res) => {
  try {
    const account = await accountModel.findById(req.params.userID);
    const savedExercises = await exerciseModel.find({
      _id: { $in: account.savedExercises },
    });
    res.json({ savedExercises });
  } catch (err) {
    res.json(err);
  }
});

export { router as exerciseRouter };
