const { body, validationResult } = require("express-validator");

const validationRules = [
   body("email").isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("password").isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres")
];

const validationRulesRt = [
   body("refreshToken").custom((value) => {
      if(!value || value === null || value === ""){
         return Promise.reject("Você precisa enviar um refresh token");
      }
      return true;
   })
];

module.exports = { validationRules, validationRulesRt, validationResult };