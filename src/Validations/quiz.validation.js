import Joi from "joi";

const quizSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  questions: Joi.array()
    .items(String)
    .min(1)
    .required()
    .messages({
      "array.base": "Questions must be an array",
      "array.min": "At least one question is required",
    }),
    createdAt: Joi.date().default(Date.now),
});

export { quizSchema };