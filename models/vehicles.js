const moment = require("moment");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const { type } = require("os");
const prisma = new PrismaClient();

class Vehicles{


   // Lista um usuário específico
   async listVehicle(id, res){

      try{

         const result = await prisma.vehicles.findUnique({
            where: {
               id: Number(id)
            },
            include: {
               sales: true
            }
         });

         if(!result){
            return res.status(204).json();
         }

         // Formata a data do registro
         const createdAtFormatted = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(result.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

         // Se o veículo for relaciona auma venda formata os dados dessa venda
         if(result.sales){
            const saleDateformatted = moment(result.sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleCreatedAtformatted = moment(result.sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
            const saleUpdatedAtFormatted = moment(result.sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

            const vehicleDataFormatted = {
               ...result,
               createdAt: createdAtFormatted,
               updatedAt: updatedAtFormatted,
               sales: {
                  ...result.sales,
                  sellDate: saleDateformatted,
                  createdAt: saleCreatedAtformatted,
                  updatedAt: saleUpdatedAtFormatted
               } 
            };

            return res.status(200).json(vehicleDataFormatted);

         }

         const vehicleDataFormatted = {
            ...result,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted
         };

         return res.status(200).json(vehicleDataFormatted);

      }catch(error){
         console.log(error)
         return res.status(500).json(error.message);
      }

   }

   // Lista todos os veiculos registrados no banco de dados
   async listVehicles(status, res){

      // Filtro do select
      status = (status === "venda") ? "à venda" : (status === "vendido") ? "vendido" : "à venda";
      try{

         const result = await prisma.vehicles.findMany({
            where: {
               status: status
            },
            include: {
               sales: true
            }
         });
   
         if(!result.length){
            return res.status(204).json();
         }
   
         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {
   
            const createdAtFormatted = moment(vehicle.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const updatedAtFormatted = moment(vehicle.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

            // Se o veículo for relaciona auma venda formata os dados dessa venda
            if(vehicle.sales){
               const saleDateformatted = moment(vehicle.sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleCreatedAtformatted = moment(vehicle.sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleUpdatedAtFormatted = moment(vehicle.sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

               const vehicleDataFormatted = {
                  ...vehicle,
                  createdAt: createdAtFormatted,
                  updatedAt: updatedAtFormatted,
                  sales: {
                     ...vehicle.sales,
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
   
         return res.status(200).json(vehicles);

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todos os veiculos com o tipo desejado
   async listVehiclesByType(type, res){

      try{

         const result = await prisma.vehicles.findMany({
            where: {
               type: {
                  startsWith: type
               },
               status: "à venda"
            },
            include: {
               sales: true
            }
         });

         if(!result.length){
            return res.status(204).send();
         }

         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const createdAtFormatted = moment(vehicle.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const updatedAtFormatted = moment(vehicle.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

            // Se o veículo for relaciona auma venda formata os dados dessa venda
            if(vehicle.sales){
               const saleDateformatted = moment(vehicle.sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleCreatedAtformatted = moment(vehicle.sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleUpdatedAtFormatted = moment(vehicle.sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

               const vehicleDataFormatted = {
                  ...vehicle,
                  createdAt: createdAtFormatted,
                  updatedAt: updatedAtFormatted,
                  sales: {
                     ...vehicle.sales,
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

         return res.status(200).json(vehicles);

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todos os veiculos com o modelo desejado
   async listVehiclesByModel(model, res){

      try{


         const result = await prisma.vehicles.findMany({
            where: {
               model: {
                  startsWith: model
               },
               status: "à venda" 
            },
            include: {
               sales: true
            }
         });

         console.log(result)

         if(!result.length){
            return res.status(204).send();
         }

         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const createdAtFormatted = moment(vehicle.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const updatedAtFormatted = moment(vehicle.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

            // Se o veículo for relaciona auma venda formata os dados dessa venda
            if(vehicle.sales){
               const saleDateformatted = moment(vehicle.sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleCreatedAtformatted = moment(vehicle.sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
               const saleUpdatedAtFormatted = moment(vehicle.sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 

               const vehicleDataFormatted = {
                  ...vehicle,
                  createdAt: createdAtFormatted,
                  updatedAt: updatedAtFormatted,
                  sales: {
                     ...vehicle.sales,
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


         return res.status(200).json(vehicles);

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Adicionar um novo veiculo
   async addVehicle(data, res){

      // data.price = data.price.replace(".", ",");

      // console.log(data.price);

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
      }

      try{
         
         const result = await prisma.vehicles.create({
            data: formattedData
         });

         return res.status(201).json({
            status: "registro concluido",
            dados: formattedData
          });

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Edita os dados de um veículo
   async editVehicle(id, data, res){

      data = (data.status == "vendido") ? { ...data, sellDate: new Date() } : { ...data, sellDate: null };  

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
      }

      try{

         const result = await prisma.vehicles.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!result){
            return res.status(400).json({ erro: "nenhum usuário veículo com esse id" });
         }

         const oldImg = result.img;

         // Exclui a imagem antiga que era associada ao veículo
         fs.unlink(oldImg, (error) => {
            if(error){
               return res.status(404).json({ "erro": "Imagem associada com o registro não encontrada para ser excluida" });
            }
         });      
         
         const newData = await prisma.vehicles.update({
            where: {
               id: Number(id)
            },
            data: formattedData
         });

         return res.status(200).json({
            status: "dados do veículo editado",
            dados: formattedData
         });

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Exclui os dados de um veículo
   async deleteVehicle(id, res){

      try{

         const result = await prisma.vehicles.findUnique({
            where: {
               id: Number(id)
            }
         });
   
         if(!result){
            return res.status(400).json({ erro: "nenhum usuário veículo com esse id" });
         }
   
         const oldImg = result.img;
   
         // Apaga a imagem do diretório, caso ocorra tudo certo apaga os dados referentes ao id
         fs.unlink(oldImg, (error) => {
            if(error){
               return res.status(404).json({ "erro": "Imagem associada com o registro não encontrada para ser excluida" });
            }
         });
   
         await prisma.vehicles.delete({
            where: {
               id: Number(id)
            }
         });
   
         return res.status(200).json({
            status: "dados do veículo deletados",
            id: id
         });

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

}

// Exporta a classe Veiculos
module.exports = new Vehicles;