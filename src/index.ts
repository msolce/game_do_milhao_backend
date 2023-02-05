import express, { Express } from 'express';
import dotenv from 'dotenv';
import {connectDB} from './db/connect';
import cors from 'cors';
require('express-async-errors');
import {mainRouter} from './routes/mainRoutes';
import {UsersDAO} from './DAO/usersDAO';
import { PerguntaDAO } from './DAO/perguntaDAO';
import { PartidaDAO } from './DAO/partidaDAO';


dotenv.config();

const app: Express = express();




app.use(cors());
app.use(express.json());
app.use('/api/v1', mainRouter);


const port: string | number = process.env.PORT || 8800;
const uri: any = process.env.URI_DB;


const start = async () => {
    try {
        const client = await connectDB(uri);
        
        await UsersDAO.injectDB(client);
        
        await PerguntaDAO.injectDB(client);
        
        await PartidaDAO.injectDB(client);
        
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    } catch (error) {
        console.log(`Not listening on port ${port}`);
        console.log(error);
    }
};

start();


