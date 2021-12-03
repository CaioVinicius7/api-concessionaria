require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Clients{

   // Lista um cliente específico
   async listClient(id){

      const result = await prisma.clients.findUnique({
         where: {
            id: Number(id)
         },
         include: {
            Sales: true,
         }
      });

      if(!result){
         return null;
      }

      return result;

   }

   // Lista todos os clients ou um cliente pelo nome (filtro opcional)
   async listClients(clientName){

      const result = await prisma.clients.findMany({
         where: {
            fullName: {
               startsWith: clientName
            }
         },
         include: {
            Sales: true,
         }
      });

      if(!result.length){
         return null;
      }

      return result;
   
   }

   // Adiciona um novo cliente
   async addClient(data){

      const verifyEmail = await prisma.clients.findUnique({
         where: {
            email: data.email
         }
      });

      if(verifyEmail){
         return {
            erro: "e-mail já registrado"
         };
      }

      const verifyPhone = await prisma.clients.findUnique({
         where: {
            phone: data.phone
         }
      });

      if(verifyPhone){
         return { 
            erro: "telefone já registrado"
         };
      }

      const verifyCpf = await prisma.clients.findUnique({
         where: {
            cpf: data.cpf
         }
      });

      if(verifyCpf){
         return { 
            erro: "CPF já registrado"
         };
      }

      const result = await prisma.clients.create({
         data: data
      });

      return {
         status: "registro concluido",
         dados: { 
            nome: result.fullName,
            email: result.email,
            telefone: result.phone,
            cpf: result.cpf,
            endereço: result.adress
         }
      };

   }

   // Edita os dados de um cliente
   async editClient(id, data){

      const verify = await prisma.clients.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "nenhum cliente registrado com esse id"
         };
      }

      const verifyCpf = await prisma.clients.findUnique({
         where: {
            cpf: data.cpf
         }
      });

      if(verifyCpf && verifyCpf.id != id){
         return {
            erro: "já existe um cliente registrado com esse cpf"
         };
      }

      const verifyEmail = await prisma.clients.findUnique({
         where: {
            email: data.email
         }
      });

      if(verifyEmail && verifyEmail.id != id){
         return {
            erro: "já existe um cliente registrado com esse e-mail"
         };
      }

      const result = await prisma.clients.update({
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

   // Exclui os dados de um cliente
   async deleteClient(id){

      const verify = await prisma.clients.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "nenhum cliente registrado com esse id"
         };
      }

      const result = await prisma.clients.delete({
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

}

module.exports = new Clients;