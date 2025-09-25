
import mongoose from "mongoose";
const quizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      userAnswer: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
  result: {
    total: Number,
    correct: Number,
    wrong: Number,
    score: String, 
  },
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
