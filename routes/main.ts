import express from 'express';
import {login, novaPartida, responder, apagarTudo } from '../controllers/main'
import { authMiddleware } from '../middlewares/auth';


const router = express.Router();

router.route('/login').post(login);
router.route('/nova-partida').get(authMiddleware,novaPartida);
router.route('/responder').post(authMiddleware,responder);
router.route('/apagar-tudo').delete(authMiddleware, apagarTudo);


export {router as mainRouter};

