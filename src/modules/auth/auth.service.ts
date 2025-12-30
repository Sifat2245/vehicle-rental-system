import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import config from "../../config";
import jwt from "jsonwebtoken";

const userSignup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = bcrypt.hashSync(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPassword, phone, role]
  );

  console.log(result);

  return result;
};

const userSignin = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) return null;

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) return null;

  const secret = config.jwt_secret;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret as string,
   { expiresIn: "1d"}
  );

  return {user, token}
};

export const authServices = {
  userSignup,
  userSignin,
};
