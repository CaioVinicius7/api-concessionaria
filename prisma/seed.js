const { hash } = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main(){

   await prisma.users.createMany({
      data: [
         {
            fullName: "caio vinícius",
            email: "caio@gmail.com",
            password: await await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            fullName: "niel cintra",
            email: "niel@gmail.com",
            password: await await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            fullName: "joão vitor",
            email: "joao@gmail.com",
            password: await await hash("teste123", 12),
            lastLogin: null,
            verifiedEmail: "yes",
            createdAt: new Date(),
            updatedAt: new Date()
         }
         ,
         {
            fullName: "feliphe sene",
            email: "fepliphe@gmail.com",
            password: await await hash("teste123", 12),
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
            sellDate: null,
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
            sellDate: new Date(),
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
            sellDate: null,
            img: "uploads\\mt09.jpg",
            createdAt: new Date(),
            updatedAt: new Date()
         },
      ] 
   });

}

main().catch((e) => {
   console.log(e);
   console.exit(1);
}).finally(() => {
   prisma.$disconnect();
});