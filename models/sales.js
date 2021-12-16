const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { 
   verifyVehicleById,
   verifyClientById,
   verifySaleOfVehicle, 
   verifySaleById 
} = require("../functions/dataVerify");

class Sales{

   // Lista uma venda
   async listSale(id){

      const result = await prisma.sales.findUnique({
         where: {
            id: Number(id)
         },
         include: {
            Clients: {
               select: {
                  id: true,
                  fullName: true
               }
            }
         }
      });

      if(!result){
         return null;
      }

      return result;

   }

   // Lista todas as vendas
   async listSales(page){

      page = (page) ? page : 1;

      // Paginação
      const items = 5;
      const skip = (page !== 1) ? (page-1)*items : 0;
      
      const result = await prisma.sales.findMany({
         skip: skip,
         take: items,
         include: {
            Clients: {
               select: {
                  id: true,
                  fullName: true
               }
            }
         }
      });

      if(!result.length){
         return null;
      }

      return result;

   }

   // Adiciona uma nova venda
   async addSale(data){

      const verifyClient = await verifyClientById(data.idClient);

      if(verifyClient.erro){
         return verifyClient;
      }

      const verifyVehicle = await verifyVehicleById(data.idVehicle);

      if(verifyVehicle.erro){
         return verifyVehicle;
      }

      const verifyVehicleSale = await verifySaleOfVehicle(data.idVehicle);

      if(verifyVehicleSale.erro){
         return verifyVehicleSale;
      }

      await prisma.vehicles.update({
         where: {
            id: data.idVehicle
         },
         data: {
            status: "vendido"
         }
      });

      await prisma.sales.create({
         data: data
      });

      return {
         status: "Venda registrada com sucesso",
         dados: {
            valor: data.sellValue,
            idClient: data.idClient,
            idVehicle: data.idVehicle
         }
      };
         
   }

   // Edita uma venda
   async editSale(id, data){

      const verifySale = await verifySaleById(id);

      if(verifySale.erro){
         return verifySale;
      }
      
      const verifyClient = await verifyClientById(data.idClient);

      if(verifyClient.erro){
         return verifyClient;
      }

      const verifyVehicle = await verifyVehicleById(data.idVehicle);

      if(verifyVehicle.erro){
         return verifyVehicle;
      }

      const verifyVehicleSale = await verifySaleOfVehicle(data.idVehicle);

      if(verifyVehicleSale.erro){
         return verifyVehicleSale;
      }

      if(verifySale.idVehicle !== data.idVehicle){

         // Edita o dado do veículo antigo para à venda
         await prisma.vehicles.update({
            where: {
               id: Number(verifySale.idVehicle)
            },
            data: {
               status: "à venda"
            }
         });

         // Edita o dado do veículo novo para vendido
         await prisma.vehicles.update({
            where: {
               id: data.idVehicle
            },
            data: {
               status: "vendido"
            }
         });

      }

      // Edita a venda
      await prisma.sales.update({
         where: {
            id: Number(id)
         },
         data: data
      });  

      return { 
         status: "venda editada com sucesso"
      }; 

   }

   // Deleta uma venda
   async deleteSale(id){

      // Verifica se o cliente existe 
      const verify = await verifySaleById(id);

      if(verify.erro){
         return verify;
      }

      // Define o status do veículo para à venda novamente
      await prisma.vehicles.update({
         where: {
            id: Number(verify.idVehicle)
         },
         data: {
            status: "à venda"
         }
      });

      // Deleta a venda
      await prisma.sales.delete({
         where: {
            id: Number(id)
         }
      });

      return { 
         status: "venda exluida com sucesso",
         id: id
      };

   }

}

module.exports = new Sales;