import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectDB} from './db/connect';
import cors from 'cors';
require('express-async-errors');
import {mainRouter} from './routes/main';
import {UsersDAO} from './DAO/usersDAO';
import { PerguntaDAO } from './DAO/gravarPergunta';

dotenv.config();
const app: Express = express();




app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        const client = await connectDB(process.env.URI_DB);
        await UsersDAO.injectDB(client);
        await PerguntaDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    } catch (error) {
        console.log(`Not listening on port ${port}`);
        console.log(error);
    }
};

start();


