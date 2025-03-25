const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_SERVER || 'localhost',
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'TestDB',
};

const pool = mysql.createPool(config);

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

module.exports = pool;
