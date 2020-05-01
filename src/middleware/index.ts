import jwt from 'jsonwebtoken';
import config from '../config'
import { Request, Response, NextFunction } from 'express'

function checkToken(req: Request, res: Response, next: NextFunction) {
    let token: any = req.headers['x-access-token'] || req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            res.locals.user = decoded;
            next();

        } catch (error) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            })
        }
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

export {
    checkToken
}