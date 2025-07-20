import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {Pool} = pkg;

const pool = new Pool({
   connectionString: process.env.DB_CONNECT_URL,
   ssl: {
    rejectUnauthorized: false, // Neon için gerekli
   },

});
export const testDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log(`DB has connected !- ${res.rows[0].now}`);
    } catch (error) {
        console.log(`DB connection error ! - ${error}`);
    }
}
export default pool;
