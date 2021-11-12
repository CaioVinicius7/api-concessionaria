require("dotenv/config");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const { VerificationEmail } = require("./email"); 
const { sign, verify} = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Users{

   // Lista um usuário específico
   async listUser(id){
      
      const result = await prisma.users.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!result){
         return null;
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

      return user;

   }

   // Lista todos os usuários ou usuários pelo nome (filtro opcional)
   async listUsers(user){

      const result = await prisma.users.findMany({
         where: {
            fullName: {
               startsWith: user
            }
         }
      });


      if(!result.length){
         return null;
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

      return users;

   }

   // Adiciona um novo usuário
   async addUser(data){

      const verifyEmail = await prisma.users.findUnique({
         where: {
            email: data.email
         }
      });

      if(verifyEmail){
         return {
            erro: "e-mail já registrado"
         };
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

      return {
         status: "registro concluido",
         dados: { 
            usuario: result.fullName,
            email: result.email
         }
      };

   }

   // Edita os dados de um usuários
   async editUser(id, data){

      const verify = await prisma.users.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return { 
            erro: "nenhum usuário registrado com esse id"
         };
      }

      const result = await prisma.users.update({
         where: {
            id: Number(id)
         },
         data: data
      });

      return { 
         status: "Usuário editado com sucesso",
         id: result.id
      };

   }

   // Exclui os dados de um usuário
   async deleteUser(id){


      const verify = await prisma.users.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "nenhum usuário registrado com esse id"
         };
      }

      const result = await prisma.users.delete({
         where: {
            id: Number(id)
         }
      }); 

      return { 
         status: "usuário excluido", 
         dados: {
            nome: result.fullName,
            email: result.email
         }
      };

   }

   // Verifica o email de um usuário
   async verifyEmail(token){

      // Recupera o id do jwt
      const decode = verify(token, process.env.JWT_KEY);
      const { id } = decode;

      await prisma.users.update({
         where: {
            id: Number(id)
         },
         data: {
            verifiedEmail: "yes"
         }
      });
      
      return {
         status: "e-mail verificado com sucesso"
      };

   }

   // Redefine a senha do usuário
   async changePassword(email, password){

      // Criptografa a senha
      const encryptedPassword = await bcrypt.hash(password, 12);

      await prisma.users.update({
         where: {
            email: email
         },
         data: {
            password: encryptedPassword
         }
      });

      return {
         status: "senha redefinida com sucesso"
      };

   }

}

module.exports = new Users;