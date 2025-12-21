import bcrypt from 'bcryptjs'
import { pool } from '../../config/db';

const userSignup = async(payload: Record<string, unknown>) =>{
    const {name, email, password, phone, role} = payload;

    const hashedPassword = bcrypt.hashSync(password as string, 10)

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPassword, phone, role])

    console.log(result);

    return result;
}

export const authServices= {
    userSignup,
}