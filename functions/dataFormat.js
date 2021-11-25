const moment = require("moment");

class FormatData{

   vehicle(data){

      // Formata a data do registro
      const createdAtFormatted = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const updatedAtFormatted = moment(data.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

      // Se o veículo for relaciona auma venda formata os dados dessa venda
      if(data.Sales){
         const saleDateformatted = moment(data.Sales.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
         const saleCreatedAtformatted = moment(data.Sales.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
         const saleUpdatedAtFormatted = moment(data.Sales.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss"); 
         const vehicleDataFormatted = {
            ...data,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted,
            Sales: {
               ...data.Sales,
               sellDate: saleDateformatted,
               createdAt: saleCreatedAtformatted,
               updatedAt: saleUpdatedAtFormatted
            } 
         };

         return vehicleDataFormatted;

      }

      const vehicleDataFormatted = {
         ...data,
         createdAt: createdAtFormatted,
         updatedAt: updatedAtFormatted
      };

      return vehicleDataFormatted;

   }

   vehicles(data){

      // Percorre todos os registros retornados e formata a data 
      const vehicles = data.map((vehicle) => {

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

   user(data){

      // Formata a data e horário de criação e ultimo login
      const lastLoginFormatted =  (data.lastLogin != null) ? moment(data.lastLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") : null;
      const createAtFormatted = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const updatedAtFormatted = moment(data.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const user = {
         ...data,
         lastLogin: lastLoginFormatted,
         createdAt: createAtFormatted,
         updatedAt: updatedAtFormatted
      };

      return user;

   }

   users(data){

      const users = data.map((user) => {

         // Formata a data e horário de criação e ultimo login
         const lastLoginFormatted =  (user.lastLogin != null) ? moment(user.lastLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") : null;
         const createAtFormatted = moment(user.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(user.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const formattedUser = {
            ...user,
            lastLogin: lastLoginFormatted,
            createdAt: createAtFormatted,
            updatedAt: updatedAtFormatted 
         };

         return formattedUser;
         
      });

      return users;

   }

   sale(data){

      const sellDateFormatted = moment(data.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const createdAtFormatted = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const updatedAtFormatted = moment(data.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const formatedSale = { 
         ...data,
         sellDate: sellDateFormatted,
         createdAt: createdAtFormatted,
         updatedAt: updatedAtFormatted
      };

      return formatedSale;

   }

   sales(data){

      const sales = data.map((sale) => {

         const sellDateFormatted = moment(sale.sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const createdAtFormatted = moment(sale.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(sale.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const formatedSale = { 
            ...sale,
            sellDate: sellDateFormatted,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted
         };

         return formatedSale;

      });

      return sales;

   }

   client(data){

      // Formata a data e horário de criação e update
      const createAtFormatted = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      const updatedAtFormatted = moment(data.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

      // Verifica se existe uma venda vínculada, se existir formata os dados da venda
      if(data.Sales.length){

         const sales = data.Sales.map((sales) => {

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
            ...data,
            createdAt: createAtFormatted,
            updatedAt: updatedAtFormatted,
            Sales: sales
         };

         return client;

      }

      const client = {
         ...data,
         createdAt: createAtFormatted,
         updatedAt: updatedAtFormatted,
      };

      return client;

   }

   clients(data){

      const clients = data.map((client) => {

         // Formata a data e horário de criação e ultimo login"
         const createAtFormatted = moment(client.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const updatedAtFormatted = moment(client.updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

         // Verifica se existe uma venda vínculada, se existir formata os dados da venda
         if(client.Sales.length){

            const sales = client.Sales.map((sale) => {
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
               Sales: sales
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

}

module.exports = new FormatData;