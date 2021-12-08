const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DataVerify{

   async verifyUserByEmail(email, id){

      const verifyEmail = await prisma.users.findUnique({
         where: {
            email: email
         }
      });
      
      if(verifyEmail && verifyEmail.id == id){
         return {};
      }

      if(verifyEmail){
         return {
            erro: "e-mail já registrado"
         };
      }

      return {};

   }

   async verifyClientByEmail(email, id){

      const verifyEmail = await prisma.clients.findUnique({
         where: {
            email: email
         }
      });
      
      if(verifyEmail && verifyEmail.id == id){
         return {};
      }

      if(verifyEmail){
         return {
            erro: "e-mail já registrado"
         };
      }

      return {};

   }

   async verifyClientByPhone(phone, id){

      const verifyPhone = await prisma.clients.findUnique({
         where: {
            phone: phone
         }
      });

      if(verifyPhone && verifyPhone.id == id){
         return {};
      }

      if(verifyPhone){
         return {
            erro: "Telefone já registrado"
         };
      }

      return {};

   }

   async verifyClientByCpf(cpf, id){

      const verifyCpf = await prisma.clients.findUnique({
         where: {
            cpf: cpf
         }
      });

      if(verifyCpf && verifyCpf.id == id){
         return {};
      }

      if(verifyCpf){
         return {
            erro: "CPF já registrado"
         };
      }

      return {};

   }

   async verifyUserById(id){

      const verify = await prisma.users.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "Nenhum usuário registrado com esse id" 
         };
      }

      return verify;

   }

   async verifyVehicleById(id){

      const verify = await prisma.vehicles.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "Nenhum veículo registrado com esse id" 
         };
      }

      return verify;

   }

   async verifyClientById(id){

      const verify = await prisma.clients.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "Nenhum cliente registrado com esse id" 
         };
      }

      return verify;

   }

   async verifySaleById(id){

      const verify = await prisma.sales.findUnique({
         where: {
            id: Number(id)
         }
      });

      if(!verify){
         return {
            erro: "Nenhuma venda registrada com esse id" 
         };
      }

      return verify;

   }

   async verifySaleOfVehicle(id){

      // Verifica se o veículo já não foi vendido 
      const verifySale = await prisma.sales.findUnique({
         where: {
            idVehicle: Number(id)
         }
      });

      if(verifySale){
         return {
            erro: "o veículo já está registrado como vendido"
         };
      }

      return {};

   }

}

module.exports = new DataVerify;