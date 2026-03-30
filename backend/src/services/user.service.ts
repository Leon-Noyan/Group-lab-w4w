import pool from '../mysql_db.js'
import type { RowDataPacket } from 'mysql2'

export const findUserByUsername = async (username: string) => {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM users WHERE username = ?',
        [username]
    )
    return rows[0]
}

export const createUser = async (
    username: string,
    email: string,
    hashedPassword: string
) => {
    await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    )
}
