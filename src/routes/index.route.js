import { Router } from 'express';
const apiRouter=Router();

import questionRouter from './question.route.js';
import quizRouter from './quiz.route.js';


apiRouter.use('/questions',questionRouter);
apiRouter.use('/quizs',quizRouter);


export default apiRouter;
