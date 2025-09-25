// models/Question.js

import mongoose from "mongoose";
import { CATGEORY } from "../constants/constants";
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String, 
    required: true,
    enum:CATGEORY
  },
});

module.exports = mongoose.model("Question", questionSchema);
