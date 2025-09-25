import mongoose from "mongoose";

const quizSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String, 
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);