// models/Question.js

import mongoose from "mongoose";
import { CATGEORY } from "../constants/constants.js";

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },                   
},{ _id: true });
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
          optionSchema,
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
