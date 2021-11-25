const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
   async listSales(){
      
      const result = await prisma.sales.findMany({
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

      // Verifica se o veículo existe 
      const verify = await prisma.vehicles.findUnique({
         where: {
            id: data.idVehicle
         }
      });

      if(!verify){
         return { 
            erro: "nenhum veículo encontrado com esse id"
         };
      }
      
      // Verifica se o veículo já não foi vendido 
      const verifySale = await prisma.sales.findFirst({
         where: {
            idVehicle: data.idVehicle
         }
      });

      if(verifySale){
         return {
            erro: "o veículo já está registrado como vendido"
         };
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

      // Verifica se a venda existe
      const verify = await prisma.sales.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "nenhuma venda cadastrada com esse id"
         };
      }

      // Verifica se o veículo escolhido já não está relacionado a outra venda
      const verifyVehicle = await prisma.vehicles.findUnique({
         where: {
            id: data.idVehicle
         } 
      });

      if(!verifyVehicle){
         return {
         erro: "nenhum veículo registrado com esse id" 
         };
      }

      if(verifyVehicle.status === "vendido" && verifyVehicle.id !== data.idVehicle){
         return {
            erro: "esse veículo já está relacionado a uma venda"
         };
      }

      if(verify.idVehicle !== data.idVehicle){

         // Edita o dado do veículo antigo para à venda
         await prisma.vehicles.update({
            where: {
               id: Number(verify.idVehicle)
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

      const result = await prisma.sales.findUnique({
         where: {
            id: Number(id)
         }
      }); 

      if(!result){
         return {
            erro: "nenhuma venda cadastrada com essse id"
         };
      }

      // Define o status do veículo para à venda novamente
      await prisma.vehicles.update({
         where: {
            id: Number(result.idVehicle)
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