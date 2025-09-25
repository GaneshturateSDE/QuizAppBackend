// models/Question.js

import mongoose from "mongoose";
import { CATGEORY } from "../constants/constants.js";
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

const questionModel= mongoose.model("Question", questionSchema);
export default questionModel;
