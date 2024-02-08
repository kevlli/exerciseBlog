import { exerciseModel } from "../models/Exercises.js";
import { accountModel } from "../models/accounts.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await exerciseModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const exercise = new exerciseModel(req.body);
  try {
    const response = await exercise.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const exercise = await exerciseModel.findById(req.body.exerciseID);
    const account = await accountModel.findById(req.body.userID);
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
