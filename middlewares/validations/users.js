const { body, validationResult } = require("express-validator");

// regras de validação ao registrar usuário
const validationRules = [
   body("fullName").isLength({min: 3}).withMessage("O campo nome completo deve ter pelo menos 3 caracteres"),
   body("email").isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("password").isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres"),
   body("registerDate").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("lastLogin").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   })
];

const validationRulesEdit = [
   body("fullName").optional({nullable: true}).isLength({min: 3}).withMessage("O campo nome completo deve ter pelo menos 3 caracteres"),
   body("email").optional({nullable: true}).isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("password").optional({nullable: true}).isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres"),
   body("registerDate").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("lastLogin").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   })
];

module.exports = { validationRules, validationRulesEdit, validationResult };