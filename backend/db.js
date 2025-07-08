import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'zikirmatik',
    password:'frkn3641',
    port:5432
});

export default pool;
