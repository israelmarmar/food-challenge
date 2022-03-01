import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import "../lib/env";

export default class UsersController {

    async login(req: Request, res: Response) {
        if(req.body.user === 'luiz' && req.body.pwd === '123'){
            const id = 1; 
            var token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 1440
            });
            return res.json({ auth: true, token: token });
          }
          
          res.status(500).json({message: 'Login inválido!'});
    }

    async logout(req: Request, res: Response) {
        res.json({ auth: false, token: null });
    }

}