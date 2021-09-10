const { body, validationResult } = require("express-validator");

// Regras de validação ao registar veiculo
const validationRules = [
   body("type").isLength({min: 3}).withMessage("O campo tipo deve ter pelo menos 3 caracteres"),
   body("model").isLength({min: 3}).withMessage("O campo modelo deve ter pelo menos 3 caracteres"),
   body("manufacturer").isLength({min: 3}).withMessage("O fabricante tipo deve ter pelo menos 3 caracteres"),
   body("year").isNumeric().withMessage("O campo ano deve ser númerico"),
   body("price").isNumeric().withMessage("O campo preço ser númerico"),
   body("listPrice").isNumeric().withMessage("O campo preço de tabela ser númerico"),
   body("procedence").isLength({min: 2}).withMessage("O campo procedência deve ter pelo menos 2 caracteres"),
   body("size").isLength({min: 5}).withMessage("O campo porte deve ter pelo menos 5 caracteres"),
   body("places").isNumeric().withMessage("O campo lugares deve ser numérico"),
   body("ports").optional({nullable: true}).isNumeric().isLength({max: 1}).withMessage("O campo portas deve ser númerico e deve conter apenas um caractere"),
   body("exchange").isLength({min: 6}).withMessage("O campo câmbio precisa ter pelo menos 6 caracteres"),
   body("marches").isNumeric().withMessage("O campo marchas precisa ser númerico"),
   body("urbanConsume").isNumeric().withMessage("O campo consumo urbano precisa ser númerico"),
   body("roadConsume").isNumeric().withMessage("O campo consumo rodoviario precisa ser númerico"),
   body("description").isLength({min: 10}).withMessage("O campo descrição precisa ter pelo menos 10 caracteres"),
   body("observation").optional({nullable: true}).isLength({min: 10}).withMessage("O campo observação precisa ter pelo menos 10 caracteres"),
   body("status").custom((value) => {
      if(value && (value != "à venda" && value != "vendido")){
         return Promise.reject("O campo status precisa conter o valor à venda ou vendido");
      }
      return true;
   }),
   body("sellDate").optional({nullable: true}).isLength({min: 10, max: 10}).withMessage("Preencha o campo data de venda de forma correta"),
   body("registerDate").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("idVehicle").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de id não pode existir");
      }
      return true;
   })

];

// Regras de validação ao editar veiculo
const validationRulesEdit = [
   body("model").optional({nullable: true}).isLength({min: 5}).withMessage("O campo modelo deve ter pelo menos 5 caracteres"),
   body("type").optional({nullable: true}).isLength({min: 3}).withMessage("O campo tipo deve ter pelo menos 3 caracteres"),
   body("manufacturer").isLength({min: 3}).withMessage("O fabricante tipo deve ter pelo menos 3 caracteres"),
   body("year").optional({nullable: true}).isNumeric().withMessage("O campo ano deve ser númerico"),
   body("price").optional({nullable: true}).isNumeric().withMessage("O campo preço ser númerico"),
   body("listPrice").optional({nullable: true}).isNumeric().withMessage("O campo preço de tabela ser númerico"),
   body("procedence").optional({nullable: true}).isLength({min: 2}).withMessage("O campo procedência deve ter pelo menos 2 caracteres"),
   body("size").optional({nullable: true}).isLength({min: 5}).withMessage("O campo porte deve ter pelo menos 5 caracteres"),
   body("places").optional({nullable: true}).isNumeric().withMessage("O campo lugares deve ser numérico"),
   body("ports").optional({nullable: true}).isNumeric().isLength({max: 1}).withMessage("O campo portas deve ser númerico e deve conter apenas um caractere"),
   body("exchange").isLength({min: 6}).withMessage("O campo câmbio precisa ter pelo menos 6 caracteres"),
   body("marches").optional({nullable: true}).isNumeric().withMessage("O campo marchas precisa ser númerico"),
   body("urbanConsume").optional({nullable: true}).isNumeric().withMessage("O campo consumo urbano precisa ser númerico"),
   body("roadConsume").optional({nullable: true}).isNumeric().withMessage("O campo consumo rodoviario precisa ser númerico"),
   body("description").optional({nullable: true}).isLength({min: 10}).withMessage("O campo descrição precisa ter pelo menos 10 caracteres"),
   body("observation").optional({nullable: true}).isLength({min: 10}).withMessage("O campo observação precisa ter pelo menos 10 caracteres"),
   body("status").optional({nullable: true}).isLength({min: 5}).withMessage("O campo status precisa ter pelo menos 5 caracteres"),
   body("sellDate").optional({nullable: true}).isLength({min: 10, max: 10}).withMessage("Preencha o campo data de venda de forma correta"),
   body("registerDate").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("idVehicle").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de id não pode existir");
      }
      return true;
   })

];

// Regras de validação da venda
const validationRulesSale = [
   body("sellDate").optional({nullable: true}).isLength({min: 10, max: 10}).withMessage("Preencha o campo data de venda de forma correta")
];

module.exports = { validationRules, validationRulesEdit, validationRulesSale, validationResult };