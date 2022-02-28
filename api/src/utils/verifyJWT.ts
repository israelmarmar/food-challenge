import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "../lib/env";

export default function verifyJWT(req: Request, res: Response, next: NextFunction){
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token.toString(), process.env.SECRET, function(err:any, decoded:any) {
      console.log(token);
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      next();
    });
}