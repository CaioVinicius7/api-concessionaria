const mysql = require("mysql2");

// Recebe a conexão com o banco de dados
const con = mysql.createConnection({
   host: process.env.HOST,
   port: process.env.PORT,
   user: process.env.USER,
   password: process.env.PASSWORD,
   database: process.env.DB
});

module.exports = con;