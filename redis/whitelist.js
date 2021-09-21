const redis = require("redis");
const listManipulator = require("./listManipulator"); 

// Define o prefixo blacklist para todas as chaves
const whitelist = redis.createClient({ prefix: "whitelist: "}); 
module.exports = listManipulator(whitelist);