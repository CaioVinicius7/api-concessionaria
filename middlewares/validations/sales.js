const { body, validationResult } = require("express-validator");

const validationRules = [
   body("sellValue").isNumeric().withMessage("O campo valor de venda precisa ser númerico"),
   body("idClient").isNumeric().withMessage("O campo id do cliente precisa ser númerico"),
   body("idVehicle").isNumeric().withMessage("O campo id do veículo precisa ser númerico"),
   body("id").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo id não pode existir");
      }
      return true;
   }),
   body("createdAt").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo criado em não pode existir");
      }
      return true;
   }),
   body("updatedAt").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo atualizado em não pode existir");
      }
      return true;
   })
];

const validationRulesEdit = [
   body("sellValue").optional({nullable: true}).isNumeric().withMessage("O campo valor de venda precisa ser númerico"),
   body("idClient").optional({nullable: true}).isNumeric().withMessage("O campo id do cliente precisa ser númerico"),
   body("idVehicle").optional({nullable: true}).isNumeric().withMessage("O campo id do veículo precisa ser númerico"),
   body("id").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo id não pode existir");
      }
      return true;
   }),
   body("createdAt").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo criado em não pode existir");
      }
      return true;
   }),
   body("updatedAt").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo atualizado em não pode existir");
      }
      return true;
   })
];

module.exports = { validationRules, validationRulesEdit, validationResult };