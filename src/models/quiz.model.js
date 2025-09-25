import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
const quizModel= mongoose.model("Quiz", quizSchema);

export default quizModel;
