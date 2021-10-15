const moment = require("moment");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Sales{

   // Lista uma venda
   async listSale(id, res){

      try{

         const result = await prisma.sales.findUnique({
            where: {
               id: Number(id)
            },
            include: {
               clients: {
                  select: {
                     id: true,
                     fullName: true
                  }
               }
            }
         });

         if(!result){
            return res.status(204).send();
         }

         const sellDateFormatted = moment(result.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const createdAtFormatted = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");;
         const updatedAtFormatted = moment(result.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");;
         const formatedSale = { 
            ...result,
            sellDate: sellDateFormatted,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted
         };

         return res.status(200).json(formatedSale);

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todas as vendas
   async listSales(res){
      
      try{

         const result = await prisma.sales.findMany({
            include: {
               clients: {
                  select: {
                     id: true,
                     fullName: true
                  }
               }
            }
         });
   
         if(!result.length){
            return res.status(204).send();
         }
   
         const sales = result.map((sale) => {
   
            const sellDateFormatted = moment(sale.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const createdAtFormatted = moment(sale.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");;
            const updatedAtFormatted = moment(sale.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");;
            const formatedSale = { 
               ...sale,
               sellDate: sellDateFormatted,
               createdAt: createdAtFormatted,
               updatedAt: updatedAtFormatted
            };
   
            return formatedSale;
   
         });
   
         return res.status(200).json(sales);

      }catch(error){
         return res.status(500).json(error.message);
      }


   }

   // Adiciona uma nova venda
   async addSale(data, res){

      data = { 
         sellValue: parseFloat(data.sellValue),
         idClient: Number(data.idClient),
         idVehicle: Number(data.idVehicle),
         sellDate: new Date(),
      }; 

      try{

         // Verifica se o veículo existe 
         const verify = await prisma.vehicles.findUnique({
            where: {
               id: data.idVehicle
            }
         });

         if(!verify){
            return res.status(400).json({ erro: "nenhum veículo encontrado com esse id" });
         }
         
         // Verifica se o veículo já não foi vendido 
         const verifySale = await prisma.sales.findFirst({
            where: {
               idVehicle: data.idVehicle
            }
         });

         if(verifySale){
            return res.status(400).json({ erro: "o veículo já está registrado como vendido" });
         }

         await prisma.vehicles.update({
            where: {
               id: data.idVehicle
            },
            data: {
               status: "vendido"
            }
         });
   
         const result = await prisma.sales.create({
            data: data
         });

         return res.status(201).json({
            status: "Venda registrada com sucesso",
            dados: {
               valor: data.sellValue,
               idClient: data.idClient,
               idVehicle: data.idVehicle
            }
         });
         
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Edita uma venda
   async editSale(id, data, res){

      data = {
         ...data,
         sellValue: parseFloat(data.sellValue),
         idVehicle: Number(data.idVehicle),
         idClient: Number(data.idClient)
      }

      try{

         // Verifica se a venda existe
         const verify = await prisma.sales.findUnique({
            where: {
               id: Number(id)
            }
         });

         if(!verify){
            res.status(400).json({ erro: "nenhuma venda cadastrada com esse id" });
         }

         // Verifica se o veículo escolhido já não está relacionado a outra venda
         const verifyVehicle = await prisma.vehicles.findUnique({
            where: {
               id: data.idVehicle
            } 
         });

         if(verifyVehicle.status === "vendido"){
            return res.status(400).json({ erro: "esse veículo já está relacionado a uma venda" });
         }

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

         // Edita a venda
         await prisma.sales.update({
            where: {
               id: Number(id)
            },
            data: data
         });  

         return res.status(200).json({ status: "venda editada com sucesso" }); 

      }catch(error){
         console.log(error)
         res.status(500).json(error.message);
      }

   }

   // Deleta uma venda
   async deleteSale(id, res){

      try{

         const result = await prisma.sales.findUnique({
            where: {
               id: Number(id)
            }
         }); 

         if(!result){
            res.status(400).json({ erro: "nenhuma venda cadastrada com essse id" });
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

         return res.status(200).json({ 
            status: "venda exluida com sucesso",
            id: id
         });

      }catch(error){
         res.status(500).json(error.message);
      }

   }

}

module.exports = new Sales;