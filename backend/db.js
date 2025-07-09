import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {Pool} = pkg;

const pool = new Pool({
    user:process.env.DB_USER_NAME,
    host:process.env.DB_HOST_NAME,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
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
