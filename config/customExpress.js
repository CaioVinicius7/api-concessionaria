const express = require("express");
const salesRoutes = require("../routes/salesRoutes");
const loginRoutes = require("../routes/loginRoutes");
const clientsRoutes = require("../routes/clientsRoutes");
const usersRoutes = require("../routes/usersRoutes");
const vehiclesRoutes = require("../routes/vehiclesRoutes");

module.exports = () => {

   const app = express();

   app.use(express.json()); 
   app.use(express.urlencoded({ extended: true })); 

   // Rotas
   app.use(salesRoutes);
   app.use(loginRoutes);
   app.use(clientsRoutes);
   app.use(usersRoutes);
   app.use(vehiclesRoutes);

   return app;

};