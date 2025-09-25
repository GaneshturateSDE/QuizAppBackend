import models from "../models/index.model.js";
import { questionValidationSchema } from "../Validations/question.validation.js";

const addQuestion = async(req, res) => {
   try {
    const questionBody = req.body;
    
    const {error}=questionValidationSchema.validate(questionBody);
    if(error){
      return res.status(400).json({message:error.details[0].message});
    }
      const question=await models.questionModel.findOne({title:questionBody.title});
      if(question){
        return res.status(409).json({message:"Question  already exists"});
      }
    await models.questionModel.create(questionBody);
    return res.status(201).json({questionBody,"message":"Question added successfully"});
   } catch (error) {
    return res.status(500).json({message:"Something went wrong",error:error.message});
   }
}
const getAllQuestions = async(req, res) => {
    let {query}=req
     if (Object.keys(query).length === 0) { query={}; }
    const questions = await models.questionModel.find(query);
    if(!questions || questions.length===0){
      return res.status(404).json({message:"No questions found"});
    }
    return  res.status(200).json({questions});
}
const getQuestionById = async(req, res) => {
    try {
        const question = await models.questionModel.findById(req.params.id);
        if(!question){
          return res.status(404).json({message:"Question not found"});
        }
        return res.status(200).json({question});
    } catch (error) {
        return res.status(500).json({message:"Something went wrong",error:error.message});
    }
}

const updateQuestionById = async(req, res) => {
     try {
        const questions=await models.questionModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!questions){
          return res.status(404).json({message:"Question not found"});  
        }
        return res.status(200).json({questions,"message":"Question updated successfully"});
     } catch (error) {
        return res.status(500).json({message:"Something went wrong",error:error.message});
     }
}
const deleteQuestionById = async(req, res) => {
    try {
        const questions=await models.questionModel.findByIdAndDelete(req.params.id);
        if(!questions){
          return res.status(404).json({message:"Question not found"});  
        }
        return res.status(200).json({message:"Question deleted successfully"});
    } catch (error) {
        return res.status(500).json({message:"Something went wrong",error:error.message});
    }   
}

export default {
    addQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById,
};


