require("dotenv/config");
const moment = require("moment");
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
            sales: true,
            }
      });

      if(!result){
         return null;
      }

      // Formata a data e horário de criação e ultimo login
      const createAtFormatted = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const updatedAtFormatted = moment(result.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

      // Verifica se existe uma venda vínculada, se existir formata os dados da venda
      if(result.sales.length){

         const sales = result.sales.map((sales) => {

            const saleDateformatted = moment(sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleCreatedAtformatted = moment(sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleUpdatedAtFormatted = moment(sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

            const formattedSales = {
               ...sales,
               sellDate: saleDateformatted,
               createdAt: saleCreatedAtformatted,
               updatedAt: saleUpdatedAtFormatted
            };

            return formattedSales;

         });


         const client = {
            ...result,
            createdAt: createAtFormatted,
            updatedAt: updatedAtFormatted,
            sales: sales
         };

         return client;

      }

      const client = {
         ...result,
         createdAt: createAtFormatted,
         updatedAt: updatedAtFormatted,
      };

      return client;

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
            sales: true,
            }
      });


      if(!result.length){
         return null;
      }

      const clients = result.map((client) => {

         // Formata a data e horário de criação e ultimo login"
         const createAtFormatted = moment(client.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(client.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

         // Verifica se existe uma venda vínculada, se existir formata os dados da venda
         if(client.sales.length){

            const sales = client.sales.map((sale) => {

               const saleDateformatted = moment(sale.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleCreatedAtformatted = moment(sale.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleUpdatedAtFormatted = moment(sale.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
   
               const formattedSales = {
                  ...sale,
                  sellDate: saleDateformatted,
                  createdAt: saleCreatedAtformatted,
                  updatedAt: saleUpdatedAtFormatted
               };

               return formattedSales;

            });

            const formattedClient = {
               ...client,
               createdAt: createAtFormatted,
               updatedAt: updatedAtFormatted,
               sales: sales
            };

            return formattedClient;

         }

         const formattedClient = {
            ...client,
            createdAt: createAtFormatted,
            updatedAt: updatedAtFormatted 
         };

         return formattedClient;      

      });

      return clients;
   
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