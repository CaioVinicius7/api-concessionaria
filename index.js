require("dotenv/config");
require("./redis/blacklist");
require("./redis/whitelist");
const redis = require("redis");
const client = redis.createClient();
const customExpress = require("./config/customExpress");
const app = customExpress();


// Inicia o servidor na porta 3000
app.listen(3000, () => {
   console.log("Servidor funcionando!");
});
