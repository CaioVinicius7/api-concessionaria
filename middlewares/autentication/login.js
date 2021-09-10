const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {

   try{

      // Salva o token
      const token = req.headers.authorization.split(" ")[1];
   
      if(!token){
         return res.status(401).json({ erro: "token inexistente" });
      }
      
      // Verifica se o token existe
      const decode = verify(token, process.env.JWT_KEY);
      req.user = decode; 
      
      return next(); 

   }catch(error){
      return res.status(401).json({ error: "token inválido" });
   }

}