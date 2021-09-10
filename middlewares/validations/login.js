const { body, validationResult } = require("express-validator");

const validationRules = [
   body("email").isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("password").isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres")
];

module.exports = { validationRules, validationResult };