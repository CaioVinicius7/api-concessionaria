const { body, validationResult } = require("express-validator");

// Regras de validação ao registar veiculo
const validationRules = [
   body("fullName").isLength({min: 3}).withMessage("O campo nome deve ter pelo menos 3 caracteres"),
   body("email").isEmail().withMessage("O campo deve conter um e-mail válido"),
   body("phone").isLength({min: 15, max:15}).withMessage("Peencha o campo telefone de maneira correta"),
   body("cpf").isLength({min: 14, max:14}).withMessage("Preencha o campo CPF de maneira correta"),
   body("adress").isLength({min: 10}).withMessage("Preenncha o campo endereço de maneira correta"),
   body("id").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo id não pode existir");
      }
      return true;
   })

];

// Regras de validação ao editar veiculo
const validationRulesEdit = [
   body("fullName").optional({nullable: true}).isLength({min: 3}).withMessage("O campo nome deve ter pelo menos 3 caracteres"),
   body("email").optional({nullable: true}).isEmail().withMessage("O campo deve conter um e-mail válido"),
   body("phone").optional({nullable: true}).isLength({min: 15, max:15}).withMessage("Peencha o campo telefone de maneira correta"),
   body("cpf").optional({nullable: true}).isLength({min: 14, max:14}).withMessage("Preencha o campo CPF de maneira correta"),
   body("adress").optional({nullable: true}).isLength({min: 10}).withMessage("Preenncha o campo endereço de maneira correta"),
   body("id").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo id não pode existir");
      }
      return true;
   }),
   body("updatedAt").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo updatedAt não pode existir");
      }
      return true;
   }),
   body("createdAt").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo createdAt não pode existir");
      }
      return true;
   })
];

module.exports = { validationRules, validationRulesEdit, validationResult };