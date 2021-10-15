const { hash } = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main(){

   await prisma.users.createMany({
      data: [
         {
            fullName: "caio vinícius",
            email: "caio@gmail.com",
            password: await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            fullName: "niel cintra",
            email: "niel@gmail.com",
            password: await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            fullName: "joão vitor",
            email: "joao@gmail.com",
            password: await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         }
         ,
         {
            fullName: "feliphe sene",
            email: "fepliphe@gmail.com",
            password: await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ] 
   });

   await prisma.vehicles.createMany({
      data: [
         {
            type: "carro",
            model: "camaro",
            manufacturer: "chevrolet",
            year: 2020,
            price: 120.000,
            listPrice: 135.000,
            procedence: "nacional",
            size: "grande",
            places: 2,
            ports: 2,
            exchange: "automático/manual", 
            marches: 10,
            urbanConsume: 6.4,
            roadConsume: 9.6,
            description: "carro esportivo",
            observation: null,
            status: "à venda",
            img: "uploads\\camaro.jpg",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            type: "carro",
            model: "opala",
            manufacturer: "chevrolet",
            year: 1973,
            price: 37.250,
            listPrice: 41.000,
            procedence: "nacional",
            size: "grande",
            places: 5,
            ports: 2,
            exchange: "manual", 
            marches: 5,
            urbanConsume: 7,
            roadConsume: 9.5,
            description: "carro clásico",
            observation: "bancos reformados",
            status: "vendido",
            img: "uploads\\opala.jpg",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            type: "moto",
            model: "mt 09",
            manufacturer: "yamaha",
            year: 2020,
            price: 42.250,
            listPrice: 43.690,
            procedence: "nacional",
            size: "grande",
            places: 2,
            ports: null,
            exchange: "manual", 
            marches: 5,
            urbanConsume: 17,
            roadConsume: 21,
            description: "moto esportiva",
            observation: "moto robusta e muito veloz",
            status: "à venda",
            img: "uploads\\mt09.jpg",
            createdAt: new Date(),
            updatedAt: new Date()
         },
      ] 
   });

   await prisma.clients.createMany({
      data: [
         {
            fullName: "ellen bessa",
            email: "ellen@gmail.com",
            phone: "(12) 94002-8922",
            cpf: "179.918.780-23",
            adress: "São Francisco, 247",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            fullName: "jonas braga",
            email: "jonas@gmail.com",
            phone: "(35) 94000-5377",
            cpf: "223.450.130-01",
            adress: "Bela Vista, 612",
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ]
   });

   await prisma.sales.createMany({
      data: [
         {
            sellDate: new Date(),
            sellValue: 36.250,
            idClient: 1,
            idVehicle: 2,
            createdAt: new Date(),
            updatedAt: new Date() 
         } 
      ]
   });

}

main().catch((e) => {
   console.log(e);
   console.exit(1);
}).finally(() => {
   prisma.$disconnect();
});