import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUserByUsername, createUser } from '../services/user.service.js'

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        const userExists = await findUserByUsername(username)
        if (userExists) {
            return res.status(400).json({ message: 'This user already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await createUser(username, email, hashedPassword)
        res.json({ message: 'Registered!' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await findUserByUsername(username)
        if (!user) return res.status(400).json({ message: 'User not found' })
        const Match = await bcrypt.compare(password, user.password_hash)
        if (!Match) return res.status(400).json({ message: 'Wrong password' })
        const token = jwt.sign(
            { username: user.username, user_id: user.user_id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        )
        res.json({ message: 'Login successful', token })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
