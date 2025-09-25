import Joi from "joi";
import { CATGEORY } from "../constants/constants.js";


const questionValidationSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  options: Joi.array().items(Joi.string().min(1).max(255)).min(2).required(),
  answer: Joi.string().min(1).max(255).required(),
  category: Joi.string()
    .valid(...CATGEORY)
    .required(),
});

const questionUpdateValidationSchema=Joi.object({
  title: Joi.string().min(3).max(255),
  options: Joi.array().items(Joi.string().min(1).max(255)).min(2).required(),
  answer: Joi.string().min(1).max(255).required(),
  category: Joi.string()
    .valid(...CATGEORY),
})
export { questionValidationSchema ,questionUpdateValidationSchema};