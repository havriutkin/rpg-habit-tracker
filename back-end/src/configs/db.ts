import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || '',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || '',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const query = async (queryText: string, params: any[] = []) => {
    try {
        const { rows } = await pool.query(queryText, params);
        return rows;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default query;
