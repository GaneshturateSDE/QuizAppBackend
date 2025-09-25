import Router from 'express';
import questionController from '../controllers/question.controller.js';

const questionRouter = Router();

questionRouter.post('/',questionController.addQuestion)
questionRouter.get('/',questionController.getAllQuestions)
questionRouter.get('/:id',questionController.getQuestionById)
questionRouter.put('/:id',questionController.updateQuestionById)
questionRouter.delete('/:id',questionController.deleteQuestionById)

export default questionRouter;