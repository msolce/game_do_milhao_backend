import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req:Request, res:Response, next:any) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith(process.env.HEADER_START + ' ')){
        res.json({msg: "no token provided"});
        return
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {date, username} = decoded;
        req.user = {date, username};
        console.log("🚀 ~ file: auth.ts:17 ~ authMiddleware ~ req.user ", req.user )
        next();
    } catch (error) {
        res.json({msg: 'token invalid'});
        return        
    }
}

export {authMiddleware}