const { verify } = require("jsonwebtoken");
const blacklist = require("../../redis/blacklist");

module.exports = async (req, res, next) => {

   try{

      // Salva o token
      const token = req.headers.authorization.split(" ")[1];
      
      if(!token){
         return res.status(401).json({ erro: "token inexistente" });
      }
      
      // Verifica se o token está na blacklist
      const tokenInBlacklist = await blacklist.containsToken(token);

      if(tokenInBlacklist){
         return res.status(401).json({ erro: "token invalidado" });
      }
      
      // Verifica se o token existe
      const decode = verify(token, process.env.JWT_KEY);
      req.user = decode; 

      return next(); 

   }catch(error){

      if(error.name === "TokenExpiredError"){
         return res.status(401).json({ erro: "token expirado" });
      }

      // console.log(error)

      return res.status(401).json({ erro: "token inválido" });
   }

};