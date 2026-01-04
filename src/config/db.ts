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
        `);

    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR (200) NOT NULL,
        type VARCHAR (100) NOT NULL,
        registration_number VARCHAR (100) UNIQUE NOT NULL,
        daily_rent_price INTEGER NOT NULL,
        availability_status VARCHAR (100) NOT NULL
        )
        `

    );
    
    await pool.query(
        `CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
            customer_id  INTEGER NOT NULL REFERENCES users(id),
            vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL,
            total_price INTEGER NOT NULL,
            status VARCHAR (100) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )`
    )
}

export default initDB;