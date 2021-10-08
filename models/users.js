require("dotenv/config");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const { VerificationEmail } = require("./email"); 
const { sign, verify} = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Users{

   // Lista um usuário específico
   async listUser(id, res){

      try{

         const result = await prisma.users.findUnique({
            where: {
               id: Number(id)
            }
         });
   
         if(!result){
            return res.status(204).json();
         }
   
         // Formata a data e horário de criação e ultimo login
         const lastLoginFormatted =  (result.lastLogin != null) ? moment(result.lastLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") : null;
         const createAtFormatted = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(result.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const user = {
            ...result,
            lastLogin: lastLoginFormatted,
            createdAt: createAtFormatted,
            updatedAt: updatedAtFormatted
         };
   
         return res.status(200).json(user);

      }catch(error){
         return res.status(500).json(error.message);
      }


   }

   // Lista todos os usuários ou usuários pelo nome (filtro opcional)
   async listUsers(user, res){

      try{

         const result = await prisma.users.findMany({
            where: {
               fullName: {
                  startsWith: user
               }
            }
         });
   
   
         if(result.length < 1){
            return res.status(204).send();
         }
   
         const users = result.map((user) => {
   
            // Formata a data e horário de criação e ultimo login
            const lastLoginFormatted =  (user.lastLogin != null) ? moment(user.lastLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") : null;
            const createAtFormatted = moment(user.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const updatedAtFormatted = moment(user.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const formattedUser = {
               ...user,
               lastLogin: lastLoginFormatted,
               createdAt: createAtFormatted,
               updatedAt: updatedAtFormatted 
            };
   
            return formattedUser;
            
         });

         return res.status(200).json(users);

      }catch(error){
         return res.status(500).json(error.message);
      }

         

   }

   // Adiciona um novo usuário
   async addUser(data, res){


      try{

         const verifyEmail = await  await prisma.users.findUnique({
            where: {
               email: data.email
            }
         });

         if(verifyEmail){
            return res.status(400).json({ erro: "e-mail já registrado" });
         }
   
         // Criptografa a senha
         const encryptedPassword = await bcrypt.hash(data.password, 12);
   
         // Salva os dados formatados 
         const formattedData = { ...data, password: encryptedPassword, lastLogin: null, verifiedEmail: "no" };
   
         const result = await prisma.users.create({
            data: formattedData
         });

         const verificationToken = sign({
            id: result.id,
         }, process.env.JWT_KEY, {
            expiresIn: "72h"
         });
   
         const url = process.env.BASE_URL + verificationToken;
         const verificationEmail = new VerificationEmail(formattedData, url);
         verificationEmail.sendEmail().catch(console.log);

         return res.status(200).json({
            status: "registro concluido",
            dados: { 
               usuario: result.fullName,
               email: result.email
            }
         });

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Edita os dados de um usuários
   async editUser(id, data, res){

      try{

         const verify = await prisma.users.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!verify){
            return res.status(400).json({ erro: "nenhum usuário registrado com esse id" });
         }

         const result = await prisma.users.update({
            where: {
               id: Number(id)
            },
            data: data
         });

         res.status(200).json({ 
            status: "Usuário editado com sucesso",
            id: result.id
         });

      }catch(error){
         return res.status(500).json(error.message);
      }


   }

   // Exclui os dados de um usuário
   async deleteUser(id, res){

      try{

         const verify = await prisma.users.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!verify){
            return res.status(400).json({ erro: "nenhum usuário registrado com esse id" });
         }

         const result = await prisma.users.delete({
            where: {
               id: Number(id)
            }
         }); 

         res.status(200).json({ 
            status: "usuário excluido", 
            dados: {
               nome: result.fullName,
               email: result.email
            }
         });


      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Verifica o email de um usuário
   async verifyEmail(token, res){

      try{

         const decode = verify(token, process.env.JWT_KEY);
         const { id } = decode;

         const result = await prisma.users.update({
            where: {
               id: Number(id)
            },
            data: {
               verifiedEmail: "yes"
            }
         });
         
         res.status(200).json({ status: "e-mail verificado com sucesso" });

      }catch(error){

         if(error.name === "TokenExpiredError"){
            return res.status(401).json(error);
         }
         
         if(error.name === "JsonWebTokenError"){
            return res.status(401).json(error);
         }

         res.status(500).json({ erro: error.message });

      }


   }

}

module.exports = new Users;