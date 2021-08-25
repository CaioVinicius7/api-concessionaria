const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");

module.exports = () => {

   const app = express();

   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());

   // usa o consign pra incluir todos os controllers dentro de nosso app
   consign().include("controllers").into(app);

   return app;

}