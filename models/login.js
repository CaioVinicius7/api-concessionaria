require("dotenv/config");
const conexao = require("./conexao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const moment = require("moment");

class Autenticacao{

   login(dadosLogin, res){

      const sqlVerifica = "SELECT * FROM usuarios WHERE email = ?";
      
      conexao.query(sqlVerifica, dadosLogin.email, (erro, result) => {
         
         if(erro){
            return res.status(400).json(erro);
         }
            
         if(result.length < 1){
            return res.status(404).json({ erro: "nenhum usuário é cadastrado com esse e-mail" });
         }
         
         bcrypt.compare(dadosLogin.senha, result[0].senha, (erro, resultCompare) => {
            
            if(erro){
               return res.status(401).json({ erro: "falha na autenticação" });
            }

            if(resultCompare){

               const ultimoLogin = moment().format("YYYY-MM-DD HH:mm:ss");

               const sql = "UPDATE usuarios SET ultimoLogin = ? WHERE idUsuario = ?";

               conexao.query(sql, [ultimoLogin, result[0].idUsuario]);

               // Cria o token
               const token = jwt.sign({
                  idUsuario: result[0].idUsuario,
                  nomeCompleto: result[0].nomeCompleto,
                  email: result[0].email 
               }, process.env.JWT_KEY, {
                  expiresIn: "1h"
               });
               
               return res.status(200).json({ 
                  status: "autenticado com sucesso!",
                  token: token
               });

            }

            res.status(401).json({ erro: "senha incorreta! tente novamente" });

         }); 
         
      });

   }

   logout(req, res){

      res.status(200).json({ status: "preciso terminar" });


   }

}

module.exports = new Autenticacao;