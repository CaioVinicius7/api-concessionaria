require("dotenv/config");
const moment = require("moment");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Clients{

   // Lista um cliente específico
   async listClient(id, res){

      try{

         const result = await prisma.clients.findUnique({
            where: {
               id: Number(id)
            },
            include: {
               sales: true,
             }
         });
   
         if(!result){
            return res.status(204).json();
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

            return res.status(200).json(client);

         }

         const client = {
            ...result,
            createdAt: createAtFormatted,
            updatedAt: updatedAtFormatted,
         };
   
         return res.status(200).json(client);

      }catch(error){
         return res.status(500).json(error.message);
      }


   }

   // Lista todos os clients ou um cliente pelo nome (filtro opcional)
   async listClients(clientName, res){

      try{

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
            return res.status(204).send();
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

         return res.status(200).json(clients);
   
      }catch(error){
         console.log(error)
         return res.status(500).json(error.message);
      }

   }

   // Adiciona um novo cliente
   async addClient(data, res){

      try{

         const verifyEmail = await prisma.clients.findUnique({
            where: {
               email: data.email
            }
         });

         if(verifyEmail){
            return res.status(400).json({ erro: "e-mail já registrado" });
         }

         const verifyPhone = await prisma.clients.findUnique({
            where: {
               phone: data.phone
            }
         });

         if(verifyPhone){
            return res.status(400).json({ erro: "telefone já registrado" });
         }

         const verifyCpf = await prisma.clients.findUnique({
            where: {
               cpf: data.cpf
            }
         });

         if(verifyCpf){
            return res.status(400).json({ erro: "CPF já registrado" });
         }
   
         const result = await prisma.clients.create({
            data: data
         });
   
         return res.status(201).json({
            status: "registro concluido",
            dados: { 
               nome: result.fullName,
               email: result.email,
               telefone: result.phone,
               cpf: result.cpf,
               endereço: result.adress
            }
         });

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Edita os dados de um cliente
   async editClient(id, data, res){

      try{

         const verify = await prisma.clients.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!verify){
            return res.status(400).json({ erro: "nenhum cliente registrado com esse id" });
         }

         const result = await prisma.clients.update({
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

   // Exclui os dados de um cliente
   async deleteClient(id, res){

      try{

         const verify = await prisma.clients.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!verify){
            return res.status(400).json({ erro: "nenhum cliente registrado com esse id" });
         }

         const result = await prisma.clients.delete({
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

}

module.exports = new Clients;