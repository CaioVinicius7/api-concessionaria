require("dotenv/config");
const bcrypt = require("bcryptjs");
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

      return result;

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

      return result;

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
      const formattedData = {
         fullName: data.fullName,
         email: data.email,
         password: encryptedPassword,
         lastLogin: null,
         verifiedEmail: "no"
       };

      const result = await prisma.users.create({
         data: formattedData
      });

      const verificationToken = sign({
         id: result.id,
      }, process.env.JWT_KEY, {
         expiresIn: "72h"
      });

      return {
         info: {
            status: "registro concluido",
            dados: { 
               usuario: result.fullName,
               email: result.email
            }
         },
         sendMail: {
            verificationToken: verificationToken,
            formattedData: formattedData
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

      if(data.email){

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