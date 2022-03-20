// get the client
import mysql from "mysql2/promise"

// create the connection to database
const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'kbfsrSVnh5',
    database: 'kbfsrSVnh5',
    password: '8L69nlBSWe'
});




export default pool;