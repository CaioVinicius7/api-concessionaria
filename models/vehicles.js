const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyVehicleById } = require("../functions/dataVerify");

class Vehicles{

   // Lista um usuário específico
   async listVehicle(id){

      const result = await prisma.vehicles.findUnique({
         where: {
            id: Number(id)
         },
         include: {
            Sales: true
         }
      });

      if(!result){
         return null;
      }

      return result;

   }

   // Lista todos os veiculos registrados no banco de dados
   async listVehicles(status, page){

      // Filtro do select
      status = (status === "venda") ? "à venda" : (status === "vendido") ? "vendido" : "à venda";
      page = (page) ? page : 1;

      // Paginação
      const items = 5;
      const skip = (page !== 1) ? (page-1)*items : 0;

      const result = await prisma.vehicles.findMany({
         skip: skip,
         take: items,
         where: {
            status: status
         },
         include: {
            Sales: true
         }
      });

      if(!result.length){
         return null;
      }

      return result;

   }

   // Lista todos os veiculos com o tipo desejado
   async listVehiclesByType(type, page){

      page = (page) ? page : 1;

      // Paginação
      const items = 5;
      const skip = (page !== 1) ? (page-1)*items : 0;

      const result = await prisma.vehicles.findMany({
         skip: skip,
         take: items,
         where: {
            type: {
               startsWith: type
            },
            status: "à venda"
         },
         include: {
            Sales: true
         }
      });

      if(!result.length){
         return null;
      }

      return result;

   }

   // Lista todos os veiculos com o modelo desejado
   async listVehiclesByModel(model, page){

      page = (page) ? page : 1;

      // Paginação
      const items = 5;
      const skip = (page !== 1) ? (page-1)*items : 0;

      const result = await prisma.vehicles.findMany({
         skip: skip,
         take: items,
         where: {
            model: {
               startsWith: model
            },
            status: "à venda" 
         },
         include: {
            Sales: true
         }
      });

      if(!result.length){
         return null;
      }

      return result;

   }

   // Adicionar um novo veiculo
   async addVehicle(data){

      const formattedData = { 
         ...data,
         year: Number(data.year),
         price: data.price,
         listPrice: data.listPrice,
         places: Number(data.places),
         ports: Number(data.ports),
         marches: Number(data.marches),
         urbanConsume: parseFloat(data.urbanConsume),
         roadConsume: parseFloat(data.roadConsume),
         status: "à venda"
      };

      const result = await prisma.vehicles.create({
         data: formattedData
      });

      return result;

   }

   // Edita os dados de um veículo
   async editVehicle(id, data){

      const formattedData = { 
         ...data,
         year: Number(data.year),
         price: data.price,
         listPrice: data.listPrice,
         places: Number(data.places),
         ports: Number(data.ports),
         marches: Number(data.marches),
         urbanConsume: parseFloat(data.urbanConsume),
         roadConsume: parseFloat(data.roadConsume),
      };

      // Verifica se existe um registro com o id recebido
      const verify = await verifyVehicleById(id);

      if(verify.erro){
         fs.unlink(data.img, () => {});
         return verify;
      }

      const { img } = verify;

      if(img.includes("uploads\\")){
         fs.unlink(img, () => {});      
      }
      
      await prisma.vehicles.update({
         where: {
            id: Number(id)
         },
         data: formattedData
      });

      return formattedData;

   }

   // Exclui os dados de um veículo
   async deleteVehicle(id){

      // Verifica se existe um registro com o id recebido
      const verify = await verifyVehicleById(id);

      if(verify.erro){
         return verify;
      }

      const { img } = verify;

      if(img.includes("uploads\\")){
         fs.unlink(img, () => {});
      }

      await prisma.vehicles.delete({
         where: {
            id: Number(id)
         }
      });

      return id;

   }

}

// Exporta a classe Veiculos
module.exports = new Vehicles;