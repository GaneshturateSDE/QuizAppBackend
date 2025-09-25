import models from "../models/index.model.js";
import {
  questionUpdateValidationSchema,
  questionValidationSchema,
} from "../Validations/question.validation.js";

const addQuestion = async (req, res) => {
  try {
    const { title, options, answer, category } = req.body;

   
    const { error } = questionValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

   
    const existingQuestion = await models.questionModel.findOne({ title });
    if (existingQuestion) {
      return res.status(409).json({ message: "Question already exists" });
    }

   
    if (!options.includes(answer)) {
      return res.status(400).json({ message: "Answer must be one of the options" });
    }

    
    const optionDocs = options.map(opt => ({ option: opt }));
  

    const questionDoc = new models.questionModel({
      title,
      options: optionDocs,
      answer: "",
      category
    });
    const correctOption = questionDoc.options.find(opt => opt.option === answer);

    questionDoc.answer = correctOption._id;

    await questionDoc.save();

    return res.status(201).json({
      message: "Question added successfully",
      data: questionDoc
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const getAllQuestions = async (req, res) => {
  let { query } = req;
  if (Object.keys(query).length === 0) {
    query = {};
  }
  const questions = await models.questionModel.find(query);
  if (!questions || questions.length === 0) {
    return res.status(404).json({ message: "No questions found" });
  }
  return res.status(200).json({ questions });
};
const getQuestionById = async (req, res) => {
  try {
    const question = await models.questionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ question });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const updateQuestionById = async (req, res) => {
  try {
    const { error } = questionUpdateValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, options, answer, category } = req.body;

    const question = await models.questionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }


    if (title) question.title = title;
    if (category) question.category = category;


    if (options && options.length > 0) {
      question.options = options.map(opt => ({ option: opt }));


      let correctOption;

      if (typeof answer === "string") {
        correctOption = question.options.find(opt => opt.option === answer);
      }

      if (!correctOption) {
        return res.status(400).json({ message: "Answer must match one of the options" });
      }

      question.answer = correctOption._id;
    }

    await question.save();

    return res.status(200).json({
      data: question,
      message: "Question updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }

};
const deleteQuestionById = async (req, res) => {
  try {
    const questions = await models.questionModel.findByIdAndDelete(
      req.params.id
    );
    if (!questions) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export default {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
