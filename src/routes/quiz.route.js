
import { Router } from 'express';
import quizController from '../controllers/quiz.controller.js';
const quizRouter=Router();

quizRouter.get('/',quizController.getAllQuizzes)
quizRouter.post('/',quizController.addQuiz)
quizRouter.post("/submit/:id",quizController.submitQuiz)
quizRouter.get('/:id',quizController.getQuizById)
quizRouter.put('/:id',quizController.updateQuizById)
quizRouter.delete('/:id',quizController.deleteQuizById)

export default quizRouter;
