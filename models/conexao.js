const mysql = require("mysql2");
const dadosConexao = require("../config/dadosConexao.json");


// Recebe a conexão com o banco de dados
const conexao = mysql.createConnection({
   host: dadosConexao.host,
   port: dadosConexao.port,
   user: dadosConexao.user,
   password: dadosConexao.password,
   database: dadosConexao.database
});

module.exports = conexao;