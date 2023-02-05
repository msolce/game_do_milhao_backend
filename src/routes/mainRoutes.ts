import express from 'express';
import {login, novaPartida, responder, apagarTudo, teste } from '../controllers/mainController'
import { authMiddleware } from '../middlewares/auth';


const router = express.Router();

router.route('/').get(teste);
router.route('/login').post(login);
router.route('/nova-partida').post(authMiddleware,novaPartida as any);
router.route('/responder').post(authMiddleware,responder as any);
router.route('/apagar-tudo').delete(authMiddleware, apagarTudo);


export {router as mainRouter};

