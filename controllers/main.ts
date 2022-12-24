import {Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {UsersDAO} from '../DAO/usersDAO';


const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    
    if(!username || !password){
        res.json({msg: 'Usuário ou Senha não informados!'});
    };

 
    const dadosUsuario = await UsersDAO.getUser(username)
    
    //Se o usuário não existe
    if (!dadosUsuario){
        res.json({msg: `Usuário ou senhas inválidos!`});
        return;
    }; 

    //Se usuário existe testa a senha e retorna
    if (dadosUsuario.password === password){
        const date = new Date().getDate();
        const token = jwt.sign({date, username}, process.env.JWT_SECRET, {expiresIn: '10d'})
            
        res.json({msg: 'logado', token});
    } else {
        res.json({msg: 'senha inválida', });
    }
}

const perguntas01 = async (req:Request, res: Response) => {

    
    res.json({msg: 'perguntas01'})
}



export {
        login,
        perguntas01
       }