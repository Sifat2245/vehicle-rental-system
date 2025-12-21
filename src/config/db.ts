import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.connection_str}`
})

const initDB = async () =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR (200) NOT NULL,
        email VARCHAR (200) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR (15) NOT NULL,
        role VARCHAR (50),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
}

export default initDB;