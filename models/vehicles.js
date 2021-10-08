const moment = require("moment");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Vehicles{


   // Lista um usuário específico
   async listVehicle(id, res){

      try{

         const result = await prisma.vehicles.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!result){
            return res.status(204).json();
         }

         // Formata a data do registro
         const sellDateFormatted = (result.sellDate) ? moment(result.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY") : "";
         const regDateFormatted = moment(result.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const vehicleDataFormatted = {...result, sellDate: sellDateFormatted, registerDate: regDateFormatted };

         return res.status(200).json(vehicleDataFormatted);

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todos os veiculos registrados no banco de dados
   async listVehicles(req, res){

      // Filtro do select
      let status = req.params.status;
      status = (status === "venda") ? "à venda" : (status === "vendido") ? "vendido" : "à venda";

      try{

         const result = await prisma.vehicles.findMany({
            where: {
               status: status
            }
         });
   
         if(!result){
            return res.status(204).json();
         }
   
         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {
   
            const sellDateFormated = (vehicle.sellDate) ? moment(vehicle.sellDate, "YYYY-MM-DD").format("DD/MM/YYYY") : ""; 
            const regDateFormatted = moment(vehicle.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const vehicleDataFormatted = {...vehicle, sellDate: sellDateFormated, registerDate: regDateFormatted };
   
   
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
            }
         });

         if(!result){
            return res.status(204).send();
         }

         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const regDateFormatted = moment(vehicle.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const vehicleDataFormatted = {...vehicle, registerDate: regDateFormatted };

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
            }
         });

         if(!result){
            return res.status(204).send();
         }

         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const regDateFormatted = moment(vehicle.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const vehicleDataFormatted = { ...vehicle, registerDate: regDateFormatted  };

            return vehicleDataFormatted;
         });


         return res.status(200).json(vehicles);

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Adicionar um novo veiculo
   async addVehicle(data, res){

      const formattedData = { 
         ...data,
         year: Number(data.year),
         price: Number(data.year),
         listPrice: Number(data.year),
         places: Number(data.year),
         ports: Number(data.year),
         marches: Number(data.year),
         urbanConsume: Number(data.year),
         roadConsume: Number(data.year),
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

   // Edita o status de um veículo para vendido e coloca a data escolhida ou a atual
   async sellVehicle(id, res){

      const data = { sellDate: new Date(), status: "vendido" }; 

      try{

         const verify = await prisma.vehicles.findUnique({
            where: {
               id: Number(id)
            }
         });
   
         if(!verify){
            return res.status(400).json({ erro: "nenhum veículo encontrado com esse id" });
         }
   
         const result = await prisma.vehicles.update({
            where: {
               id: Number(id)
            },
            data: data
         });
   
         return res.status(200).json({
            status: "dados do veículo alterado",
            dados: data
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
         price: Number(data.year),
         listPrice: Number(data.year),
         places: Number(data.year),
         ports: Number(data.year),
         marches: Number(data.year),
         urbanConsume: Number(data.year),
         roadConsume: Number(data.year),
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