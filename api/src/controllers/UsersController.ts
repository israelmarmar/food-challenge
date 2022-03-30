import { Request, Response } from 'express';
import { User, UserInterface } from "../database/models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "../lib/env";

export default class UsersController {

    async login(req: Request, res: Response) {

      try{
        const user = await User.findOne({ where: { username: req.body.user} });
        var passwordIsValid = await bcrypt.compare(
          req.body.pwd,
          user.password
        );

        if (!passwordIsValid) {
          res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }else{

        var token = jwt.sign({ id: user.id }, process.env.SECRET || 'secret', {
          expiresIn: 86400 // 24 hours
        });
    
        res.json({token});
      }

      }catch(e){
        res.status(500).json({message: 'Login inválido!'});
      }

    } 
    async logout(req: Request, res: Response) {
        res.json({ auth: false, token: null });
    }

}