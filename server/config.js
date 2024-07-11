const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DATA_BASE_HOST,
  user: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASSWORD,
  database: process.env.DATA_BASE_NAME
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return
  }
  console.log('Connected to the MySQL database.');
});

module.exports=connection