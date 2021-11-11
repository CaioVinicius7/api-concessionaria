const moment = require("moment");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

      // Formata a data do registro
      const createdAtFormatted = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const updatedAtFormatted = moment(result.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

      // Se o veículo for relaciona auma venda formata os dados dessa venda
      if(result.Sales){
         const saleDateformatted = moment(result.Sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
         const saleCreatedAtformatted = moment(result.Sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
         const saleUpdatedAtFormatted = moment(result.Sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

         const vehicleDataFormatted = {
            ...result,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted,
            Sales: {
               ...result.Sales,
               sellDate: saleDateformatted,
               createdAt: saleCreatedAtformatted,
               updatedAt: saleUpdatedAtFormatted
            } 
         };

         return vehicleDataFormatted;

      }

      const vehicleDataFormatted = {
         ...result,
         createdAt: createdAtFormatted,
         updatedAt: updatedAtFormatted
      };

      return vehicleDataFormatted;

   }

   // Lista todos os veiculos registrados no banco de dados
   async listVehicles(status){

      // Filtro do select
      status = (status === "venda") ? "à venda" : (status === "vendido") ? "vendido" : "à venda";

      const result = await prisma.vehicles.findMany({
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

      // Percorre todos os registros retornados e formata a data 
      const vehicles = result.map((vehicle) => {

         const createdAtFormatted = moment(vehicle.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(vehicle.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

         // Se o veículo for relaciona auma venda formata os dados dessa venda
         if(vehicle.Sales){
            const saleDateformatted = moment(vehicle.Sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleCreatedAtformatted = moment(vehicle.Sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleUpdatedAtFormatted = moment(vehicle.Sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

            const vehicleDataFormatted = {
               ...vehicle,
               createdAt: createdAtFormatted,
               updatedAt: updatedAtFormatted,
               Sales: {
                  ...vehicle.Sales,
                  sellDate: saleDateformatted,
                  createdAt: saleCreatedAtformatted,
                  updatedAt: saleUpdatedAtFormatted
               } 
            };

            return vehicleDataFormatted;

         }

         const vehicleDataFormatted = {
            ...vehicle,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted
         };


         return vehicleDataFormatted;
      });

      return vehicles;

   }

   // Lista todos os veiculos com o tipo desejado
   async listVehiclesByType(type){

      const result = await prisma.vehicles.findMany({
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

      // Percorre todos os registros retornados e formata a data 
      const vehicles = result.map((vehicle) => {

         const createdAtFormatted = moment(vehicle.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(vehicle.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

         // Se o veículo for relaciona auma venda formata os dados dessa venda
         if(vehicle.Sales){
            const saleDateformatted = moment(vehicle.Sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleCreatedAtformatted = moment(vehicle.Sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleUpdatedAtFormatted = moment(vehicle.Sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

            const vehicleDataFormatted = {
               ...vehicle,
               createdAt: createdAtFormatted,
               updatedAt: updatedAtFormatted,
               Sales: {
                  ...vehicle.Sales,
                  sellDate: saleDateformatted,
                  createdAt: saleCreatedAtformatted,
                  updatedAt: saleUpdatedAtFormatted
               } 
            };

            return vehicleDataFormatted;

         }

         const vehicleDataFormatted = {
            ...vehicle,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted
         };

         return vehicleDataFormatted;
      });

      return vehicles;

   }

   // Lista todos os veiculos com o modelo desejado
   async listVehiclesByModel(model){

      const result = await prisma.vehicles.findMany({
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

      // Percorre todos os registros retornados e formata a data 
      const vehicles = result.map((vehicle) => {

         const createdAtFormatted = moment(vehicle.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(vehicle.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

         // Se o veículo for relaciona auma venda formata os dados dessa venda
         if(vehicle.Sales){
            const saleDateformatted = moment(vehicle.Sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleCreatedAtformatted = moment(vehicle.Sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleUpdatedAtFormatted = moment(vehicle.Sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

            const vehicleDataFormatted = {
               ...vehicle,
               createdAt: createdAtFormatted,
               updatedAt: updatedAtFormatted,
               Sales: {
                  ...vehicle.Sales,
                  sellDate: saleDateformatted,
                  createdAt: saleCreatedAtformatted,
                  updatedAt: saleUpdatedAtFormatted
               } 
            };

            return vehicleDataFormatted;

         }

         const vehicleDataFormatted = {
            ...vehicle,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted
         };

         return vehicleDataFormatted;
      });

      return vehicles;

   }

   // Adicionar um novo veiculo
   async addVehicle(data){

      const formattedData = { 
         ...data,
         year: Number(data.year),
         price: parseFloat(data.price),
         listPrice: parseFloat(data.listPrice),
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
         price: parseFloat(data.price),
         listPrice: parseFloat(data.listPrice),
         places: Number(data.places),
         ports: Number(data.ports),
         marches: Number(data.marches),
         urbanConsume: parseFloat(data.urbanConsume),
         roadConsume: parseFloat(data.roadConsume),
      };

      const result = await prisma.vehicles.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!result){
         return null;
      }

      const oldImg = result.img;

      // Exclui a imagem antiga que era associada ao veículo
      fs.unlink(oldImg, (error) => {
         if(error){
            return { 
               erro: "Imagem associada com o registro não encontrada para ser excluida"
            };
         }
      });      
      
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

      const result = await prisma.vehicles.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!result){
         return null;
      }

      const oldImg = result.img;

      // Apaga a imagem do diretório, caso ocorra tudo certo apaga os dados referentes ao id
      fs.unlink(oldImg, (error) => {
         if(error){
            return {
               erro: "Imagem associada com o registro não encontrada para ser excluida"
            };
         }
      });

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