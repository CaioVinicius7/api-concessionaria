require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { 
   verifyClientByEmail,
   verifyClientByPhone,
   verifyClientByCpf,
   verifyClientById
} = require("../functions/dataVerify");

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

   // Lista todos os clients 
   async listClients(page){

      page = (page) ? page : 1;

      // Paginação
      const items = 5;
      const skip = (page !== 1) ? (page-1)*items : 0;

      const result = await prisma.clients.findMany({
         skip: skip,
         take: items,
         include: {
            Sales: true,
         }
      });

      if(!result.length){
         return null;
      }

      return result;
   
   }

   // Lista todos os clients com o nome escolhido
   async listClientsByName(clientName, page){

      page = (page) ? page : 1;

      // Paginação
      const items = 5;
      const skip = (page !== 1) ? (page-1)*items : 0;

      const result = await prisma.clients.findMany({
         skip: skip,
         take: items,
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

      const verify = await verifyClientByEmail(data.email);

      if(verify.erro){
         return verify;
      }

      const verifyPhone = await verifyClientByPhone(data.phone);

      if(verifyPhone.erro){
         return verifyPhone;
      }

      const verifyCpf = await verifyClientByCpf(data.cpf);

      if(verifyCpf.erro){
         return verifyCpf;
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

      const verify = await verifyClientById(id);

      if(verify.erro){
         return verify;
      }

      const verifyEmail = await verifyClientByEmail(data.email, id);

      if(verifyEmail.erro){
         return verifyEmail;
      }

      const verifyPhone = await verifyClientByPhone(data.phone, id);

      if(verifyPhone.erro){
         return verifyPhone;
      }
      
      const verifyCpf = await verifyClientByCpf(data.cpf, id);

      if(verifyCpf.erro){
         return verifyCpf;
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

      const verify = await verifyClientById(id);

      if(verify.erro){
         return verify;
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