import express from 'express';
import {login, perguntas01} from '../controllers/main'
import { authMiddleware } from '../middlewares/auth';


const router = express.Router();

router.route('/login').post(login);
router.route('/pergunta01').get(authMiddleware, perguntas01);

export {router as mainRouter};

