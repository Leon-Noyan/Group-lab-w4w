import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export const secureRoute = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    } else {
        try {
            jwt.verify(token, process.env.JWT_SECRET!)
            next()
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' })
        }
    }
}
