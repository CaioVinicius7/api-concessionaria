const conexao = require("./conexao");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

class Usuarios{

   // Lista um usuário específico
   listarUsuario(id, res){

      const sql = "SELECT * FROM usuarios WHERE idUsuario = ?";
      
      conexao.query(sql, id, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(!result[0]){
            return res.status(404).json({ erro: "nenhum usuário encontrado com esse id" });
         }

         // Formata a data e horário de criação e ultimo login
         const dataRegistroFormatada = moment(result[0].dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const ultimoLoginFormatado =  moment(result[0].ultimoLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const usuarioFormatado = { ...result[0], dataRegistro: dataRegistroFormatada, ultimoLogin: ultimoLoginFormatado };

         res.status(200).json(usuarioFormatado);

      });

   }

   // Lista todos os usuários ou usuários pelo nome (filtro opcional)
   listarUsuarios(nome, res){

      const sql = (nome) ? `SELECT idUsuario, nomeCompleto, email, dataRegistro, ultimoLogin FROM usuarios WHERE nomeCompleto like '${nome}%'` : `SELECT * FROM usuarios`;

      conexao.query(sql, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            res.status(404).json({ erro: "nenhum usuário encontrado" });
         }

         const usuarios = result.map((usuario) => {
            
            // Formata a data e horário de criação e ultimo login
            const dataRegistroFormatada = moment(usuario.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const ultimoLoginFormatado =  moment(usuario.ultimoLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const usuarioFormatado = { ...usuario, dataRegistro: dataRegistroFormatada, ultimoLogin: ultimoLoginFormatado };

            return usuarioFormatado;
            
         });

         res.status(200).json(usuarios);
         
      });

   }

   // Adiciona um novo usuário
   adicionarUsuario(dados, res){

      // Verifica se o email já não está registrado
      const sqlVerificaEmail = `SELECT email FROM usuarios WHERE email = ?`;

      conexao.query(sqlVerificaEmail, dados.email, async (erro, result) => {
         
         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length >= 1){
               return res.status(400).json({ erro: "e-mail já registrado" });
         }

         // Recebe a data e horario do registro
         const dataRegistro = moment().format("YYYY-MM-DD HH:mm:ss");
   
         // Criptografa a senha
         const senhaCriptografada = await bcrypt.hash(dados.senha, 12);

         const dadosFormatados = { ...dados, senha: senhaCriptografada, dataRegistro: dataRegistro, ultimoLogin: "0000-00-00 00:00:00" };
         
         const sql = "INSERT INTO usuarios SET ?";
   
         conexao.query(sql, dadosFormatados, async (erro, result) => {
   
            if(erro){
               return res.status(400).json(erro);
            }

            // Envio de email
            try{
      
               const user = process.env.USER_EMAIL;
               const pass = process.env.PASS_EMAIL;
               const smtp = process.env.SMTP_EMAIL;
               const port = process.env.PORT_EMAIL;
               
               // Cria o transportador com as credenciais
               const transporter = nodemailer.createTransport({
                  host: smtp,
                  port: port,
                  secure: false,
                  auth: {
                     user,
                     pass
                  }
               });
      
               await transporter.sendMail({
                  from: `Caio Vinícius" '${process.env.USER_EMAIL}'`,
                  to: dados.email,
                  replyTo: process.env.USER_EMAIL,
                  subject: "Bem vindo ao nosso sistema!",
                  text: `Olá ${dadosFormatados.nomeCompleto.split(" ")[0]}, sua conta em nosso sistema acabou de ser criada! desejamos nossas boas vindas.`,
                  html: `<p> Olá ${dadosFormatados.nomeCompleto.split(" ")[0]}, sua conta em nosso sistema acabou de ser criada! desejamos nossas boas vindas. </p>`
               });
      
            }catch(error){
               return res.status(400).json(error);
            }
            
            res.status(200).json({
               status: "registro concluido",
               dadosUsuario: { 
                  usuario: dadosFormatados.nomeCompleto, email: dadosFormatados.email
               }
            });
   
         });

      });



   }

   // Edita os dados de um usuários
   editarUsuario(id, dados, res){

      const sqlVerifica = "SELECT idUsuario, dataRegistro, ultimoLogin FROM usuarios WHERE idUsuario = ?";

      conexao.query(sqlVerifica, id, async (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            return res.status(404).json({ erro: "nenhum usuário encontrado com esse id" });
         }

         // Formata a senha e a data do ultimoLogin caso o usuário ainda não tenha logado
         const senhaCriptografada = await bcrypt.hash(dados.senha, 12);
         const dataRegistro = result[0].dataRegistro;
         const ultimoLogin = (!moment(result[0].ultimoLogin).isValid()) ? "0000-00-00 00:00:00" : result[0].ultimoLogin;

         const dadosFormatados = { ...dados, senha: senhaCriptografada, dataRegistro: dataRegistro, ultimoLogin: ultimoLogin };

         const sql = "UPDATE usuarios SET ? WHERE idUsuario = ?";
         
         conexao.query(sql, [dadosFormatados, id], (erro, result) => {
            
            if(erro){
               return res.status(400).json(erro);
            }

            res.status(200).json({ 
               status: "Usuário editado com sucesso",
               id: id
            });
            
            
         });


      });
   }

   // Exclui os dados de um usuário
   excluirUsuario(id, res){

      const sqlVerifica = "SELECT idUsuario FROM usuarios WHERE idUsuario = ?";

      conexao.query(sqlVerifica, id, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            return res.status(404).json({ erro: "nenhum usuário encontrado com esse id" });
         }

         const sql = "DELETE FROM usuarios WHERE idUsuario = ?";

         conexao.query(sql, id, (erro, result) => {
            
            if(erro){
               return res.status(400).json(erro);
            }

            res.status(200).json({ 
               status: "usuário excluido", 
               id: id
            });
            

         });

      });

   }

}

module.exports = new Usuarios;