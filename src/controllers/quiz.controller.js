import models from '../models/index.model.js';
import { calculateScore } from '../utils/quizUtils.js';
import { quizSchema } from '../Validations/quiz.validation.js';

const addQuiz =async (req, res) => {
   try {
     const quizBody = req.body;
     const {error}= quizSchema.validate(quizBody);
     if(error){
        return res.status(400).json({error:error.details[0].message});
     }
     
     const newQuiz = await models.quizModel.create(quizBody);
  
     return res.status(201).json({quizBody,"message":"Quiz added successfully"});
   } catch (error) {
        return res.status(500).json({ error: error.message });
   }
    
}


const getAllQuizzes =async (req, res) => {
  try {
    const quizzes = await models.quizModel.find().populate({path: "questions",
      select: "-answer",}); ;
     if(!quizzes || quizzes.length===0){
      return res.status(404).json({message:"No quizzes found"});
     }
      return res.status(200).json({quizzes});
  } catch (error) {
        return res.status(500).json({ error: error.message });
  }
}


const getQuizById = async(req, res) => {
   try {
    const {id} = req.params;
    const quiz = await models.quizModel.findById(id).populate("questions");
    if(!quiz){
      return res.status(404).json({message:"Quiz not found"});
    }
    return res.status(200).json({quiz});    
   } catch (error) {
        return res.status(500).json({ error: error.message });
   }
}




const updateQuizById =async (req, res) => {
    try {
        const {id} = req.params;    
        const updateData = req.body;
        const {error}= quizSchema.validate(updateData);
        if(error){
           return res.status(400).json({error:error.details[0].message});
        }
        const updatedQuiz = await models.quizModel.findByIdAndUpdate(id, updateData, {new:true});
        if(!updatedQuiz){
          return res.status(404).json({message:"Quiz not found"});
        }
        return res.status(200).json({updatedQuiz,"message":"Quiz updated successfully"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}






const deleteQuizById =async(req, res) => {
    try {
        const {id} = req.params;    
        const deletedQuiz = await models.quizModel.findByIdAndDelete(id);
        if(!deletedQuiz){
          return res.status(404).json({message:"Quiz not found"});
        }
        return res.status(200).json({deletedQuiz,"message":"Quiz deleted successfully"});           
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const submitQuiz=async(req, res) => {
    try {
        const {id} = req.params;    
        const {answers} = req.body; 
        
        const quiz = await models.quizModel.findById(id).populate("questions");
        if(!quiz){
          return res.status(404).json({message:"Quiz not found"});
        }

        return res.status(200).json(calculateScore(quiz.questions,answers));           
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default {
    addQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuizById,
    deleteQuizById,
    submitQuiz
};