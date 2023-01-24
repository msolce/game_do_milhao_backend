import {Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {UsersDAO} from '../DAO/usersDAO';
import { perguntas01req } from './perguntas';
import { PerguntaDAO } from '../DAO/perguntaDAO';
import { PartidaDAO } from '../DAO/partidaDAO';
import { ObjectId } from 'mongodb';


const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;
    
    if(!email || !password){
        res.json({msg: 'Usuário ou Senha não informados!'});
    };
 
    const dadosUsuario = await UsersDAO.getUser(email)
    
    //Se o usuário não existe
    if (!dadosUsuario){
        res.json({msg: `Usuário ou senhas inválidos!`});
        return;
    }; 

    //Se usuário existe testa a senha e retorna
    if (dadosUsuario.password === password){
        const date = new Date().getDate();
        const token = jwt.sign({date, email}, process.env.JWT_SECRET, {expiresIn: '10d'});

        res.json({msg: 'logado', token});
    
    } else {
        res.json({msg: 'senha inválida', });
    }
}
const novaPartida = async (req: Request, res: Response) => {
        
    const usuario = await UsersDAO.getUser(req.user.email);
    const partida = await PartidaDAO.novaPartida(usuario._id);
    const partidaCriada = await PartidaDAO.getPartida(partida.insertedId);
    const pergunta = await perguntas01req();
    const gravaPergunta = await PerguntaDAO.gravarPergunta(pergunta, usuario._id, partida.insertedId);
    
    const data = {
        partida: partidaCriada,
        pergunta_id: gravaPergunta.insertedId,
        pergunta: pergunta.question,
        respostas: pergunta.answers_Embaralhado
    };
    
    
    res.json(data);
};

const responder = async (req : Request, res: Response) => {
    
    const usuario = await UsersDAO.getUser(req.user.email);
    const reqBody = req.body;
    console.log("🚀 ~ file: main.ts:60 ~ responder ~ reqBody", reqBody)
    const pergunta_id = reqBody.pergunta;
    const resposta_user = reqBody.resposta_user;
    
    const checkResposta = await PerguntaDAO.checkResposta(pergunta_id, resposta_user);
    
    if(checkResposta){
        //codigo quando acertar uma resposta
        const atualizarPartida = await PartidaDAO.respostaCerta(reqBody.partida._id);
        
        const pergunta = await perguntas01req();
        const gravaPergunta = await PerguntaDAO.gravarPergunta(pergunta, new ObjectId(usuario._id), new ObjectId(reqBody.partida._id));
        const data = {
            partida: reqBody.partida._id,
            pergunta_id: gravaPergunta.insertedId,
            pergunta: pergunta.question,
            respostas: pergunta.answers_Embaralhado
        };
        
        res.json(data);
        
    } else {
        //codigo quando errar uma resposta
        const atualizarPartida = await PartidaDAO.respostaErrada(reqBody.partida._id);
        

        res.json(atualizarPartida)

    };

 };

 const apagarTudo = async (req: any, res:any) => {

  
         const a = await PartidaDAO.apagarTudo();
         const b = await PerguntaDAO.apagarTudo();
         
         res.json({msg: "Deleted!", a, b})


 };


export {
        login,
        novaPartida,
        responder,
        apagarTudo
       }